import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LangSwitch } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="wrap mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-4 text-label text-muted">
      <p className="m-0">
        © {site.name} · {dict.status.location}
      </p>
      <div className="flex flex-wrap items-center gap-x-5">
        <a className="navlink text-muted hover:text-ink" href={site.links.github}>
          <span>GitHub ↗</span>
        </a>
        <a className="navlink text-muted hover:text-ink" href={site.links.linkedin}>
          <span>LinkedIn ↗</span>
        </a>
        {/* language and theme live in the Status cell on desktop; the footer carries them on phones */}
        <span className="contents md:hidden">
          <LangSwitch locale={locale} label={dict.language.switchTo} />
          <ThemeToggle labels={dict.theme} />
        </span>
      </div>
    </footer>
  );
}
