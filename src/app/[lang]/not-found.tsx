import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const dict = await getDictionary();
  const locale = await getLocale();
  return (
    <section className="wrap flex flex-1 flex-col justify-center gap-6 py-[10vh]">
      <div className="term max-w-[560px]" aria-hidden="true">
        <div className="term-bar">
          <i />
          <i />
          <i />
        </div>
        <pre className="m-0 px-4 pt-3.5 pb-4 font-mono">
          <span className="text-term-accent">$</span> curl -i msheker.dev{"\n"}
          <span className="text-err">HTTP/1.1 404 Not Found</span>
        </pre>
      </div>
      <h1 className="m-0 text-section font-normal">{dict.notFound.title}</h1>
      <div>
        <Link className="btn" href={localePath(locale)}>
          {dict.notFound.back} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
