"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { getHeroReelUrl, getHeroReelPosterUrl } from "@/lib/assets";

/**
 * VideoShowcase — the prologue reel ([00]) that emerges from the hero light.
 *
 * Not a card: a full-bleed cinematic band whose top edge is feathered into the
 * pearl with a mask, so the footage rises out of the hero rather than sitting
 * on top of it in a dark box. A LayerZero-style film-slate row underneath
 * carries the index marker, caption, and minimal mono controls — no glass, no
 * drop shadow, single orange accent reserved for the live-sound state.
 *
 * Plays muted/looped on autoplay (the only unprompted playback browsers allow)
 * and is gated on visibility so the decode loop idles off-screen. Honors
 * prefers-reduced-motion: no entrance transform, no autoplay, native controls.
 * Source URL comes from the env-driven asset helper (local /public → R2).
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function VideoShowcase() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const [shown, setShown] = useState(false);
  // Lazy init (not effect setState) so this stays out of the render cascade.
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return; // reduced motion: no autoplay, no reveal

    // One observer: reveal once, then play/pause as it enters and leaves view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
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
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleMute = () => {
    const video = ref.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) video.play().catch(() => {});
  };

  return (
    <section
      className="relative w-full bg-pearl pt-[clamp(40px,6vh,84px)] pb-[clamp(28px,4vh,56px)]"
      aria-label="Solarious in motion"
    >
      {/* Full-bleed cinematic band. Top feathered into the pearl so the footage
          emerges from the hero light instead of sitting in a box. */}
      <figure className="relative m-0 w-full overflow-hidden">
        <video
          ref={ref}
          suppressHydrationWarning
          className="block aspect-video max-h-[88svh] w-full object-cover"
          style={{
            // Float in the pearl: top emerges from the light, bottom dissolves
            // back into it. Gentle ~6% feathers so scene captions stay intact.
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            opacity: reduced || shown ? 1 : 0,
            transform: reduced || shown ? "scale(1)" : "scale(1.045)",
            transition: reduced
              ? undefined
              : "opacity 900ms ease, transform 1200ms cubic-bezier(0.16,1,0.3,1)",
          }}
          src={getHeroReelUrl()}
          poster={getHeroReelPosterUrl()}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          controls={reduced}
          aria-label="Solarious product reel"
        />
      </figure>

      {/* Film slate: index + caption left, mono controls right. Grid-aligned to
          the page even though the footage above breaks full-bleed. */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <Reveal>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--hairline)] pt-6">
            {/* Quiet film-slate metadata line — neutral on purpose so it does
                not compete with the Trust Strip's orange kicker below. */}
            <div className="flex items-center gap-3.5 text-ink-faint">
              <span className="mono text-[11px] tabular-nums tracking-[0.2em]">
                [00]
              </span>
              <span
                aria-hidden
                className="inline-block h-px w-4"
                style={{ background: "currentColor", opacity: 0.5 }}
              />
              <span className="mono text-[11px] uppercase tracking-[0.18em]">
                The network, in motion
              </span>
            </div>

            {!reduced && (
              <div className="flex items-center gap-6">
                <SlateButton
                  onClick={togglePlay}
                  label={paused ? "Play" : "Pause"}
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                </SlateButton>
                <span aria-hidden className="h-3 w-px bg-[var(--hairline)]" />
                <SlateButton
                  onClick={toggleMute}
                  label={muted ? "Sound off" : "Sound on"}
                  active={!muted}
                >
                  {muted ? <MutedIcon /> : <SoundIcon />}
                </SlateButton>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Mono text control — the slate's vocabulary, not a glass pill. The live state
   earns the page's single orange accent. */
function SlateButton({
  onClick,
  label,
  active = false,
  children,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex items-center gap-2.5 transition-colors"
    >
      {active && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-orange"
          style={{ boxShadow: "0 0 0 3px rgba(240,117,1,0.16)" }}
        />
      )}
      <span
        className={`transition-colors ${active ? "text-orange" : "text-ink-faint group-hover:text-ink"}`}
      >
        {children}
      </span>
      <span
        className={`mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
          active ? "text-ink" : "text-ink-faint group-hover:text-ink"
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
