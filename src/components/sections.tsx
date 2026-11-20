import { education, experience, orgName, languages, skills, type Entry } from "@/content/cv";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SectionHead } from "./section-head";
import { BrandIcon, BrandList } from "@/components/brand-icon";
import { brandIcons } from "@/content/brand-icons";

// Shared by the one-page home (as h2 sections) and the standalone routes (as h1 pages).
type Props = { dict: Dictionary; locale: Locale; id?: string; as?: "h1" | "h2" };
const screen = "scroll-mt-4 border-t border-line py-12 md:py-24";

export function AboutSection({ dict, id, as = "h1" }: Props) {
  return (
    <section id={id} className={screen}>
      <div className="wrap">
        <SectionHead label={dict.pages.about.label} title={dict.pages.about.title} as={as} />
        <div className="flex max-w-[64ch] flex-col gap-4 text-muted">
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
  const sub = as === "h1" ? "h2" : "h3";
  return (
    <section id={id} className={screen}>
      <div className="wrap">
        <SectionHead label={t.label} title={t.title} as={as} />
        <a className="btn mb-10" href={`/cv/mustafa-seker-cv-${locale}.pdf`} download>
          {t.download} <span aria-hidden="true">↓</span>
        </a>
        <div className="grid gap-10 md:grid-cols-2">
          <Block as={sub} title={t.experience}>
            <Entries items={experience} locale={locale} present={t.present} />
          </Block>
          <Block as={sub} title={t.education}>
            <Entries items={education} locale={locale} present={t.present} />
          </Block>
          <Block as={sub} title={t.skills}>
            <p className="m-0"><BrandList labels={skills.strong} /></p>
            <p className="m-0 mt-1 text-muted"><BrandList labels={skills.comfortable} /></p>
          </Block>
          <Block as={sub} title={t.languages}>
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

function Block({ as: Tag, title, children }: { as: "h2" | "h3"; title: string; children: React.ReactNode }) {
  return (
    <div>
      <Tag className="m-0 mb-3 border-b border-line pb-2 text-label font-normal text-muted">{title}</Tag>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Entries({ items, locale, present }: { items: Entry[]; locale: Locale; present: string }) {
  return items.map((e) => (
    <div key={orgName(e.org, "en")}>
      <p className="m-0 font-medium">{orgName(e.org, locale)}</p>
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
            <BrandIcon icon={brandIcons.github} />
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
