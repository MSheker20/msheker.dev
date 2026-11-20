"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";

type Out = { text: string; tone?: "muted" | "err" | "accent" };

const PAGES = ["work", "about", "cv", "contact"];

/**
 * The 404 terminal answers back: ls lists what does exist, cd/open go there, anything else is
 * "command not found". Output stays in English, like a real shell; the page heading is localized.
 */
export function NotFoundShell({ locale, projects, label }: { locale: Locale; projects: string[]; label: string }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [log, setLog] = useState<Out[]>([]);
  const input = useRef<HTMLInputElement>(null);

  const exec = (raw: string) => {
    const line = raw.trim();
    const [cmd, arg = ""] = line.split(/\s+/, 2);
    const target = arg.replace(/^\/|\/$/g, "").replace(/^~\/?/, "");
    const out: Out[] = [{ text: `$ ${line}`, tone: "accent" }];

    if (!line) return;
    if (cmd === "ls") {
      out.push({ text: [...PAGES.map((p) => `${p}/`), ...projects].join("   ") });
    } else if (cmd === "help") {
      out.push({ text: "ls · cd <page> · open <project> · clear", tone: "muted" });
    } else if (cmd === "clear") {
      setLog([]);
      return;
    } else if ((cmd === "cd" || cmd === "open") && (target === "" || target === "~")) {
      router.push(localePath(locale));
      return;
    } else if ((cmd === "cd" || cmd === "open") && PAGES.includes(target)) {
      router.push(localePath(locale, `/#${target}`));
      return;
    } else if ((cmd === "cd" || cmd === "open") && projects.includes(target)) {
      router.push(localePath(locale, `/work/${target}`));
      return;
    } else if (cmd === "cd" || cmd === "open") {
      out.push({ text: `${cmd}: no such file or directory: ${arg}`, tone: "err" });
    } else {
      out.push({ text: `zsh: command not found: ${cmd}`, tone: "err" });
    }
    setLog((l) => [...l, ...out].slice(-12));
  };

  const tone = { muted: "text-term-muted", err: "text-err", accent: "text-term-ink" } as const;

  return (
    <div onClick={() => input.current?.focus()} className="cursor-text px-4 pb-4 font-mono">
      <div aria-live="polite">
        {log.map((o, i) => (
          <div key={i} className={`whitespace-pre-wrap ${o.tone ? tone[o.tone] : "text-term-ink"}`}>
            {o.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          exec(value);
          setValue("");
        }}
        className="flex items-center gap-2"
      >
        <span aria-hidden="true" className="text-term-accent">
          $
        </span>
        <input
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label={label}
          placeholder="help"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="none"
          className="min-h-11 w-full bg-transparent text-term-ink caret-term-accent outline-none placeholder:text-term-muted"
        />
      </form>
    </div>
  );
}
