import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { localePath, locales } from "@/i18n/config";
import { routes } from "@/i18n/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((path) =>
    locales.map((locale) => ({
      url: site.url + localePath(locale, path),
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, site.url + localePath(l, path)])) },
    })),
  );
}
