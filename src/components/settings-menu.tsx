"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Floating settings: a small [s] button pinned bottom-right that opens a card above it
 * (language, theme, motion). The card stays mounted while closed (inert + invisible), so the
 * [t] and [p] shortcuts living in its controls keep working. [s] toggles; Escape or a click
 * outside closes and returns focus to the button.
 */
export function SettingsMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (refocus: boolean) =>
      setOpen((o) => {
        if (o && refocus) button.current?.focus();
        return false;
      });
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === "s") setOpen((o) => !o);
      else if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <div ref={root} data-site-chrome className="settings-float">
      <div id={id} role="group" aria-label={label} inert={!open} data-open={open} className="settings-card">
        {children}
      </div>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-keyshortcuts="s"
        className="settings-trigger"
      >
        <kbd aria-hidden="true">[s]</kbd>
        <span>{label}</span>
      </button>
    </div>
  );
}

/** One row of the card: a muted label and its control. */
export function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    // a row whose control renders nothing (pause, under reduced motion) disappears
    <div className="grid grid-cols-[9ch_auto] items-center gap-x-4 [&:not(:has(a,button))]:hidden">
      <span className="text-muted">{label}</span>
      <span>{children}</span>
    </div>
  );
}
