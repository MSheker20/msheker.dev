import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TypedTerminal } from "@/components/typed-terminal";
import { cases, getCase, type CaseStudy } from "@/content/cases";
import { projects } from "@/content/projects";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/i18n/seo";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const locale = await getLocale();
  return { title: project.name, description: project.summary[locale], alternates: alternates(locale, `/work/${slug}`) };
}

export default async function CasePage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const study = getCase(slug);
  const project = projects.find((p) => p.slug === slug);
  if (!study || !project) notFound();

  const dict = await getDictionary();
  const locale = await getLocale();
  const t = dict.pages.case;
  const [lead, ...rest] = study.shots ?? [];
  const closing = study.outcome ? { label: t.outcome, text: study.outcome } : study.next && { label: t.next, text: study.next };

  return (
    <article className="wrap py-[10vh]">
      <Link
        href={localePath(locale, "/work")}
        className="mb-9 inline-flex min-h-11 items-center gap-2 text-label text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden="true">←</span> {t.back}
      </Link>

      <header className="mb-12">
        <div className="mb-3 flex items-center gap-2 text-label text-muted">
          <i aria-hidden="true" className="inline-block size-[7px] bg-ink" />
          {dict.pages.work.label}
          {project.status === "in-progress" && <span className="text-accent-ink">· {t.wip}</span>}
        </div>
        <h1 className="m-0 text-section font-normal">{project.name}</h1>
        <p className="mt-5 mb-0 max-w-[36ch] text-statement">{project.summary[locale]}</p>

        <dl className="mt-10 grid gap-x-6 gap-y-4 border-t border-line pt-5 text-card md:grid-cols-[1fr_1fr_2fr]">
          <div>
            <dt className="text-label text-muted">{t.role}</dt>
            <dd className="m-0">{study.role[locale]}</dd>
          </div>
          <div>
            <dt className="text-label text-muted">{t.period}</dt>
            <dd className="m-0">{study.period[locale]}</dd>
          </div>
          <div>
            <dt className="text-label text-muted">{t.stack}</dt>
            <dd className="m-0">{study.stack.join(" · ")}</dd>
          </div>
        </dl>

        {project.links && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.live && (
              <a className="btn" href={project.links.live}>
                {t.live}
              </a>
            )}
            {project.links.repo && (
              <a className="btn btn-ghost" href={project.links.repo}>
                {t.repo}
              </a>
            )}
          </div>
        )}
      </header>

      {lead && <Shot shot={lead} locale={locale} priority />}
      {study.terminal && (
        <div className="term h-[280px] md:h-[360px]">
          <div className="term-bar">
            <i />
            <i />
            <i />
            <b className="ml-1.5 font-normal">{study.terminal.bar}</b>
          </div>
          <TypedTerminal script={study.terminal.script} />
        </div>
      )}

      <section className="mt-12 grid gap-x-6 gap-y-3 border-t border-line py-12 md:grid-cols-[200px_1fr]">
        <h2 className="m-0 text-label font-normal text-muted">{t.problem}</h2>
        <p className="m-0 max-w-[60ch] text-body">{study.problem[locale]}</p>
      </section>

      <section className="grid gap-x-6 gap-y-6 border-t border-line py-12 md:grid-cols-[200px_1fr]">
        <h2 className="m-0 text-label font-normal text-muted">{t.approach}</h2>
        <ol className="m-0 grid list-none gap-x-6 gap-y-8 p-0 md:grid-cols-2">
          {study.decisions.map((d, i) => (
            <li key={d.title.en}>
              <h3 className="m-0 text-body font-medium">
                <span className="mr-2 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                {d.title[locale]}
              </h3>
              <p className="mt-2 mb-0 max-w-[60ch] text-card text-muted">{d.body[locale]}</p>
            </li>
          ))}
        </ol>
      </section>

      {rest.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((s) => (
            <Shot key={s.src} shot={s} locale={locale} />
          ))}
        </div>
      )}

      {closing && (
        <section className="mt-12 grid gap-x-6 gap-y-3 border-t border-line pt-12 md:grid-cols-[200px_1fr]">
          <h2 className="m-0 text-label font-normal text-muted">{closing.label}</h2>
          <p className="m-0 max-w-[60ch] text-body">{closing.text[locale]}</p>
        </section>
      )}
    </article>
  );
}

type Shot = NonNullable<CaseStudy["shots"]>[number];

function Shot({ shot, locale, priority }: { shot: Shot; locale: Locale; priority?: boolean }) {
  return (
    <div className="group overflow-hidden border border-line bg-surface">
      <Image
        src={shot.src}
        alt={shot.alt[locale]}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </div>
  );
}
