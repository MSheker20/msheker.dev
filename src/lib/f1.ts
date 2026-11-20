import { cacheLife } from "next/cache";

// Formula 1 data for the About card, from the open Jolpica API (the Ergast successor, no key).
// Fetched while prerendering and refreshed hourly; null on any failure, and the card hides.

const API = "https://api.jolpi.ca/ergast/f1";

export type F1 = {
  season: string;
  next: { name: string; round: string; start: string } | null; // start: ISO date-time (UTC)
  last: { name: string; podium: { code: string; team: string }[] } | null;
};

type Race = { season: string; round: string; raceName: string; date: string; time?: string; Results?: Result[] };
type Result = { position: string; Driver: { code?: string; familyName: string }; Constructor: { name: string } };

async function races(path: string): Promise<Race[] | null> {
  const res = await fetch(`${API}/${path}`, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const json = (await res.json()) as { MRData: { RaceTable: { Races: Race[] } } };
  return json.MRData.RaceTable.Races;
}

export async function getF1(): Promise<F1 | null> {
  "use cache";
  cacheLife("hours");
  try {
    const [next, last] = await Promise.all([races("current/next.json"), races("current/last/results.json")]);
    const n = next?.[0];
    const l = last?.[0];
    if (!n && !l) return null;
    return {
      season: (n ?? l)!.season,
      next: n ? { name: n.raceName, round: n.round, start: `${n.date}T${n.time ?? "12:00:00Z"}` } : null,
      last: l?.Results?.length
        ? {
            name: l.raceName,
            podium: l.Results.slice(0, 3).map((r) => ({
              code: r.Driver.code ?? r.Driver.familyName.slice(0, 3).toUpperCase(),
              team: r.Constructor.name,
            })),
          }
        : null,
    };
  } catch {
    return null;
  }
}
