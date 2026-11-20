"use client";

import { useEffect, useState } from "react";
import { portrait } from "@/content/portrait";
import { useReducedMotion } from "./motion";

const rows = portrait.split("\n");

/** Prints the ASCII portrait row by row, like `cat` (22 ms a row after 350 ms). */
export function AsciiPortrait({ label, title }: { label: string; title: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let timer = window.setTimeout(function tick() {
      i += 1;
      setShown(i);
      if (i < rows.length) timer = window.setTimeout(tick, 22);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const visible = reduced ? rows.length : shown;
  return (
    <div className="term w-full" role="img" aria-label={label}>
      <div className="term-bar">
        <i />
        <i />
        <i />
        <b className="ml-1.5 truncate font-normal">{title}</b>
      </div>
      <pre className="m-0 overflow-hidden px-3 pt-2.5 pb-3 text-center font-mono text-[clamp(4.6px,1.45vw,9.6px)] leading-[1.12] whitespace-pre text-term-art md:text-[clamp(5px,0.7vw,10.5px)]">
        <span className="inline-block text-left">
          {rows.map((r, i) => (
            <span key={i} className={`block transition-opacity duration-300 ${i < visible ? "opacity-100" : "opacity-0"}`}>
              {r || " "}
            </span>
          ))}
        </span>
      </pre>
    </div>
  );
}
