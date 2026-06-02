"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word blur-up entrance for the hero headline.
 *
 * Each word fades in, un-blurs, and rises, staggered ~0.09s. This is the
 * premium headline reveal used by LayerZero / Linear / Vercel, and it reads
 * far better than fading the whole block as one unit. Reduced-motion users
 * get the final state immediately (no transform, no blur).
 *
 * The headline is hard-coded as two lines so we control the line break and
 * the single orange word ("Proof-of-Energy") per the brand rule.
 */

const LINE_ONE = ["The", "Proof-of-Energy", "Layer-1"];
const LINE_TWO = ["for", "verified", "renewable", "production."];

export function HeroHeadline() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 },
    },
  };

  const word = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: "0.5em", filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-2 font-semibold leading-[1.04] text-[clamp(34px,5vw,60px)]"
      style={{ letterSpacing: "var(--display-track)" }}
    >
      <span className="block">
        {LINE_ONE.map((w) => (
          <motion.span
            key={w}
            variants={word}
            className={`inline-block ${w === "Proof-of-Energy" ? "orange-word" : ""}`}
            style={{ willChange: "transform, filter, opacity" }}
          >
            {w}
            {" "}
          </motion.span>
        ))}
      </span>
      <span className="block">
        {LINE_TWO.map((w) => (
          <motion.span
            key={w}
            variants={word}
            className="inline-block"
            style={{ willChange: "transform, filter, opacity" }}
          >
            {w}{" "}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}
