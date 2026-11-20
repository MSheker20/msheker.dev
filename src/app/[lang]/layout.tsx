import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { MotionProvider } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/seo";

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const locale = await getLocale();
  return {
    metadataBase: new URL(site.url),
    alternates: alternates(locale),
    openGraph: { type: "website", siteName: site.name, locale: locale === "tr" ? "tr_TR" : "en_US" },
    twitter: { card: "summary_large_image" },
    title: { default: dict.meta.title, template: `%s — ${site.name}` },
    description: dict.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();
  return (
    <html lang={locale} className={mono.variable} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        {/* applies a stored theme before hydration, so it never flashes */}
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a href="#main" className="absolute -top-16 left-3 z-50 bg-ink px-3.5 py-2.5 text-bg focus:top-3">
          {dict.skip}
        </a>
        <MotionProvider>
          <SiteHeader dict={dict} locale={locale} />
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter dict={dict} locale={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
