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
 * Hierarchy:
 *   kicker — the sub-header, set as a Geist Mono `.kicker` (uppercase, orange
 *            rule). It sits ABOVE the H1 as the eyebrow line.
 *   H1     — the header in the display face (Clash Display, via the global h1
 *            rule). Exactly ONE orange word: "settlement". No em-dashes.
 *   body   — the supporting paragraph in Geist (font-sans), muted ink.
 */
export function HeroHeadline() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: "0.4em" }}
      animate={reduce ? undefined : { opacity: 1, y: "0em" }}
      transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {/* Sub-header as a Geist Mono kicker. */}
      <p className="kicker">
        The Proof-of-Energy Layer-1 for verified renewable production
      </p>

      {/* fontSize is set inline, NOT via a `text-[clamp()]` utility: globals.css
          has an UNLAYERED `h1 { font-size: clamp(44px,5.5vw,66px) }`, and
          unlayered CSS beats Tailwind's layered utilities — so a className size
          on this <h1> is silently ignored. Inline style wins cleanly (no
          !important). Tightened to fit the narrow copy column. */}
      <h1
        className="pt-4 font-semibold leading-[1.1] md:pt-0 md:leading-[1.05]"
        style={{
          letterSpacing: "var(--display-track)",
          fontSize: "clamp(28px, 3vw, 40px)",
        }}
      >
        A blockchain built to solve the renewable energy{" "}
        <span className="orange-word">settlement</span> problem.
      </h1>
    </motion.div>
  );
}
