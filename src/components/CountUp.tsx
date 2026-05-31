"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Target numeric value, e.g. 1, 200, 1.8, 100. */
  value: number;
  /** Decimal places to display. */
  decimals?: number;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up to `value` when scrolled into view, once. Respects
 * prefers-reduced-motion by jumping straight to the final value.
 */
export function CountUp({
  value,
  decimals = 0,
  durationMs = 1100,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          // ease-out-quint for a natural settle
          const eased = 1 - Math.pow(1 - t, 5);
          setDisplay(value * eased);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}
