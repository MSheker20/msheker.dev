"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";

type Mode = "system" | "light" | "dark";
const ORDER: Mode[] = ["system", "light", "dark"];
const EVENT = "themechange";

function read(): Mode {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "system";
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

/** Runs before paint (inlined in <head>) so a stored theme never flashes. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeToggle({ labels }: { labels: { label: string } & Record<Mode, string> }) {
  const mode = useSyncExternalStore(subscribe, read, () => "system" as Mode);

  // Switching language swaps the [lang] root layout client-side: React renders a fresh <html>
  // without data-theme and the head script does not run again, so reapply the stored theme.
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if ((t === "light" || t === "dark") && document.documentElement.dataset.theme !== t) {
        document.documentElement.dataset.theme = t;
        window.dispatchEvent(new Event(EVENT));
      }
    } catch {}
  }, []);

  const next = () => {
    const m = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    const root = document.documentElement;
    try {
      if (m === "system") localStorage.removeItem("theme");
      else localStorage.setItem("theme", m);
    } catch {}
    if (m === "system") delete root.dataset.theme;
    else root.dataset.theme = m;
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <button type="button" onClick={next} className="navlink cursor-pointer text-muted hover:text-ink">
      <kbd aria-hidden="true">[t]</kbd>
      <span>
        <span className="sr-only">{labels.label}: </span>
        {labels[mode]}
      </span>
    </button>
  );
}
