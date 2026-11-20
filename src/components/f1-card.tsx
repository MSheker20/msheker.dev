"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { F1 } from "@/lib/f1";

// Times are worked out in the browser (the page is prerendered): the race start in Denizli time and
// "in 1d 9h". Minutes only, ticking every 30s: no animation, nothing for [p] to pause.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const minute = () => Math.floor(Date.now() / 60_000);

function until(ms: number) {
  if (ms <= 0) return "live now";
  const m = Math.floor(ms / 60_000);
  const d = Math.floor(m / 1440);
  const h = Math.floor((m % 1440) / 60);
  return d > 0 ? `in ${d}d ${h}h` : h > 0 ? `in ${h}h ${m % 60}m` : `in ${m % 60}m`;
}

/** The F1 corner beside the bio: next race with a countdown, last race's podium. Terminal output, in English like a shell. */
export function F1Card({ f1, locale }: { f1: F1; locale: Locale }) {
  const now = useSyncExternalStore(subscribe, minute, () => 0) * 60_000;
  const when = f1.next
    ? new Intl.DateTimeFormat(locale, { timeZone: "Europe/Istanbul", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(
        Date.parse(f1.next.start),
      )
    : null;

  return (
    <div className="term w-full" translate="no">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <b className="ml-1.5 font-normal">f1 · {f1.season}</b>
      </div>
      <div className="px-4 py-3.5 text-[12.5px] leading-[1.7]">
        {f1.next && (
          <>
            <p className="m-0 text-term-muted">
              <span className="text-term-accent">$</span> f1 next
            </p>
            <p className="m-0 text-term-ink">
              {f1.next.name} <span className="text-term-muted">· round {f1.next.round}</span>
            </p>
            <p className="m-0 text-term-muted">
              {when} Denizli{now > 0 && <span className="text-ok"> · {until(Date.parse(f1.next.start) - now)}</span>}
            </p>
          </>
        )}
        {f1.last && (
          <>
            <p className={`m-0 text-term-muted ${f1.next ? "mt-3" : ""}`}>
              <span className="text-term-accent">$</span> f1 last
            </p>
            <p className="m-0 text-term-ink">{f1.last.name}</p>
            {f1.last.podium.map((p, i) => (
              <p key={p.code} className="m-0 grid grid-cols-[3ch_4ch_1fr] gap-2">
                <span className="text-term-muted">P{i + 1}</span>
                <span className="text-term-ink">{p.code}</span>
                <span className="truncate text-term-muted">{p.team}</span>
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
