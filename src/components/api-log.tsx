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
  const focus = useRef(false);
  const box = useRef<HTMLPreElement>(null);

  // the log also holds still while its card link has keyboard focus (DESIGN.md §5)
  useEffect(() => {
    const card = box.current?.closest("a");
    if (!card) return;
    const hold = () => (focus.current = true);
    const release = () => (focus.current = false);
    card.addEventListener("focusin", hold);
    card.addEventListener("focusout", release);
    return () => {
      card.removeEventListener("focusin", hold);
      card.removeEventListener("focusout", release);
    };
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      if (!hover.current && !focus.current) setCount((c) => c + 1);
    }, 1500);
    return () => window.clearInterval(id);
  }, [reduced, paused]);

  const total = reduced ? EVENTS.length : count;
  const lines = Array.from({ length: Math.min(total, MAX) }, (_, k) => total - Math.min(total, MAX) + k);

  // Like a real terminal, lines are anchored to the bottom from the first one: every new line pushes
  // the rest up by exactly one line, so filling up and scrolling look the same (no jump when full).
  // The push is a 0.3s transform on the stack (compositor only); the new line still wipes in.
  const stack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stack.current;
    const last = el?.lastElementChild as HTMLElement | null;
    if (!el || !last || reduced || count <= 2) return;
    el.animate([{ transform: `translateY(${last.offsetHeight}px)` }, { transform: "translateY(0)" }], {
      duration: 300,
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", // --ease-out-soft
    });
  }, [count, reduced]);

  return (
    <pre
      ref={box}
      className="m-0 flex h-[calc(100%-37px)] flex-col justify-end overflow-hidden px-4 pt-3.5 pb-4 font-mono text-[10px] leading-[1.6] whitespace-pre md:text-[12.5px]"
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      aria-hidden="true"
    >
      <div ref={stack}>
        {lines.map((n) => {
          const [m, path, who, code] = EVENTS[n % EVENTS.length];
          const denied = code === "403";
          return (
            <span key={n} className="block h-[1.6em] animate-[log-in_.35s_var(--ease-out-soft)]">
              <span className="text-term-muted">{m}</span> {path.padEnd(17)}
              <span className="text-term-muted">{who.padEnd(18)}</span>
              <span className={denied ? "text-err" : "text-ok"}>{code}</span>
              {/* the emoji's own font is taller than the mono line: it must not stretch the row */}
              {denied && (
                <span className="text-term-muted">
                  {" "}
                  <span className="inline-block h-[1em] leading-none">🎁</span> protected
                </span>
              )}
            </span>
          );
        })}
      </div>
    </pre>
  );
}
