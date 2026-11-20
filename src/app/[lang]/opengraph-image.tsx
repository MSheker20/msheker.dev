import { ImageResponse } from "next/og";
import { PixelWordmark } from "@/components/pixel-wordmark";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";
import en from "@/i18n/dictionaries/en.json";
import tr from "@/i18n/dictionaries/tr.json";

export const alt = `${site.name} · ${site.domain}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Share card: dark ground, pixel wordmark, the hero line. Colours from docs/DESIGN.md (dark theme).
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = lang === "tr" ? tr : en;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          color: "#e9e9e4",
        }}
      >
        <PixelWordmark cell={14} gap={3} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 60, letterSpacing: "-0.02em" }}>{dict.home.statementStrong}</div>
          <div style={{ fontSize: 30, color: "#8b8b86" }}>{`${site.name} · ${site.domain}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
