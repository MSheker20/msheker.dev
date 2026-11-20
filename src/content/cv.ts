// Single source for /cv, /about and the PDF. Source: docs/CONTENT.md + docs/COPY.md.
// Dates are "YYYY-MM" (or "YYYY"); end: null means ongoing.
import type { Locale } from "@/i18n/config";

type Text = Record<Locale, string>;

export type Entry = {
  org: string;
  role: Text;
  start?: string;
  end: string | null;
  place?: string;
  note?: Text;
};

export const experience: Entry[] = [
  {
    org: "PauSiber", // TODO: full community name (CONTENT.md §3)
    role: { en: "Board Member", tr: "Yönetim Kurulu Üyesi" },
    start: "2024",
    end: null,
    note: {
      en: "Help run the student community's events and contributed to organizing its JavaScript workshops.",
      tr: "Topluluğun etkinliklerinin yürütülmesinde ve JavaScript atölyelerinin düzenlenmesinde görev alıyorum.",
    },
  },
];

export const education: Entry[] = [
  {
    org: "Pamukkale University",
    role: { en: "B.Sc. Computer Engineering · 3rd year", tr: "Bilgisayar Mühendisliği (Lisans) · 3. sınıf" },
    start: "2023",
    end: null,
    place: "Denizli",
    note: { en: "Expected graduation 2027", tr: "Beklenen mezuniyet 2027" },
  },
  {
    org: "Mustafa Kaynak Anadolu Lisesi",
    role: { en: "High school (Project School)", tr: "Lise (Proje Okulu)" },
    end: "2022", // graduation year only (CONTENT.md)
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
