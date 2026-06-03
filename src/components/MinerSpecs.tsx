"use client";

import { useRef, useState } from "react";
import { IconBadge } from "@/components/IconBadge";

/**
 * Solar Miner specifications (brief Part 3, §4). Desktop renders a 4-column grid
 * with no carousel; mobile renders a swipeable scroll-snap carousel with dot
 * indicators that track the scroll position. One card component feeds both.
 */

interface Spec {
  icon: string;
  title: string;
  description: string;
}

const SPECS: Spec[] = [
  {
    icon: "bolt",
    title: "Input type",
    description:
      "Input: DC 9-60V, direct solar panel connection, no inverter required",
  },
  {
    icon: "chip",
    title: "Hardware",
    description: "Secure chip: ATECC608B",
  },
  {
    icon: "key",
    title: "Key storage",
    description: "Generated inside the device, never leaves",
  },
  {
    icon: "cap-meter",
    title: "Measurements",
    description: "Voltage, current, kilowatt-hours in real time",
  },
];

function SpecCard({ spec }: { spec: Spec }) {
  return (
    <div className="flex h-full flex-col rounded-[var(--r-lg)] border border-[var(--hairline)] bg-white/50 p-6 shadow-[var(--shadow-card)]">
      <IconBadge name={spec.icon} />
      <h3 className="mt-5 text-[18px] tracking-[-0.015em]">{spec.title}</h3>
      <p className="body mt-2 text-[14.5px]">{spec.description}</p>
    </div>
  );
}

export function MinerSpecs() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(SPECS.length - 1, idx)));
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <>
      {/* Desktop: 4-column grid, no carousel. */}
      <div className="hidden gap-5 md:grid md:grid-cols-4">
        {SPECS.map((s) => (
          <SpecCard key={s.title} spec={s} />
        ))}
      </div>

      {/* Mobile: swipeable carousel + dots. */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SPECS.map((s) => (
            <div key={s.title} className="w-full shrink-0 snap-center">
              <SpecCard spec={s} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-center gap-2.5">
          {SPECS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to ${s.title}`}
              aria-current={active === i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-orange" : "w-2 bg-[var(--ink-faint)]/35"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
