"use client";

import { useEffect, useRef, useState } from "react";
import { getHeroReelUrl, getHeroReelPosterUrl } from "@/lib/assets";

/**
 * A self-contained 16:9 rounded video embed — the calm sibling of the home
 * page's full-bleed eclipse reel, reused on /miner ("See How It Works"). Plays
 * muted/looped on scroll-in, pauses off-screen, and honours reduced motion with
 * native controls and no autoplay.
 */
export function VideoEmbed({
  label = "Solarious product reel",
}: {
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="relative m-0 overflow-hidden rounded-[var(--r-lg)] border border-[var(--hairline)] bg-pearl-alt shadow-[var(--shadow-card)]">
      <video
        ref={ref}
        suppressHydrationWarning
        className="block aspect-video w-full object-cover"
        src={getHeroReelUrl()}
        poster={getHeroReelPosterUrl()}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label={label}
      />
    </figure>
  );
}
