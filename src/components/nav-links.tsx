"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { defaultLocale, localePath, type Locale } from "@/i18n/config";

export type NavItem = { key: string; path: string; label: string };

/** Path without the /tr prefix, so /tr/work and /work both read as /work. */
function basePath(pathname: string) {
  return pathname.replace(/^\/tr(?=\/|$)/, "") || "/";
}

export function NavLinks({ items, locale }: { items: NavItem[]; locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const current = basePath(pathname);

  // keys 1–4 jump to the numbered pages (opencode-style); ignored while typing
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      const item = items.find((i) => i.key === e.key);
      if (item) router.push(localePath(locale, item.path));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items, locale, router]);

  return items.map((item) => (
    <Link
      key={item.key}
      href={localePath(locale, item.path)}
      className="navlink flex"
      aria-current={current === item.path.replace("/#", "/") ? "page" : undefined}
      aria-keyshortcuts={item.key}
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
