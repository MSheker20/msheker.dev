"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion, useReducedMotion } from "./motion";

export type Line = { cmd: string } | { out: string; muted?: boolean };

/**
 * Types commands and prints their output (38 ms a key + jitter, 380 ms between lines,
 * 2.6 s before the loop restarts). Starts when it scrolls into view; pauses with [p].
 */
export function TypedTerminal({ script, loop = true }: { script: Line[]; loop?: boolean }) {
  const reduced = useReducedMotion();
  const { paused } = useMotion();
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  const box = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<{ done: number; typed: string }>({ done: 0, typed: "" });

  useEffect(() => {
    const el = box.current;
    if (!el || reduced) return;
    let timer = 0;
    let started = false;
    const wait = (ms: number, fn: () => void) => {
      const go = () => (pausedRef.current ? (timer = window.setTimeout(go, 400)) : fn());
      timer = window.setTimeout(go, ms);
    };
    const run = (i: number) => {
      if (i >= script.length) {
        setState({ done: script.length, typed: "" });
        if (loop) wait(2600, () => run(0));
        return;
      }
      const line = script[i];
      if (!("cmd" in line)) {
        setState({ done: i + 1, typed: "" });
        wait(90, () => run(i + 1));
        return;
      }
      let c = 0;
      const key = () => {
        setState({ done: i, typed: line.cmd.slice(0, c) });
        if (c++ < line.cmd.length) wait(38 + Math.random() * 30, key);
        else wait(380, () => run(i + 1));
      };
      key();
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        wait(300, () => run(0));
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [script, loop, reduced]);

  const done = reduced ? script.length : state.done;
  const typing = !reduced && done < script.length && "cmd" in script[done];
  return (
    <pre ref={box} className="m-0 h-[calc(100%-37px)] overflow-hidden px-4 pt-3.5 pb-4 font-mono whitespace-pre-wrap">
      {script.slice(0, done).map((l, i) =>
        "cmd" in l ? (
          <span key={i} className="block">
            <span className="text-term-accent">$</span> {l.cmd}
          </span>
        ) : (
          <span key={i} className={`block ${l.muted ? "text-term-muted" : ""}`}>
            {l.out}
          </span>
        ),
      )}
      <span className="block">
        <span className="text-term-accent">$</span> {typing ? state.typed : ""}
        <span className="inline-block h-[1.1em] w-[0.6em] animate-[blink_1.1s_steps(1)_infinite] bg-term-ink align-[-0.2em]" />
      </span>
    </pre>
  );
}
