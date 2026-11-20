import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PaletteButton } from "./command-palette";
import { PauseButton } from "./motion";
import { LangSwitch } from "./nav-links";
import { SettingsMenu, SettingsRow } from "./settings-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <>
      {/* bottom padding on phones keeps the copyright clear of the floating settings button */}
      <footer data-site-chrome className="wrap mt-auto flex items-center border-t border-line pt-4 pb-20 text-label text-muted md:pb-4">
        <p className="m-0 flex min-h-11 items-center">
          © {site.name} · {dict.status.location}
        </p>
      </footer>
      {/* GitHub and LinkedIn live in the Contact section; settings float bottom-right */}
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
        <SettingsRow label={dict.palette.open}>
          <PaletteButton label={dict.palette.label} />
        </SettingsRow>
      </SettingsMenu>
    </>
  );
}
