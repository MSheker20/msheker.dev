import type { Metadata } from "next";
import { AboutSection } from "@/components/sections";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.about };
}

export default async function Page() {
  return <AboutSection dict={await getDictionary()} locale={await getLocale()} />;
}
