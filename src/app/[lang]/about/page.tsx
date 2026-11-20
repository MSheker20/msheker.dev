import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.about };
}

export default async function AboutPage() {
  const dict = await getDictionary();
  return (
    <section className="wrap py-[10vh]">
      <SectionHead label={dict.pages.about.label} title={dict.pages.about.title} />
      <div className="max-w-[64ch] space-y-4 text-muted">
        {dict.pages.about.bio.map((p, i) => (
          <p key={i} className="m-0">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
