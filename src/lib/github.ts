import { cacheLife } from "next/cache";
import { site } from "@/content/site";

// Live numbers from GitHub's public REST API. Fetched while prerendering and refreshed daily
// ("use cache" + cacheLife). No token needed; GITHUB_TOKEN (no scopes) only raises the rate limit.
// Every function returns null on any failure, and the page falls back to its written numbers.

const API = "https://api.github.com";
const user = site.links.github.replace(/\/$/, "").split("/").pop()!;

async function gh(path: string) {
  const token = process.env.GITHUB_TOKEN;
  const get = (auth: boolean) =>
    fetch(API + path, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  const res = await get(true);
  // an expired or revoked token answers 401: carry on without it rather than lose the numbers
  return token && res.status === 401 ? get(false) : res;
}

export type RepoStats = { commits: number; goTestFiles: number };

/** Commit count on the default branch and the number of Go test files in the tree. */
export async function getRepoStats(repo: string): Promise<RepoStats | null> {
  "use cache";
  cacheLife("days");
  try {
    // one commit per page: the "last" page number is the commit count
    const commitsRes = await gh(`/repos/${user}/${repo}/commits?per_page=1`);
    const last = commitsRes.headers.get("link")?.match(/[?&]page=(\d+)>;\s*rel="last"/);
    const treeRes = await gh(`/repos/${user}/${repo}/git/trees/HEAD?recursive=1`);
    if (!commitsRes.ok || !treeRes.ok || !last) return null;
    const tree = (await treeRes.json()) as { tree: { path: string }[]; truncated: boolean };
    if (tree.truncated) return null;
    return { commits: Number(last[1]), goTestFiles: tree.tree.filter((f) => f.path.endsWith("_test.go")).length };
  } catch {
    return null;
  }
}

/** Commits per day over the last 53 weeks (Sunday-first, oldest week first), by this user, in public non-fork repos. */
export type Activity = { weeks: number[][]; total: number };

const DAY = 864e5;
const WEEKS = 53;

export async function getActivity(): Promise<Activity | null> {
  "use cache";
  cacheLife("days");
  try {
    // the grid starts on the Sunday 52 weeks before this week's Sunday (UTC)
    const today = new Date();
    const thisSunday = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay());
    const start = thisSunday - (WEEKS - 1) * 7 * DAY;

    const reposRes = await gh(`/users/${user}/repos?per_page=100&type=owner`);
    if (!reposRes.ok) return null;
    const repos = ((await reposRes.json()) as { name: string; fork: boolean; pushed_at: string }[]).filter(
      (r) => !r.fork && Date.parse(r.pushed_at) >= start,
    );

    const weeks: number[][] = Array.from({ length: WEEKS }, () => [0, 0, 0, 0, 0, 0, 0]);
    const since = new Date(start).toISOString();
    for (const r of repos) {
      for (let page = 1; page <= 10; page++) {
        const res = await gh(`/repos/${user}/${r.name}/commits?author=${user}&since=${since}&per_page=100&page=${page}`);
        if (res.status === 409) break; // empty repository
        if (!res.ok) return null; // a partial year would understate the work: show nothing instead
        const commits = (await res.json()) as { commit: { author: { date: string } } }[];
        for (const c of commits) {
          const day = Math.floor((Date.parse(c.commit.author.date) - start) / DAY);
          if (day >= 0 && day < WEEKS * 7) weeks[Math.floor(day / 7)][day % 7]++;
        }
        if (commits.length < 100) break;
      }
    }
    const total = weeks.flat().reduce((a, b) => a + b, 0);
    return total > 0 ? { weeks, total } : null;
  } catch {
    return null;
  }
}
