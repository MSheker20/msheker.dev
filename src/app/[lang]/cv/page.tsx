import type { Metadata } from "next";
import { SectionHead } from "@/components/section-head";
import { education, experience, languages, skills, type Entry } from "@/content/cv";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.nav.cv };
}

export default async function CvPage() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const t = dict.pages.cv;
  return (
    <section className="wrap py-[10vh]">
      <SectionHead label={t.label} title={t.title} />
      <div className="grid gap-10 md:grid-cols-2">
        <Block title={t.experience}>
          <Entries items={experience} locale={locale} present={t.present} />
        </Block>
        <Block title={t.education}>
          <Entries items={education} locale={locale} present={t.present} />
        </Block>
        <Block title={t.skills}>
          <p className="m-0">{skills.strong.join(" · ")}</p>
          <p className="m-0 text-muted">{skills.comfortable.join(" · ")}</p>
        </Block>
        <Block title={t.languages}>
          {languages.map((l) => (
            <p key={l.name.en} className="m-0">
              {l.name[locale]} <span className="text-muted">· {l.level[locale]}</span>
            </p>
          ))}
        </Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="m-0 mb-3 border-b border-line pb-2 text-label font-normal text-muted">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Entries({ items, locale, present }: { items: Entry[]; locale: Locale; present: string }) {
  return items.map((e) => (
    <div key={e.org}>
      <p className="m-0 font-medium">{e.org}</p>
      <p className="m-0">{e.role[locale]}</p>
      <p className="m-0 text-label text-muted">
        {e.start ? `${e.start} → ${e.end ?? present}` : e.end}
        {e.place && ` · ${e.place}`}
      </p>
      {e.note && <p className="m-0 text-card text-muted">{e.note[locale]}</p>}
    </div>
  ));
}
