import { ImageResponse } from "next/og";
import { PixelWordmark } from "@/components/pixel-wordmark";
import { brandIconFor } from "@/content/brand-icons";
import { cases } from "@/content/cases";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";
import en from "@/i18n/dictionaries/en.json";
import tr from "@/i18n/dictionaries/tr.json";

export const alt = `${site.name} · case study`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((lang) => cases.map((c) => ({ lang, slug: c.slug })));
}

// Per-project share card, same language as the site card ([lang]/opengraph-image.tsx): dark ground,
// a terminal frame, the project's name and one-line summary, its stack with real logos.
// Colours from docs/DESIGN.md (terminal tokens).
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = lang === "tr" ? tr : en;
  const project = projects.find((p) => p.slug === slug)!;
  const summary = project.summary[lang === "tr" ? "tr" : "en"];
  const wip = project.status === "in-progress";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 56, background: "#0b0b0c", color: "#e9e9e4" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "1px solid #26262a",
            borderRadius: 10,
            background: "#0e0e10",
          }}
        >
          {/* terminal bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 24px", borderBottom: "1px solid #26262a", color: "#8b8b86", fontSize: 24 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2c2c30" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2c2c30" }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2c2c30" }} />
            <div style={{ marginLeft: 8 }}>{`~/work/${slug}`}</div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 48px 44px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 84, letterSpacing: "-0.03em" }}>
                {project.name}
                {wip && <div style={{ fontSize: 30, color: "#6f8bff", letterSpacing: 0 }}>{`· ${dict.home.wip}`}</div>}
              </div>
              <div style={{ fontSize: 34, lineHeight: 1.35, color: "#b9b9b3", maxWidth: 960 }}>{summary}</div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, maxWidth: 760 }}>
                {project.stack.map((s) => {
                  const icon = brandIconFor(s);
                  return (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "1px solid #26262a", fontSize: 24, color: "#d9d9d2" }}>
                      {icon && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={icon.hex}>
                          <path d={icon.path} />
                        </svg>
                      )}
                      {s}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                <PixelWordmark cell={6} gap={1} />
                <div style={{ fontSize: 22, color: "#8b8b86" }}>{site.domain}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
