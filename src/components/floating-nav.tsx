"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PauseButton } from "./motion";
import { basePath, NavLinks } from "./nav-links";
import { PixelWordmark } from "./pixel-wordmark";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  status: string;
  motion: Dictionary["motion"];
  /** section labels, e.g. "01 / Work" */
  labels: { work: string; about: string; cv: string; contact: string };
};

const SECTIONS = ["work", "about", "cv", "contact"] as const;
type Section = (typeof SECTIONS)[number];

const PHONE = "(max-width: 767.98px)";
const HOVER = "(hover: hover) and (pointer: fine)";

/**
 * Floating compact nav. Desktop: hidden while the grid header (#site-header) is on screen, then a
 * small bar (wordmark · current section) that opens into the full nav on hover or focus.
 * Phones: always shown (the grid header is not drawn there) and opens as a menu on tap.
 */
export function FloatingNav({ locale, nav, status, motion, labels }: Props) {
  const pathname = usePathname();
  const route = basePath(pathname);
  const [phone, setPhone] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  // open is remembered per route, so a navigation closes it without an effect
  const [openAt, setOpenAt] = useState<string | null>(null);
  const [homeSection, setHomeSection] = useState<Section | null>(null);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>(undefined);

  const show = phone || !headerVisible;
  const open = show && openAt === route;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenAt((at) => ((typeof next === "function" ? next(at === route) : next) ? route : null));

  // phone vs desktop
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // the grid header leaving the screen is the signal; no scroll listener
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;
    const io = new IntersectionObserver(([e]) => setHeaderVisible(e.isIntersecting));
    io.observe(header);
    return () => io.disconnect();
  }, []);

  // title: the section crossing the upper middle of the screen (home), else the page's own
  useEffect(() => {
    if (route !== "/") return;
    const hero = document.querySelector("main > section");
    const targets = [hero, ...SECTIONS.map((s) => document.getElementById(s))].filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const key = e.target.id as Section;
          setHomeSection(SECTIONS.includes(key) ? key : null);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [route]);

  // Escape and a tap outside close; Escape hands focus back to the menu button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenAt(null);
      if (phone) button.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenAt(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, phone]);

  const hoverable = () => !phone && window.matchMedia(HOVER).matches;
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  const section = route === "/" ? homeSection : SECTIONS.find((s) => route === `/${s}` || route.startsWith(`/${s}/`));
  const title = section ? labels[section] : null;
  const close = () => setOpen(false);

  return (
    <div
      ref={root}
      data-site-chrome
      className="fnav text-label"
      data-show={show}
      data-open={open}
      inert={!show}
      onPointerEnter={() => hoverable() && openNow()}
      onPointerLeave={() => hoverable() && closeSoon()}
      onFocus={() => !phone && openNow()}
      onBlur={(e) => {
        if (!phone && !e.currentTarget.contains(e.relatedTarget as Node | null)) closeSoon();
      }}
    >
      <nav aria-label={nav.floating}>
        <div className="flex min-h-11 items-center gap-3 pl-3.5 pr-1.5">
          <Link href={localePath(locale)} aria-label={nav.home} onClick={close} className="flex min-h-11 shrink-0 items-center text-ink transition-colors hover:text-accent-ink">
            <PixelWordmark className="h-auto w-16" />
          </Link>
          <span aria-hidden="true" className="h-3.5 w-px bg-line" />
          <span className="min-w-0 flex-1 truncate text-muted" aria-live="polite">
            {title}
          </span>
          {phone ? (
            <button
              ref={button}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={id}
              className="navlink cursor-pointer px-2 text-muted hover:text-ink"
            >
              <kbd aria-hidden="true">{open ? "[×]" : "[≡]"}</kbd>
              <span>{open ? nav.close : nav.menu}</span>
            </button>
          ) : (
            <span aria-hidden="true" className="pr-2 text-muted">
              [1]–[4]
            </span>
          )}
        </div>
        <div id={id} className="fnav-panel" inert={!open}>
          <div className="min-h-0 overflow-hidden">
            <div className="grid gap-x-6 border-t border-line px-3.5 pt-2 pb-2.5 md:grid-cols-3">
              <div>
                <Label>{nav.index}</Label>
                <NavLinks locale={locale} onNavigate={close} items={[{ key: "1", path: "/#work", label: nav.work }, { key: "2", path: "/#about", label: nav.about }]} />
              </div>
              <div>
                <Label>{nav.docs}</Label>
                <NavLinks locale={locale} onNavigate={close} items={[{ key: "3", path: "/#cv", label: nav.cv }, { key: "4", path: "/#contact", label: nav.contact }]} />
              </div>
              <div>
                <Label>{nav.status}</Label>
                <p className="m-0 flex min-h-11 items-center">
                  <span aria-hidden="true" className="mr-2 inline-block size-[7px] shrink-0 rounded-full bg-ok" />
                  {status}
                </p>
                <PauseButton labels={motion} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 flex min-h-[22px] items-center gap-2 text-muted">
      <i aria-hidden="true" className="inline-block size-[7px] bg-ink" />
      {children}
    </div>
  );
}
