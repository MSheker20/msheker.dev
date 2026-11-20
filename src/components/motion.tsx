"use client";

import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";

// One switch for every looping motion (marquee, API log, terminal loops): docs/DESIGN.md §5.
type Motion = { paused: boolean; toggle: () => void };
const MotionContext = createContext<Motion>({ paused: false, toggle: () => {} });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(false);
  const toggle = useCallback(() => setPaused((p) => !p), []);

  // [p] toggles from anywhere, except while typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "p" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // CSS loops (the architecture pulse) read the same switch: html[data-motion="paused"]
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "on";
  }, [paused]);

  return <MotionContext.Provider value={{ paused, toggle }}>{children}</MotionContext.Provider>;
}

export const useMotion = () => useContext(MotionContext);

const query = "(prefers-reduced-motion: reduce)";
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}

export function PauseButton({ labels }: { labels: { pause: string; play: string } }) {
  const { paused, toggle } = useMotion();
  const reduced = useReducedMotion();
  if (reduced) return null; // nothing moves, nothing to pause
  return (
    <button type="button" onClick={toggle} aria-pressed={paused} aria-keyshortcuts="p" className="navlink cursor-pointer text-muted hover:text-ink">
      <kbd>[p]</kbd>
      <span>{paused ? labels.play : labels.pause}</span>
    </button>
  );
}
