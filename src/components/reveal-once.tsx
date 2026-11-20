"use client";

import { useEffect, useRef } from "react";

/**
 * Marks its child for a one-time entrance the first time it scrolls into view: data-reveal goes
 * "wait" → "in". Server HTML has no attribute, so without JS (or when it is already on screen at
 * hydration) the content simply shows. The attribute is written straight to the DOM (React never
 * renders it), and the entrance itself lives in CSS.
 */
export function RevealOnce({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // already seen: no entrance
    el.dataset.reveal = "wait"; // off screen, so hiding it now is invisible
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.dataset.reveal = "in";
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
