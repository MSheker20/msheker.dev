import { education, experience, languages, skills, type Entry } from "@/content/cv";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHead } from "./section-head";

// Shared by the one-page home (as h2 sections) and the standalone routes (as h1 pages).
type Props = { dict: Dictionary; locale: Locale; id?: string; as?: "h1" | "h2" };
const screen = "min-h-svh scroll-mt-4 border-t border-line pt-[12vh] pb-[10vh]";

export function AboutSection({ dict, id, as = "h1" }: Props) {
  return (
    <section id={id} className={screen}>
      <div className="wrap">
        <SectionHead label={dict.pages.about.label} title={dict.pages.about.title} as={as} />
        <div className="max-w-[64ch] space-y-4 text-muted">
          {dict.pages.about.bio.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CvSection({ dict, locale, id, as = "h1" }: Props) {
  const t = dict.pages.cv;
  const Sub = as === "h1" ? "h2" : "h3";
  const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <Sub className="m-0 mb-3 border-b border-line pb-2 text-label font-normal text-muted">{title}</Sub>
      <div className="space-y-2">{children}</div>
    </div>
  );
  return (
    <section id={id} className={screen}>
      <div className="wrap">
        <SectionHead label={t.label} title={t.title} as={as} />
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
      </div>
    </section>
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

export function ContactSection({ dict, id, as = "h1" }: Props) {
  return (
    <section id={id} className={screen}>
      <div className="wrap">
        <SectionHead label={dict.pages.contact.label} title={dict.pages.contact.title} as={as} />
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
      </div>
    </section>
  );
}
