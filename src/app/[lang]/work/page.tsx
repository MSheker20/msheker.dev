import type { Metadata } from "next";
import Link from "next/link";
import { SectionHead } from "@/components/section-head";
import { projects } from "@/content/projects";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/seo";
import { BrandList } from "@/components/brand-icon";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.work, alternates: alternates(await getLocale(), "/work") };
}

export default async function WorkPage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  return (
    <section className="wrap py-[10vh]">
      <SectionHead label={dict.pages.work.label} title={dict.pages.work.title} />
      <ul className="m-0 list-none border-t border-line p-0">
        {projects.map((p) => (
          <li key={p.slug} className="relative grid gap-x-6 gap-y-1 border-b border-line py-5 md:grid-cols-[200px_1fr_auto]">
            <h2 className="m-0 text-body font-medium">
              <Link href={localePath(locale, `/work/${p.slug}`)} className="underline-offset-4 hover:underline after:absolute after:inset-0">
                {p.name}
              </Link>
              {p.status === "in-progress" && <span className="ml-2 font-normal text-accent-ink">· wip</span>}
            </h2>
            <p className="m-0 text-card text-muted">{p.summary[locale]}</p>
            <p className="m-0 flex flex-wrap items-center gap-x-3.5 text-label text-muted">
              <BrandList labels={p.stack} />
              <span>{p.year}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
