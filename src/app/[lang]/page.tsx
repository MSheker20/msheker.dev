import Link from "next/link";
import { Fragment } from "react";
import { ApiLog } from "@/components/api-log";
import Image from "next/image";
import portrait from "@/assets/portrait.webp";
import { NameMarquee } from "@/components/name-marquee";
import { SectionHead } from "@/components/section-head";
import { AboutSection, ContactSection, CvSection } from "@/components/sections";
import { TypedTerminal } from "@/components/typed-terminal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { personJsonLd } from "@/i18n/seo";
import { BrandLabel } from "@/components/brand-icon";
import { ActivityHeatmap } from "@/components/activity-heatmap";
import { getActivity } from "@/lib/github";

// design/hero/v4.html as the home page: screen 1 hero, screen 2 work.
export default async function Home() {
  const dict = await getDictionary();
  const activity = await getActivity();
  const locale = await getLocale();
  const strong = dict.home.statementStrong.split(" ");
  const covertgift = projects.find((p) => p.slug === "covertgift")!;
  const alterf1 = projects.find((p) => p.slug === "alterf1")!;

  const jsonLd = JSON.stringify(personJsonLd(dict.home.statementStrong.replace(/\.$/, ""))).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      {/* screen 1: fills the viewport together with the nav grid */}
      <section className="grid min-h-[calc(100svh_-_var(--header-h))] grid-rows-[1fr_auto] overflow-hidden">
        <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-7 py-[2vh] md:grid-cols-[minmax(0,1fr)_minmax(0,520px)] md:gap-12">
          <div className="enter">
            <h1 className="m-0 max-w-[24ch] text-statement font-normal">
              {/* the space sits outside each span, so lines can still break between words */}
              {strong.map((w, i) => (
                <Fragment key={i}>
                  <span className="whitespace-nowrap">{w}</span>{" "}
                </Fragment>
              ))}
              <span className="text-muted">{dict.home.statementDim}</span>
            </h1>
            <div className="mt-6 flex flex-wrap gap-2.5 [&>a]:max-sm:flex-1 [&>a]:max-sm:justify-center">
              <Link href="#work" className="btn">
                {dict.home.seeWork} <span aria-hidden="true">→</span>
              </Link>
              <Link href={localePath(locale, "/cv")} className="btn btn-ghost">
                {dict.home.getCv}
              </Link>
            </div>
          </div>
          <div className="w-full max-w-[480px] md:max-w-none">
            <div className="term" translate="no">
              <div className="term-bar">
                <i />
                <i />
                <i />
                <b className="ml-1.5 truncate font-normal">{dict.portrait.title}</b>
              </div>
              <Image
                src={portrait}
                alt={dict.portrait.label}
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 520px, 100vw"
                className="block h-[min(52vh,520px)] w-full object-cover object-[center_30%] max-md:h-auto max-md:max-h-[60vh]"
              />
            </div>
          </div>
        </div>
        <NameMarquee name={site.name} />
      </section>

      {/* screen 2: project terminals with CovertGift's live API log */}
      <section id="work" className="scroll-mt-4 border-t border-line py-12 md:py-24">
        <div className="wrap">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHead label={dict.pages.work.label} title={dict.pages.work.title} as="h2" />
            <div className="mb-9 grid w-full min-w-0 gap-3 md:w-auto md:justify-items-end">
              {activity && <ActivityHeatmap activity={activity} label={dict.home.activity.replace("{n}", String(activity.total))} />}
              <a href={site.links.github} className="inline-flex min-h-11 items-center text-muted transition-colors hover:text-ink">
                {dict.home.allRepos}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <ProjectCard
              href={localePath(locale, "/work/covertgift")}
              bar="covertgift · api.log"
              name={covertgift.name}
              summary={covertgift.summary[locale]}
              stack={covertgift.stack}
            >
              <ApiLog />
            </ProjectCard>
            <ProjectCard
              href={localePath(locale, "/work/alterf1")}
              bar="alterf1"
              name={alterf1.name}
              badge={dict.home.wip}
              summary={alterf1.summary[locale]}
              stack={alterf1.stack}
            >
              <TypedTerminal
                script={[
                  { cmd: "alterf1 --season 2024 --points 1991" },
                  { out: "loading points system 1991…", muted: true },
                  { out: "[wip] standings coming back soon", muted: true },
                ]}
              />
            </ProjectCard>
          </div>
        </div>
      </section>

      {/* screens 3–5: the page keeps going as you scroll */}
      <AboutSection dict={dict} locale={locale} id="about" as="h2" />
      <CvSection dict={dict} locale={locale} id="cv" as="h2" />
      <ContactSection dict={dict} locale={locale} id="contact" as="h2" />
    </>
  );
}

function ProjectCard(props: {
  href: string;
  bar: string;
  name: string;
  badge?: string;
  summary: string;
  stack: string[];
  children: React.ReactNode;
}) {
  return (
    <Link href={props.href} className="group block transition-transform duration-[250ms] ease-out-soft hover:-translate-y-0.5">
      <div translate="no" className="term h-[280px] transition-colors group-hover:border-[#3a3a40] md:h-[340px]">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <b className="ml-1.5 font-normal">{props.bar}</b>
        </div>
        {props.children}
      </div>
      <h3 className="mt-4 mb-1 flex justify-between gap-3 text-body font-medium">
        <span>
          {props.name}
          {props.badge && <span className="font-normal text-accent-ink"> · {props.badge}</span>}
        </span>
        <span aria-hidden="true" className="text-muted transition-[transform,color] duration-[250ms] group-hover:translate-x-[3px] group-hover:text-accent-ink">
          →
        </span>
      </h3>
      <p className="m-0 text-card text-muted">{props.summary}</p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {props.stack.map((s) => (
          <BrandLabel key={s} label={s} className="border border-line px-2 py-0.5 text-[12px] text-muted" />
        ))}
      </div>
    </Link>
  );
}
