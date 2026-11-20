import type { Metadata } from "next";
import { site } from "@/content/site";
import { defaultLocale, localePath, locales, type Locale } from "./config";

/** Every indexable path, without a locale prefix. */
export const routes = ["/", "/work", "/work/covertgift", "/work/alterf1", "/about", "/cv", "/contact"] as const;

/** Canonical URL for this locale plus hreflang links to every language version. */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [l, localePath(l, path)]));
  languages["x-default"] = localePath(defaultLocale, path);
  return { canonical: localePath(locale, path), languages };
}

/** schema.org Person for the home page. Only facts from docs/CONTENT.md. */
export function personJsonLd(jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle,
    address: { "@type": "PostalAddress", addressLocality: "Denizli", addressCountry: "TR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Pamukkale University" },
    sameAs: [site.links.github, site.links.linkedin],
  };
}
