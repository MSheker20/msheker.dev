"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { LatestCommit } from "@/lib/github";

// The page is prerendered and cached for hours, so "how long ago" is worked out in the browser.
// The server (and the first client render) show no age; it appears right after hydration.
const clientNow = typeof window === "undefined" ? 0 : Date.now();
const noop = () => () => {};

function ago(date: string, locale: Locale, now: number) {
  const s = Math.max(0, (now - Date.parse(date)) / 1000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "narrow" });
  if (s < 3600) return rtf.format(-Math.max(1, Math.round(s / 60)), "minute");
  if (s < 86400) return rtf.format(-Math.round(s / 3600), "hour");
  if (s < 30 * 86400) return rtf.format(-Math.round(s / 86400), "day");
  return rtf.format(-Math.round(s / (30 * 86400)), "month");
}

/**
 * Header status: the latest public commit ("2 hr. ago · CovertGift: feat: …"), linked to it on
 * GitHub. A commit from the last six hours pulses the dot once. Falls back to the written status.
 */
export function LiveStatus({ commit, fallback, locale }: { commit: LatestCommit | null; fallback: string; locale: Locale }) {
  const now = useSyncExternalStore(noop, () => clientNow, () => 0);

  if (!commit) {
    return (
      <p className="m-0 flex min-h-11 items-center">
        <span aria-hidden="true" className="mr-2 inline-block size-[7px] shrink-0 rounded-full bg-ok" />
        {fallback}
      </p>
    );
  }

  const fresh = now > 0 && now - Date.parse(commit.date) < 6 * 3600 * 1000;
  const label = `${commit.repo}: ${commit.message}`;
  return (
    <a href={commit.url} title={label} className="group flex min-h-11 min-w-0 items-center text-ink">
      <span aria-hidden="true" className={`mr-2 inline-block size-[7px] shrink-0 rounded-full bg-ok ${fresh ? "status-pulse" : ""}`} />
      {now > 0 && (
        <time dateTime={commit.date} className="mr-1.5 shrink-0 text-muted">
          {ago(commit.date, locale, now)} ·
        </time>
      )}
      <span className="truncate underline-offset-4 group-hover:underline">{label}</span>
    </a>
  );
}
