// Project index for /work. Long case studies move to MDX in phase 4. Source: docs/COPY.md §6.
import type { Locale } from "@/i18n/config";

export type Project = {
  slug: string;
  name: string;
  year: string;
  status: "live" | "in-progress" | "archive";
  featured: boolean;
  summary: Record<Locale, string>;
  stack: string[];
  links?: { live?: string; repo?: string };
};

export const projects: Project[] = [
  {
    slug: "covertgift",
    name: "CovertGift",
    year: "2026",
    status: "live",
    featured: true,
    summary: {
      en: "Group gift planner. The person getting the gift can’t see a thing, and the server enforces it: every route answers them 403.",
      tr: "Ortak hediye planlayıcı. Hediye alınan kişi hiçbir şey göremez ve bunu sunucu sağlar: her uç ona 403 döner.",
    },
    stack: ["Go", "PostgreSQL", "React", "SSE", "Azure"],
    links: { live: "https://covertgift.msheker.dev", repo: "https://github.com/MSheker20/CovertGift" },
  },
  {
    slug: "alterf1",
    name: "AlterF1",
    year: "2026",
    status: "in-progress",
    featured: true,
    summary: {
      en: "What if 1988 had been scored under 1991 rules? Every F1 season since 1950, replayed under five historical points systems.",
      tr: "1988 şampiyonası 1991 kurallarıyla puanlansaydı? 1950'den bu yana her F1 sezonu, beş tarihi puanlama sistemiyle yeniden.",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL", "React"],
    links: { repo: "https://github.com/MSheker20/AlterF1" },
  },
];
