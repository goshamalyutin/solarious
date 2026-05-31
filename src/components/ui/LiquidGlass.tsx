"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * LiquidGlass — a real refractive glass surface for the warm-pearl theme.
 *
 * Brief 3 / 6 / 7.10 require "glassmorphism cards using a real SVG displacement
 * filter (liquid glass), placed over soft warm glow blobs so the glass actually
 * refracts something." This does exactly that:
 *
 *   feTurbulence (fractal noise) -> feGaussianBlur -> feDisplacementMap
 *
 * applied to the backdrop, so the glow/content behind the card is genuinely
 * warped at the edges like thick glass. Scale is kept LOW (~24) because a light
 * pearl background shows distortion far more readily than a dark photo; the
 * Apple-dock demos use scale 120-200, which looks cartoonish here.
 *
 * Cross-browser: Chromium honors `backdrop-filter: url(#id)`. Safari ignores
 * url() in backdrop-filter, so it falls back to the blur + warm inset highlight
 * stack alone, which still reads as premium frosted glass (no broken state).
 *
 * The warm inset highlights (top-left light catch, bottom-right shadow) replace
 * the cheap 1px white border that makes most glassmorphism look fake.
 */

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Refraction strength. 0 = frosted only, ~24 = gentle (default), ~60 = heavy. */
  displace?: number;
  /** Backdrop blur in px. */
  blur?: number;
  /** Corner radius token. */
  radius?: "md" | "lg" | "xl";
  /** Tint of the glass film. Default is a faint warm white. */
  tint?: string;
}

const RADII: Record<NonNullable<LiquidGlassProps["radius"]>, string> = {
  md: "rounded-[var(--r-md)]",
  lg: "rounded-[var(--r-lg)]",
  xl: "rounded-[28px]",
};

export function LiquidGlass({
  children,
  className,
  displace = 24,
  blur = 6,
  radius = "lg",
  tint = "rgba(255, 252, 247, 0.55)",
  style,
  ...props
}: LiquidGlassProps) {
  const raw = useId();
  const id = `lg-${raw.replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "lg-surface relative isolate overflow-hidden",
        RADII[radius],
        className,
      )}
      style={
        {
          "--lg-blur": `${blur}px`,
          "--lg-tint": tint,
          backdropFilter: `blur(var(--lg-blur)) url(#${id}) saturate(135%)`,
          WebkitBackdropFilter: `blur(var(--lg-blur)) saturate(135%)`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* Per-instance displacement filter. Hidden; referenced by backdrop-filter. */}
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <filter
          id={id}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.012"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2.4" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale={displace}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Warm glass film */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]"
        style={{ background: "var(--lg-tint)" }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
