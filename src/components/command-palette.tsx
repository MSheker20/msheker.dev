"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { defaultLocale, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useMotion } from "./motion";
import { basePath } from "./nav-links";
import { setTheme } from "./theme-toggle";

const OPEN_EVENT = "palette:open";

/** Opens the command palette from anywhere (buttons dispatch this; the keyboard uses / and ⌘K). */
export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Props = {
  locale: Locale;
  labels: Dictionary["palette"];
  email: string;
  github: string;
  linkedin: string;
  projects: { slug: string; name: string }[];
};

type Command = { cmd: string; desc: string; run: () => void };

/**
 * Terminal-style command palette. A native modal <dialog> (focus stays inside, Escape closes, the
 * page behind is inert, focus returns to where it was) holding a combobox: type to filter, ↑↓ to
 * move, Enter to run. Opens on / or ⌘K / Ctrl+K, or from any [/] button. No open animation: it is
 * keyboard-driven and should appear the moment it is asked for.
 */
export function CommandPalette({ locale, labels, email, github, linkedin, projects }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle: toggleMotion } = useMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();
  const c = labels.cmds;

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => router.push(localePath(locale, path));
    const other: Locale = locale === defaultLocale ? "tr" : defaultLocale;
    const open = (url: string) => () => window.open(url, "_blank", "noopener");
    return [
      { cmd: "cd ~", desc: c.home, run: go("/") },
      { cmd: "cd work", desc: c.work, run: go("/#work") },
      { cmd: "cd about", desc: c.about, run: go("/#about") },
      { cmd: "cd cv", desc: c.cv, run: go("/#cv") },
      { cmd: "cd contact", desc: c.contact, run: go("/#contact") },
      ...projects.map((p) => ({
        cmd: `open ${p.slug}`,
        desc: (c as Record<string, string>)[p.slug] ?? p.name,
        run: go(`/work/${p.slug}`),
      })),
      {
        cmd: "get cv.pdf",
        desc: c.pdf,
        run: () => {
          const a = document.createElement("a");
          a.href = `/cv/mustafa-seker-cv-${locale}.pdf`;
          a.download = "";
          a.click();
        },
      },
      { cmd: "theme light", desc: c.light, run: () => setTheme("light") },
      { cmd: "theme dark", desc: c.dark, run: () => setTheme("dark") },
      { cmd: "theme system", desc: c.system, run: () => setTheme("system") },
      { cmd: `lang ${other}`, desc: c.lang, run: () => router.push(localePath(other, basePath(pathname))) },
      { cmd: "motion", desc: c.motion, run: toggleMotion },
      { cmd: "mail", desc: c.mail, run: () => (window.location.href = `mailto:${email}`) },
      { cmd: "open github", desc: c.github, run: open(github) },
      { cmd: "open linkedin", desc: c.linkedin, run: open(linkedin) },
    ];
  }, [c, locale, pathname, projects, router, toggleMotion, email, github, linkedin]);

  const q = query.trim().toLowerCase();
  const results = q ? commands.filter((x) => x.cmd.includes(q) || x.desc.toLowerCase().includes(q)) : commands;
  const current = Math.min(active, Math.max(results.length - 1, 0));

  // / and ⌘K / Ctrl+K open it from anywhere, except / while typing in another field
  useEffect(() => {
    const show = () => {
      const d = dialog.current;
      if (!d || d.open) return;
      setQuery("");
      setActive(0);
      d.showModal();
    };
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey;
      if (!cmdK && !slash) return;
      e.preventDefault();
      show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  const close = () => dialog.current?.close();
  const run = (x: Command | undefined) => {
    if (!x) return;
    close();
    x.run();
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      const step = e.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[current]);
    }
  };

  const optionId = (i: number) => `${listId}-${i}`;

  return (
    <dialog
      ref={dialog}
      data-site-chrome
      aria-label={labels.label}
      className="palette"
      // a click on the backdrop (the dialog box itself, outside the panel) closes it
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="term" translate="no">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <b className="ml-1.5 font-normal">{labels.label}</b>
        </div>
        <div className="flex items-center gap-2 border-b border-term-line px-4">
          <span aria-hidden="true" className="text-term-accent">
            $
          </span>
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results.length ? optionId(current) : undefined}
            aria-autocomplete="list"
            aria-label={labels.placeholder}
            placeholder={labels.placeholder}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="min-h-12 w-full bg-transparent text-term-ink caret-term-accent outline-none placeholder:text-term-muted"
          />
        </div>
        <ul id={listId} role="listbox" aria-label={labels.label} className="m-0 max-h-[min(52vh,420px)] list-none overflow-y-auto p-1.5">
          {results.map((x, i) => (
            <li
              key={x.cmd}
              id={optionId(i)}
              role="option"
              aria-selected={i === current}
              onPointerMove={() => i !== current && setActive(i)}
              onClick={() => run(x)}
              className="palette-option"
            >
              <span className="shrink-0 text-term-ink">{x.cmd}</span>
              <span className="min-w-0 truncate text-term-muted">{x.desc}</span>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p role="status" className="m-0 px-4 pb-3 text-err">
            zsh: {labels.empty}: {query.trim()}
          </p>
        )}
        {/* keyboard hint: pointless on a touch screen */}
        <p className="m-0 border-t border-term-line px-4 py-2 text-[12px] text-term-muted [@media(hover:none)]:hidden">{labels.hint}</p>
      </div>
    </dialog>
  );
}

/** The visible way in: a [/] button wherever the nav lives (floating bar, settings card). */
export function PaletteButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openPalette} aria-keyshortcuts="/ Control+K Meta+K" className={`navlink cursor-pointer text-muted hover:text-ink ${className}`}>
      <kbd aria-hidden="true">[/]</kbd>
      <span>{label}</span>
    </button>
  );
}
