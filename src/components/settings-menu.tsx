"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Footer settings: one [s] button that opens a small labelled list (language, theme, motion).
 * The panel stays mounted while closed (only `hidden`), so the [t] and [p] shortcuts that live
 * in those controls keep working. [s] toggles it; Escape closes it and returns focus.
 */
export function SettingsMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (e.key === "s") setOpen((o) => !o);
      else if (e.key === "Escape") {
        setOpen((o) => {
          if (o) button.current?.focus();
          return false;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 md:items-end">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-keyshortcuts="s"
        className="navlink cursor-pointer text-muted hover:text-ink"
      >
        <kbd aria-hidden="true">[s]</kbd>
        <span>{label}</span>
        <span aria-hidden="true" className={`inline-block transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ↓
        </span>
      </button>
      <div id={id} hidden={!open} className="grid gap-1">
        {children}
      </div>
    </div>
  );
}

/** One row of the panel: a muted label and its control. */
export function SettingsRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    // a row whose control renders nothing (pause, under reduced motion) disappears
    <div className="grid grid-cols-[9ch_auto] items-center gap-x-4 [&:not(:has(a,button))]:hidden">
      <span className="text-muted">{label}</span>
      <span>{children}</span>
    </div>
  );
}
