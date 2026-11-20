"use client";

import { useEffect, useRef } from "react";
import { useMotion, useReducedMotion } from "./motion";

/**
 * Giant name strip (design/hero v2). 70 px/s; turns with the scroll direction and
 * speeds up to 7x while scrolling, settling back (x0.92 a frame). Pauses with [p].
 */
export function NameMarquee({ name }: { name: string }) {
  const track = useRef<HTMLDivElement>(null);
  const { paused } = useMotion();
  const reduced = useReducedMotion();
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    let x = 0, dir = -1, boost = 0, lastY = window.scrollY, last = performance.now(), raf = 0;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      if (dy) {
        dir = dy > 0 ? -1 : 1;
        boost = Math.min(6, boost + Math.abs(dy) / 20);
      }
    };
    const frame = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const unit = el.scrollWidth / 4;
      if (!pausedRef.current) x += dir * 70 * (1 + boost) * dt;
      boost *= 0.92;
      if (x <= -unit) x += unit;
      if (x > 0) x -= unit;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    // run the frame loop only while the strip is on screen
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className="overflow-hidden border-t border-line text-name font-medium whitespace-nowrap select-none" aria-label={name} role="img" translate="no">
      <div ref={track} className="inline-flex will-change-transform" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="pr-[0.5em]">
            {name} <span className="text-accent-ink">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
