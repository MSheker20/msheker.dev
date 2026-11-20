import Link from "next/link";
import { Fragment } from "react";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

// Phase 3 shell: the real hero (ASCII portrait, name marquee, project terminals) lands in phase 4.
export default async function Home() {
  const dict = await getDictionary();
  const locale = await getLocale();
  const strong = dict.home.statementStrong.split(" ");
  return (
    <section className="wrap grid flex-1 items-center gap-12 py-[6vh] md:grid-cols-[minmax(0,1fr)_minmax(0,520px)]">
      <div className="enter">
        <h1 className="m-0 max-w-[24ch] text-statement font-normal">
          {/* keep "Backend-leaning" and "full-stack" whole at line ends */}
          {/* the space sits outside each span, so lines can still break between words */}
          {strong.map((w, i) => (
            <Fragment key={i}>
              <span className="whitespace-nowrap">{w}</span>{" "}
            </Fragment>
          ))}
          <span className="text-muted">{dict.home.statementDim}</span>
        </h1>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href={localePath(locale, "/work")} className="btn">
            {dict.home.seeWork} <span aria-hidden="true">→</span>
          </Link>
          <Link href={localePath(locale, "/cv")} className="btn btn-ghost">
            {dict.home.getCv}
          </Link>
        </div>
      </div>
      <div className="term" aria-hidden="true">
        <div className="term-bar">
          <i />
          <i />
          <i />
          <b className="ml-1.5 font-normal">~/mustafa</b>
        </div>
        <pre className="m-0 px-4 pt-3.5 pb-4 font-mono whitespace-pre-wrap">
          <span className="text-term-accent">$</span> whoami{"\n"}
          mustafa şeker{"\n"}
          <span className="text-term-muted">{dict.status.location}</span>
        </pre>
      </div>
    </section>
  );
}
