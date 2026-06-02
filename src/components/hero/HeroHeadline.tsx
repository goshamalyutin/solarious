"use client";

import { Fragment } from "react";
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
 *
 * Inter-word spacing is rendered as a sibling text node between the inline-block
 * word spans. A trailing space *inside* an inline-block collapses (that broke
 * "for verified renewable" -> "forverifiedrenewable"), and an &nbsp; would stop
 * the line wrapping on mobile. A sibling " " renders reliably and still wraps.
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

  const renderLine = (words: string[], accent?: string) => (
    <span className="block">
      {words.map((w, i) => (
        <Fragment key={w}>
          <motion.span
            variants={word}
            className={`inline-block${w === accent ? " orange-word" : ""}`}
            style={{ willChange: "transform, filter, opacity" }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-2 font-semibold leading-[1.04] text-[clamp(34px,5vw,60px)]"
      style={{ letterSpacing: "var(--display-track)" }}
    >
      {renderLine(LINE_ONE, "Proof-of-Energy")}
      {renderLine(LINE_TWO)}
    </motion.h1>
  );
}
