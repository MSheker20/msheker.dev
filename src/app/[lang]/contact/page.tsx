import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.contact };
}

export default async function ContactPage() {
  const dict = await getDictionary();
  return (
    <section className="wrap py-[10vh]">
      <SectionHead label={dict.pages.contact.label} title={dict.pages.contact.title} />
      <div className="flex flex-wrap gap-2.5">
        <a className="btn" href={`mailto:${site.email}`}>
          {dict.pages.contact.email}: {site.email}
        </a>
        <a className="btn btn-ghost" href={site.links.github}>
          GitHub ↗
        </a>
        <a className="btn btn-ghost" href={site.links.linkedin}>
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
