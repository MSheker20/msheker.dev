import type { Metadata } from "next";
import { ContactSection } from "@/components/sections";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.contact, alternates: alternates(await getLocale(), "/contact") };
}

export default async function Page() {
  return <ContactSection dict={await getDictionary()} locale={await getLocale()} />;
}
