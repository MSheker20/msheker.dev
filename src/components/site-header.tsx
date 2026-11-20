import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PixelWordmark } from "./pixel-wordmark";
import { PauseButton } from "./motion";
import { NavLinks } from "./nav-links";
import { LiveStatus } from "./live-status";
import type { LatestCommit } from "@/lib/github";

/** Crop-mark nav grid (design/hero v4): wordmark · Index · Docs · Status. */
export function SiteHeader({ dict, locale, commit }: { dict: Dictionary; locale: Locale; commit: LatestCommit | null }) {
  const { nav } = dict;
  return (
    // #site-header is the floating nav's signal (floating-nav.tsx). On phones only the space is kept:
    // the floating bar is the nav there, from the first screen.
    <div id="site-header" data-site-chrome className="h-[var(--header-h)]">
    <header className="wrap hidden h-full grid-cols-4 pt-1.5 text-label md:grid">
      <div className="crop px-4 py-2.5">
        <Link href={localePath(locale)} aria-label={nav.home} className="flex h-full w-full items-center text-ink transition-colors hover:text-accent-ink">
          <PixelWordmark className="h-auto max-h-full w-full" />
        </Link>
      </div>
      <nav aria-label={nav.label} className="contents">
        <div className="crop px-4 py-2.5">
          <Label>{nav.index}</Label>
          <NavLinks locale={locale} items={[{ key: "1", path: "/#work", label: nav.work }, { key: "2", path: "/#about", label: nav.about }]} />
        </div>
        <div className="crop px-4 py-2.5">
          <Label>{nav.docs}</Label>
          <NavLinks locale={locale} items={[{ key: "3", path: "/#cv", label: nav.cv }, { key: "4", path: "/#contact", label: nav.contact }]} />
        </div>
      </nav>
      <div className="crop px-4 py-2.5">
        <Label>{nav.status}</Label>
        <LiveStatus commit={commit} fallback={dict.status.now} locale={locale} />
        <PauseButton labels={dict.motion} />
      </div>
    </header>
    </div>
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
