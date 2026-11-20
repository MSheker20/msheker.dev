import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PixelWordmark } from "./pixel-wordmark";
import { PauseButton } from "./motion";
import { NavLinks } from "./nav-links";

/** Crop-mark nav grid (design/hero v4): wordmark · Index · Docs · Status. */
export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { nav } = dict;
  return (
    <header data-site-chrome className="wrap grid grid-cols-2 pt-1.5 text-label md:h-[var(--header-h)] md:grid-cols-4">
      {/* phones: the wordmark gets its own full-width row above the nav */}
      <div className="crop col-span-2 px-2.5 py-2.5 md:col-span-1 md:px-4">
        <Link href={localePath(locale)} aria-label={nav.home} className="flex min-h-11 w-full items-center text-ink transition-colors hover:text-accent-ink md:h-full">
          <PixelWordmark className="h-auto w-full max-w-[420px] md:max-h-full md:max-w-none" />
        </Link>
      </div>
      <nav aria-label={nav.label} className="contents">
        <div className="crop px-2.5 py-2.5 md:px-4">
          <Label>{nav.index}</Label>
          <NavLinks locale={locale} items={[{ key: "1", path: "/#work", label: nav.work }, { key: "2", path: "/#about", label: nav.about }]} />
        </div>
        <div className="crop px-2.5 py-2.5 md:px-4">
          <Label>{nav.docs}</Label>
          <NavLinks locale={locale} items={[{ key: "3", path: "/#cv", label: nav.cv }, { key: "4", path: "/#contact", label: nav.contact }]} />
        </div>
      </nav>
      <div className="crop hidden px-4 py-2.5 md:block">
        <Label>{nav.status}</Label>
        <p className="m-0 flex min-h-11 items-center">
          <span aria-hidden="true" className="mr-2 inline-block size-[7px] rounded-full bg-ok" />
          {dict.status.now}
        </p>
        <PauseButton labels={dict.motion} />
      </div>
    </header>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[22px] items-center gap-2 text-muted">
      <i aria-hidden="true" className="inline-block size-[7px] bg-ink" />
      {children}
    </div>
  );
}
