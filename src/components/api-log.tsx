"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion, useReducedMotion } from "./motion";

// CovertGift's Anti-Spoiler rule as a live log: members get 2xx, the recipient gets 403.
const EVENTS = [
  ["GET ", "/groups/42", "ayşe (member)", "200"],
  ["POST", "/groups/42/ideas", "can (member)", "201"],
  ["GET ", "/groups/42", "deniz (recipient)", "403"],
  ["POST", "/ideas/7/vote", "ayşe (member)", "200"],
  ["GET ", "/ideas/7", "deniz (recipient)", "403"],
] as const;
const MAX = 13;

export function ApiLog() {
  const { paused } = useMotion();
  const reduced = useReducedMotion();
  const [count, setCount] = useState(2);
  const hover = useRef(false);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      if (!hover.current) setCount((c) => c + 1);
    }, 1500);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  const total = reduced ? EVENTS.length : count;
  const lines = Array.from({ length: Math.min(total, MAX) }, (_, k) => total - Math.min(total, MAX) + k);

  return (
    <pre
      className="m-0 h-[calc(100%-37px)] overflow-hidden px-4 pt-3.5 pb-4 font-mono text-[10px] whitespace-pre md:text-[12.5px]"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      aria-hidden="true"
    >
      {lines.map((n) => {
        const [m, path, who, code] = EVENTS[n % EVENTS.length];
        const denied = code === "403";
        return (
          <span key={n} className="block animate-[enter_.35s_var(--ease-out-soft)]">
            <span className="text-term-muted">{m}</span> {path.padEnd(17)}
            <span className="text-term-muted">{who.padEnd(18)}</span>
            <span className={denied ? "text-err" : "text-ok"}>{code}</span>
            {denied && <span className="text-term-muted"> 🎁 protected</span>}
          </span>
        );
      })}
    </pre>
  );
}
