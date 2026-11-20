"use client";

import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

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

/** Cycles system → light → dark. */
function cycle() {
  setTheme(ORDER[(ORDER.indexOf(read()) + 1) % ORDER.length]);
}

/** Applies a theme, stores the choice and tells subscribers (also used by the command palette). */
export function setTheme(m: Mode) {
  const root = document.documentElement;
  try {
    if (m === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", m);
  } catch {}
  if (m === "system") delete root.dataset.theme;
  else root.dataset.theme = m;
  window.dispatchEvent(new Event(EVENT));
}

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

  // [t] cycles the theme from anywhere, except while typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "t" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      cycle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button type="button" onClick={cycle} aria-keyshortcuts="t" className="navlink cursor-pointer text-muted hover:text-ink">
      <kbd aria-hidden="true">[t]</kbd>
      <span>
        <span className="sr-only">{labels.label}: </span>
        {labels[mode]}
      </span>
    </button>
  );
}
