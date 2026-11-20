import type { Metadata } from "next";
import { orgName, cvProjects, cvSummary, education, experience, languages, skills, type Entry } from "@/content/cv";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

// The PDF CV (D-013): ATS one-page standard. One column, A4, selectable text, standard
// headings, no icons, tables or images. scripts/cv-pdf.mjs prints this page to public/cv/.
// Contact uses the personal address, never hello@ (D-008); no phone.

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: `${dict.nav.cv} · PDF`, robots: { index: false, follow: false } };
}

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export default async function CvDocument() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const t = dict.pages.cv;

  return (
    <article className="cv-doc">
      <header>
        <h1>{site.name}</h1>
        <p className="cv-title">{t.docTitle}</p>
        <p className="cv-contact">
          {[site.location, site.cvEmail, strip(site.url), strip(site.links.github), strip(site.links.linkedin)].join(" | ")}
        </p>
      </header>

      <section>
        <h2>{t.summary}</h2>
        <p>{cvSummary[locale]}</p>
      </section>

      <section>
        <h2>{t.education}</h2>
        <Entries items={education} locale={locale} present={t.present} />
      </section>

      <section>
        <h2>{t.experience}</h2>
        <Entries items={experience} locale={locale} present={t.present} />
      </section>

      <section>
        <h2>{t.projects}</h2>
        {cvProjects.map((p) => (
          <div key={p.name} className="cv-entry">
            <p className="cv-row">
              <strong>
                {p.name}
                {p.link && ` | ${p.link}`}
              </strong>
              <span>{p.period[locale]}</span>
            </p>
            <p className="cv-sub">
              {p.role[locale]} | {p.stack.join(", ")}
            </p>
            <ul>
              {p.bullets.map((b) => (
                <li key={b.en}>{b[locale]}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>{t.skills}</h2>
        <p>
          <strong>{t.strong}:</strong> {skills.strong.join(", ")}
        </p>
        <p>
          <strong>{t.familiar}:</strong> {skills.comfortable.join(", ")}
        </p>
      </section>

      <section>
        <h2>{t.languages}</h2>
        <p>{languages.map((l) => `${l.name[locale]} (${l.level[locale]})`).join(", ")}</p>
      </section>
    </article>
  );
}

function Entries({ items, locale, present }: { items: Entry[]; locale: Locale; present: string }) {
  return items.map((e) => (
    <div key={orgName(e.org, "en")} className="cv-entry">
      <p className="cv-row">
        <strong>{orgName(e.org, locale)}</strong>
        <span>{e.start ? `${e.start} – ${e.end ?? present}` : e.end}</span>
      </p>
      <p className="cv-sub">
        {e.role[locale]}
        {e.place && ` | ${e.place}`}
      </p>
      {e.note && <p>{e.note[locale]}</p>}
    </div>
  ));
}
