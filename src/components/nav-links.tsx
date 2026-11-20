"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, localePath, type Locale } from "@/i18n/config";

export type NavItem = { key: string; path: string; label: string };

/** Path without the /tr prefix, so /tr/work and /work both read as /work. */
export function basePath(pathname: string) {
  return pathname.replace(/^\/tr(?=\/|$)/, "") || "/";
}

/** The four numbered destinations; the grid header and the floating nav both draw from this. */
export const NAV_PATHS = ["/#work", "/#about", "/#cv", "/#contact"] as const;

/** Keys 1–4 jump to the numbered pages (opencode-style); mounted once, ignored while typing. */
export function NavShortcuts({ locale }: { locale: Locale }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      const path = NAV_PATHS[Number(e.key) - 1];
      if (path && /^[1-4]$/.test(e.key)) router.push(localePath(locale, path));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locale, router]);
  return null;
}

export function NavLinks({ items, locale, onNavigate }: { items: NavItem[]; locale: Locale; onNavigate?: () => void }) {
  const pathname = usePathname();
  const current = basePath(pathname);

  return items.map((item) => (
    <Link
      key={item.key}
      href={localePath(locale, item.path)}
      className="navlink flex"
      aria-current={current === item.path.replace("/#", "/") ? "page" : undefined}
      aria-keyshortcuts={item.key}
      onClick={onNavigate}
    >
      <kbd>[{item.key}]</kbd>
      <span>{item.label}</span>
    </Link>
  ));
}

export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const base = basePath(usePathname());
  const other: Locale = locale === defaultLocale ? "tr" : defaultLocale;
  return (
    <Link href={localePath(other, base)} hrefLang={other} lang={other} className="navlink text-muted hover:text-ink">
      <kbd>[{other}]</kbd>
      <span>{label}</span>
    </Link>
  );
}
