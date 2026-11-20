import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PixelWordmark } from "./pixel-wordmark";
import { LangSwitch, NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

/** Crop-mark nav grid (design/hero v4): wordmark · Index · Docs · Status. */
export function SiteHeader({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { nav } = dict;
  return (
    <header className="wrap grid grid-cols-[auto_1fr_1fr] pt-1.5 text-label md:grid-cols-4">
      <div className="crop px-2.5 py-2.5 md:px-4">
        <Link href={localePath(locale)} aria-label={nav.home} className="inline-flex min-h-11 items-center text-ink transition-colors hover:text-accent-ink">
          <PixelWordmark className="h-auto w-[82px] md:w-auto" />
        </Link>
      </div>
      <nav aria-label={nav.label} className="contents">
        <div className="crop px-2.5 py-2.5 md:px-4">
          <Label>{nav.index}</Label>
          <NavLinks locale={locale} items={[{ key: "1", path: "/work", label: nav.work }, { key: "2", path: "/about", label: nav.about }]} />
        </div>
        <div className="crop px-2.5 py-2.5 md:px-4">
          <Label>{nav.docs}</Label>
          <NavLinks locale={locale} items={[{ key: "3", path: "/cv", label: nav.cv }, { key: "4", path: "/contact", label: nav.contact }]} />
        </div>
      </nav>
      <div className="crop hidden px-4 py-2.5 md:block">
        <Label>{nav.status}</Label>
        <p className="m-0 flex min-h-11 items-center">
          <span aria-hidden="true" className="mr-2 inline-block size-[7px] rounded-full bg-ok" />
          {dict.status.now}
        </p>
        <div className="flex flex-wrap gap-x-4">
          <LangSwitch locale={locale} label={dict.language.switchTo} />
          <ThemeToggle labels={dict.theme} />
        </div>
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
