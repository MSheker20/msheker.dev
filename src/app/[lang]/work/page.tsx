import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { projects } from "@/content/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.work };
}

export default async function WorkPage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  return (
    <section className="wrap py-[10vh]">
      <SectionHead label={dict.pages.work.label} title={dict.pages.work.title} />
      <ul className="m-0 list-none border-t border-line p-0">
        {projects.map((p) => (
          <li key={p.slug} className="grid gap-x-6 gap-y-1 border-b border-line py-5 md:grid-cols-[200px_1fr_auto]">
            <h2 className="m-0 text-body font-medium">
              {p.name}
              {p.status === "in-progress" && <span className="ml-2 font-normal text-accent-ink">· wip</span>}
            </h2>
            <p className="m-0 text-card text-muted">{p.summary[locale]}</p>
            <p className="m-0 text-label text-muted">
              {p.stack.join(" · ")} · {p.year}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
