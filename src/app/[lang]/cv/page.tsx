import type { Metadata } from "next";
import { CvSection } from "@/components/sections";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.cv, alternates: alternates(await getLocale(), "/cv") };
}

export default async function Page() {
  return <CvSection dict={await getDictionary()} locale={await getLocale()} />;
}
