import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { PaletteButton } from "./command-palette";
import { LocalClock } from "./local-clock";
import { PixelWordmark } from "./pixel-wordmark";
import { PauseButton } from "./motion";
import { LangSwitch } from "./nav-links";
import { SettingsMenu, SettingsRow } from "./settings-menu";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <>
      {/* bottom padding on phones keeps the copyright clear of the floating settings button */}
      <footer data-site-chrome className="wrap mt-auto border-t border-line pt-10 pb-20 text-label text-muted md:pb-4">
        {/* the closing word: the pixel wordmark across the full width (decoration; the name is in the line below) */}
        <PixelWordmark className="footer-mark h-auto w-full" />
        {/* left-aligned: the floating settings button owns the bottom-right corner */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6">
          <p className="m-0 flex min-h-11 items-center">
            © {site.name} · {dict.status.location}
          </p>
          <LocalClock locale={locale} place={dict.footer.time} />
        </div>
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
