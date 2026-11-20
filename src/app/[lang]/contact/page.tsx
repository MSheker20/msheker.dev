import type { Metadata } from "next";
import { ContactSection } from "@/components/sections";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.contact };
}

export default async function Page() {
  return <ContactSection dict={await getDictionary()} locale={await getLocale()} />;
}
