import type { CodeExcerptData } from "@/content/cases";

// Just enough Go colouring for a short excerpt: comments, strings, a few keywords. No library, no JS shipped.
const TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(func|return|if|nil)\b/g;

function highlight(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1] ? "text-term-muted" : m[2] ? "text-ok" : "text-term-accent";
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  out.push(line.slice(last));
  return out;
}

/** A verbatim excerpt with the file's own line numbers; a ⋮ row marks the lines left out. */
export function CodeExcerpt({ code, linkLabel }: { code: CodeExcerptData; linkLabel: string }) {
  return (
    <div className="term" translate="no">
      <div className="term-bar">
        <i />
        <i />
        <i />
        <b className="ml-1.5 min-w-0 truncate font-normal">{code.file}</b>
        <a href={code.url} className="ml-auto inline-flex min-h-11 shrink-0 items-center text-term-muted transition-colors hover:text-term-ink">
          {linkLabel}&nbsp;<span aria-hidden="true" className="ext-arrow">↗</span>
        </a>
      </div>
      <pre className="m-0 overflow-x-auto py-3.5 font-mono text-[12.5px] leading-[1.7] [tab-size:2]">
        <code>
          {code.segments.map((seg, s) => (
            <span key={seg.start} className="block">
              {s > 0 && (
                <span className="block pl-4 text-term-muted" aria-hidden="true">
                  ⋮
                </span>
              )}
              {seg.lines.map((line, i) => (
                <span key={i} className="flex">
                  <span aria-hidden="true" className="w-12 shrink-0 pr-4 text-right text-term-muted select-none">
                    {seg.start + i}
                  </span>
                  <span className="pr-4 whitespace-pre">{highlight(line)}</span>
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
