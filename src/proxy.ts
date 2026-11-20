import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * English is served without a prefix: /work is rewritten to /en/work.
 * Turkish keeps its prefix: /tr/work. A typed /en/... is redirected to the bare path.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // share images: og:image points at /en/opengraph-image; crawlers must get it without a redirect
  if (first === defaultLocale && pathname.endsWith("/opengraph-image")) return;

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if ((locales as readonly string[]).includes(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip Next internals and any file with an extension (favicon.ico, images, fonts)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
