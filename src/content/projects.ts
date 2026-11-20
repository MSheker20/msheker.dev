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
      en: "What if 2024 had been scored like 1991? Real F1 seasons under five historical points systems.",
      tr: "2024 sezonu 1991 puanlamasıyla oynansaydı? Gerçek F1 sezonları, beş tarihi puanlama sistemiyle.",
    },
    stack: ["Java", "REST"],
  },
  {
    slug: "zikirmatik",
    name: "React Native Zikirmatik",
    year: "2024",
    status: "archive",
    featured: false,
    summary: { en: "Mobile counter app.", tr: "Mobil sayaç uygulaması." },
    stack: ["React Native"],
    links: { repo: "https://github.com/MSheker20/React-Native-Zikirmatik" },
  },
  {
    slug: "sinav-sistemi",
    name: "Sınav Sistemi V2",
    year: "2025",
    status: "archive",
    featured: false,
    summary: { en: "Exam system.", tr: "Sınav sistemi." },
    stack: ["Java"],
    links: { repo: "https://github.com/MSheker20/SinavSistemiV2" },
  },
  {
    slug: "okul-otomasyonu",
    name: "Okul Otomasyonu",
    year: "2025",
    status: "archive",
    featured: false,
    summary: { en: "School management system.", tr: "Okul otomasyonu." },
    stack: ["C"],
  },
];
