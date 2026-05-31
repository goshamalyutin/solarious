"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { getHeroReelUrl, getHeroReelPosterUrl } from "@/lib/assets";

/**
 * NetworkExpand — the [00] reel, rebuilt as a scroll-scrubbed "eclipse" beat.
 *
 * Replaces the static VideoShowcase band in-place. As the reel scrolls to the
 * centre of the viewport it scales a hair (1 -> 1.04, transform only) while the
 * pearl surface BEHIND it eclipses to --midnight, the WhyQuote amber floor-glow
 * blooms as the single warm survivor, then everything eases back to pearl before
 * the next section. Light -> dark -> light, in one scroll gesture.
 *
 * The dark is a SURFACE the footage emerges from (the video keeps its own
 * top/bottom mask feather), never a scrim laid on the footage. Native scroll is
 * never touched: a tall outer section + a position:sticky inner stage means
 * scrollYProgress is driven by real scrolling, so anchor-nav, keyboard, Find,
 * and the back button all keep working.
 *
 * prefers-reduced-motion users (and the lazy resolve below avoids a hydration
 * mismatch) get the original static pearl band: no pin, no scrub, no dark flip.
 * Light-only is the resting truth; the eclipse is motion-dependent atmosphere.
 */
const REEL_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)";

export function NetworkExpand() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  // null on the server + first client render (so hydration matches the motion
  // branch), then resolves on the client; treat unresolved as "not reduced".
  const reduced = useReducedMotion() ?? false;

  // Scroll progress over the whole 200vh/150svh section. The sticky child stays
  // pinned for the entire 0->1 range (section is ~420svh tall, so the child
  // stays stuck for ~320svh of scrolling), so the full arc plays while centred.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // Transform only — never the candidate's 300->1550px width/height layout thrash.
  // Peak plateau (0.35..0.65) is wide so the reel holds its expansion across the
  // whole dark dwell instead of pulsing through it.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [1, 1.04, 1.04, 1],
  );
  // Trapezoid with a LONG hold: pearl while entering (0..0.1), ramp to full
  // midnight, HOLD dark across 0.32..0.68 so the eclipse dwells, then ramp back
  // to pearl by 0.9 (clean pearl entry + exit, no dark residue at p=1). Combined
  // with the tall section below, the full arc now spans ~3 viewports of scroll.
  const darkness = useTransform(
    scrollYProgress,
    [0.1, 0.32, 0.68, 0.9],
    [0, 1, 1, 0],
  );
  // Keep the [00] slate legible against whatever the surface is doing — it turns
  // white just before the dark hold and returns to ink as the light floods back.
  const slateColor = useTransform(
    scrollYProgress,
    [0.18, 0.32, 0.68, 0.82],
    ["#1a1a1a", "#ffffff", "#ffffff", "#1a1a1a"],
  );

  // IntersectionObserver play/pause gate. Matters MORE here: the reel lives on
  // screen for the whole pin, so idling decode off-screen is worth keeping.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);

    const sync = () => setPaused(video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    return () => {
      io.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, [reduced]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) video.play().catch(() => {});
  };

  // ── Reduced motion: the original static pearl band, light only. ──────────
  if (reduced) {
    return (
      <section
        className="relative w-full bg-pearl pt-[clamp(40px,6vh,84px)] pb-[clamp(28px,4vh,56px)]"
        aria-label="Solarius in motion"
      >
        <figure className="relative m-0 w-full overflow-hidden">
          <video
            ref={videoRef}
            suppressHydrationWarning
            className="block aspect-video max-h-[88svh] w-full object-cover"
            style={{ maskImage: REEL_MASK, WebkitMaskImage: REEL_MASK }}
            src={getHeroReelUrl()}
            poster={getHeroReelPosterUrl()}
            loop
            playsInline
            preload="metadata"
            controls
            aria-label="Solarius product reel"
          />
        </figure>
        <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
          <Slate muted={muted} paused={paused} reduced />
        </div>
      </section>
    );
  }

  // ── Full motion: the eclipse scrub. ──────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      aria-label="Solarius in motion"
      className="relative w-full min-h-[280svh] md:min-h-[420svh]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden bg-pearl">
        {/* The surface eclipses to midnight behind the footage (never a scrim
            on the footage). */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{ background: "var(--midnight)", opacity: darkness }}
        />
        {/* WhyQuote's exact amber floor-glow — the single warm survivor, alive
            only while the surface is dark. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0) 70%)",
            opacity: darkness,
          }}
        />

        {/* The reel. Its own top/bottom mask feathers it into whatever the
            surface currently is — pearl at rest, midnight at the peak — so it
            keeps "emerging from the light", now bookended by a held dark beat. */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <motion.div className="w-full" style={{ scale }}>
            <video
              ref={videoRef}
              suppressHydrationWarning
              className="block aspect-video max-h-[82svh] w-full object-cover"
              style={{ maskImage: REEL_MASK, WebkitMaskImage: REEL_MASK }}
              src={getHeroReelUrl()}
              poster={getHeroReelPosterUrl()}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              aria-label="Solarius product reel"
            />
          </motion.div>
        </div>

        {/* Film slate, overlaid at the foot of the stage. Its colour scrubs
            ink -> white -> ink so it survives the eclipse. */}
        <motion.div
          style={{ color: slateColor }}
          className="relative z-20 mx-auto w-full max-w-[1280px] px-6 pb-[clamp(20px,4vh,40px)] sm:px-8"
        >
          <Slate
            muted={muted}
            paused={paused}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Film slate row. Colour is inherited (currentColor) so it rides whatever
   the surface is doing; the hairline + separators use a mid-tone that reads on
   both pearl and midnight. The live-sound state keeps the page's one orange. */
function Slate({
  muted,
  paused,
  onTogglePlay,
  onToggleMute,
  reduced = false,
}: {
  muted: boolean;
  paused: boolean;
  onTogglePlay?: () => void;
  onToggleMute?: () => void;
  reduced?: boolean;
}) {
  return (
    <div
      className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-6"
      style={{ borderTop: "1px solid rgba(138,132,126,0.28)" }}
    >
      <div
        className="flex items-center gap-3.5"
        style={{ opacity: reduced ? 1 : 0.75 }}
      >
        <span
          className={`mono text-[11px] tabular-nums tracking-[0.2em] ${reduced ? "text-ink-faint" : ""}`}
        >
          [00]
        </span>
        <span
          aria-hidden
          className="inline-block h-px w-4"
          style={{ background: "currentColor", opacity: 0.5 }}
        />
        <span
          className={`mono text-[11px] uppercase tracking-[0.18em] ${reduced ? "text-ink-faint" : ""}`}
        >
          The network, in motion
        </span>
      </div>

      {!reduced && (
        <div className="flex items-center gap-6">
          <SlateButton onClick={onTogglePlay} label={paused ? "Play" : "Pause"}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </SlateButton>
          <span
            aria-hidden
            className="h-3 w-px"
            style={{ background: "currentColor", opacity: 0.25 }}
          />
          <SlateButton
            onClick={onToggleMute}
            label={muted ? "Sound off" : "Sound on"}
            active={!muted}
          >
            {muted ? <MutedIcon /> : <SoundIcon />}
          </SlateButton>
        </div>
      )}
    </div>
  );
}

function SlateButton({
  onClick,
  label,
  active = false,
  children,
}: {
  onClick?: () => void;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex items-center gap-2.5"
    >
      {active && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-orange"
          style={{ boxShadow: "0 0 0 3px rgba(240,117,1,0.16)" }}
        />
      )}
      <span
        className={
          active
            ? "text-orange transition-opacity"
            : "opacity-60 transition-opacity group-hover:opacity-100"
        }
      >
        {children}
      </span>
      <span
        className={`mono text-[11px] uppercase tracking-[0.18em] transition-opacity ${
          active ? "text-orange" : "opacity-60 group-hover:opacity-100"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function PlayIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 5v14l12-7L7 5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m16 9 5 6M21 9l-5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
