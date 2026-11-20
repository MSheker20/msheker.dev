export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** English lives at the root (/work), Turkish under /tr (/tr/work). */
export function localePath(locale: Locale, path = "/"): string {
  // "/" and "/#section" both live on the locale's home: /tr, /tr#work
  const clean = path === "/" ? "" : path.startsWith("/#") ? path.slice(1) : path;
  if (locale !== defaultLocale) return `/${locale}${clean}`;
  return clean.startsWith("#") ? `/${clean}` : clean || "/";
}
