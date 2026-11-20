// Single source for /cv, /about and the PDF. Source: docs/CONTENT.md + docs/COPY.md.
// Dates are "YYYY-MM" (or "YYYY"); end: null means ongoing.
import type { Locale } from "@/i18n/config";

type Text = Record<Locale, string>;

export type Entry = {
  org: string | Text; // a plain string reads the same in every language
  role: Text;
  start?: string;
  end: string | null;
  place?: string;
  note?: Text;
  /** One-colour logo mask in public/logos (web CV only, never the PDF: D-013). */
  logo?: string;
};

export const orgName = (org: Entry["org"], locale: Locale) => (typeof org === "string" ? org : org[locale]);

export const experience: Entry[] = [
  {
    org: "PauSiber", // short name by choice (CONTENT.md §3)
    logo: "/logos/pausiber.png", // the club's owl, from the user's own file
    role: { en: "Board Member", tr: "Yönetim Kurulu Üyesi" },
    start: "2024",
    end: null,
    note: {
      en: "Take part in organizing and running the community's events.",
      tr: "Topluluğun etkinliklerinin yürütülmesinde ve düzenlenmesinde görev alıyorum.",
    },
  },
];

export const education: Entry[] = [
  {
    org: { en: "Pamukkale University", tr: "Pamukkale Üniversitesi" },
    logo: "/logos/pau.png", // official black-and-white seal, pau.edu.tr corporate identity kit
    role: { en: "B.Sc. Computer Engineering · 3rd year", tr: "Bilgisayar Mühendisliği (Lisans) · 3. sınıf" },
    start: "2024",
    end: null,
    place: "Denizli",
    note: { en: "Expected graduation 2028", tr: "Beklenen mezuniyet 2028" },
  },
  {
    org: "Mustafa Kaynak Anadolu Lisesi",
    logo: "/logos/mkal.png", // school seal from the user's own file; the sun kept at half strength
    role: { en: "High school (Project School)", tr: "Lise (Proje Okulu)" },
    start: "2019",
    end: "2023", // graduation year only (CONTENT.md)
    place: "Denizli",
  },
];

export const skills = {
  strong: ["Go (Gin)", "TypeScript", "React", "Java", "PostgreSQL"],
  comfortable: ["C", "C++", "Python", "Docker", "Linux", "Azure", "Git"],
};

export const languages = [
  { name: { en: "Turkish", tr: "Türkçe" }, level: { en: "Native", tr: "Ana dil" } },
  { name: { en: "English", tr: "İngilizce" }, level: { en: "B2", tr: "B2" } },
];

// ---- PDF CV only (ATS one-page standard, D-013). Source: docs/CONTENT.md §1, §4 and docs/COPY.md §6.

export const cvSummary = {
  en: "Third-year Computer Engineering student at Pamukkale University. Builds web apps end to end, from the API to the interface, and deploys them. Most recent: CovertGift, a live, tested, bilingual full-stack app on Azure.",
  tr: "Pamukkale Üniversitesi Bilgisayar Mühendisliği 3. sınıf öğrencisi. Web uygulamalarını API'den arayüze uçtan uca yazıyor ve canlıya alıyor. Son projesi CovertGift: Azure'da çalışan, testli ve iki dilli bir full-stack uygulama.",
};

type L = { en: string; tr: string };
export type CvProject = { name: string; role: L; period: L; link?: string; stack: string[]; bullets: L[] };

export const cvProjects: CvProject[] = [
  {
    name: "CovertGift",
    role: { en: "Solo developer", tr: "Tek geliştirici" },
    period: { en: "Oct 2026 – present", tr: "Ekim 2026 – devam ediyor" },
    link: "covertgift.msheker.dev",
    stack: ["Go", "Gin", "PostgreSQL", "React", "TypeScript", "SSE", "Docker", "Azure Container Apps"],
    bullets: [
      {
        en: "Group gift planner, live in production: 127 commits, 40 Go test files, Turkish and English, light and dark themes.",
        tr: "Ortak hediye planlayıcı, canlıda: 127 commit, 40 Go test dosyası, Türkçe ve İngilizce, açık ve koyu tema.",
      },
      {
        en: "Anti-Spoiler enforced on the server: the recipient gets 403 on every route, guarded by integration tests against a real PostgreSQL.",
        tr: "Anti-Spoiler sunucuda: hedef kişi her uçta 403 alıyor; kurallar gerçek PostgreSQL ile çalışan entegrasyon testleriyle korunuyor.",
      },
      {
        en: "Product link previews with SSRF protection: domain allowlist, private IP blocking, size and redirect limits.",
        tr: "SSRF korumalı ürün linki önizlemesi: alan adı izin listesi, özel IP engeli, boyut ve yönlendirme sınırı.",
      },
      {
        en: "Live updates over SSE that carry no data, so real-time never bypasses the access rules.",
        tr: "Veri taşımayan SSE olaylarıyla canlı güncelleme; canlılık yetki kurallarını delmiyor.",
      },
    ],
  },
  {
    name: "AlterF1",
    role: { en: "Solo developer", tr: "Tek geliştirici" },
    period: { en: "2026 – in progress", tr: "2026 – devam ediyor" },
    stack: ["Java", "REST"],
    bullets: [
      {
        en: "Re-scores real Formula 1 seasons under five historical points systems and serves the alternative championships as JSON over a REST API.",
        tr: "Gerçek Formula 1 sezonlarını beş tarihi puanlama sistemiyle yeniden puanlıyor; alternatif şampiyonaları REST API ile JSON olarak veriyor.",
      },
    ],
  },
];
