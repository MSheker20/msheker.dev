"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";

// Denizli's time, worked out in the browser (the page is prerendered). Ticks every 15s: minutes only,
// so there is nothing to animate and nothing for [p] to pause.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const minute = () => Math.floor(Date.now() / 60_000);

export function LocalClock({ locale, place }: { locale: Locale; place: string }) {
  const m = useSyncExternalStore(subscribe, minute, () => 0);
  const time = m
    ? new Intl.DateTimeFormat(locale, { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(m * 60_000)
    : "--:--";
  return (
    <p className="m-0 flex min-h-11 items-center gap-2 tabular-nums">
      <span>{place}</span>
      <time dateTime={m ? new Date(m * 60_000).toISOString() : undefined} className="text-ink">
        {time}
      </time>
      <span>· GMT+3</span>
    </p>
  );
}
