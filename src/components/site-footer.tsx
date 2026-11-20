import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PauseButton } from "./motion";
import { LangSwitch } from "./nav-links";
import { SettingsMenu, SettingsRow } from "./settings-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer data-site-chrome className="wrap mt-auto flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-t border-line py-4 text-label text-muted">
      <p className="m-0 flex min-h-11 items-center">
        © {site.name} · {dict.status.location}
      </p>
      {/* GitHub and LinkedIn live in the Contact section; the footer keeps only settings */}
      <SettingsMenu label={dict.footer.settings}>
        <SettingsRow label={dict.language.label}>
          <LangSwitch locale={locale} label={dict.language.switchTo} />
        </SettingsRow>
        <SettingsRow label={dict.theme.label}>
          <ThemeToggle labels={dict.theme} />
        </SettingsRow>
        <SettingsRow label={dict.motion.label}>
          <PauseButton labels={dict.motion} />
        </SettingsRow>
      </SettingsMenu>
    </footer>
  );
}
