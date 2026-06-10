"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero headline + subhead.
 *
 * The headline reveals as a SINGLE block — one calm fade-up, no per-word blur
 * stagger. The old word-by-word blur-up read as "still loading", so it was
 * removed in favour of a stable, unified entrance. Reduced-motion users get the
 * final state immediately (no transform, no fade).
 *
 * Hierarchy (the H1 was breaking onto 6 lines in the narrow two-column layout):
 *   H1   — two EXPLICIT block lines ("The Proof-of-Energy" / "Layer-1") so the
 *          break is controlled and "The" never orphans on its own line. The
 *          orange "Proof-of-Energy" gets `whitespace-nowrap` so the browser
 *          doesn't break it on its hyphens.
 *   sub  — "for verified renewable production." as a plain <p> (NOT an h1, so the
 *          unlayered global h1 font-size rule doesn't touch it). Normal weight in
 *          dark ink — it's the middle level of the heading block, lighter than
 *          the bold H1 but darker than the muted body that follows it.
 */
export function HeroHeadline() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: "0.4em" }}
      animate={reduce ? undefined : { opacity: 1, y: "0em" }}
      transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {/* fontSize is set inline, NOT via a `text-[clamp()]` utility: globals.css
          has an UNLAYERED `h1 { font-size: clamp(44px,5.5vw,66px) }`, and
          unlayered CSS beats Tailwind's layered utilities — so a className size
          on this <h1> is silently ignored. Inline style wins cleanly (no
          !important). Tightened to fit the narrow copy column. */}
      <h1
        className="font-semibold leading-[1.1] md:leading-[1.05]"
        style={{
          letterSpacing: "var(--display-track)",
          fontSize: "clamp(28px, 3vw, 40px)",
        }}
      >
        <span className="block">
          {/* &nbsp; not a plain space: the whitespace between this text node and
              the inline-block span collapsed to "TheProof-of-Energy". The nbsp
              renders reliably and keeps "The" glued to the word (no orphan). */}
          The&nbsp;
          <span className="orange-word whitespace-nowrap">Proof-of-Energy</span>
        </span>
        <span className="block">Layer-1</span>
      </h1>

      <p
        className="mt-4 font-normal leading-[1.3] text-ink"
        style={{ fontSize: "20px" }}
      >
        for verified renewable production.
      </p>
    </motion.div>
  );
}
