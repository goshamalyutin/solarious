import { cn } from "@/lib/utils";

interface IconBadgeProps {
  /** Filename (no extension) under /public/assets/icons. */
  name: string;
  /** Visual size of the tinted circle. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Unified icon treatment: a single line-style glyph, orange-tinted, centred in
 * a soft orange circle. One badge for every row in the Ecosystem, every card in
 * Security and the Solar Miner specs — same stroke weight, same box, same accent
 * (brief §2.9 / §2.10).
 *
 * The source SVGs are monochrome (`stroke=currentColor`), so we recolour them by
 * using the file as a CSS mask over an orange fill. This keeps one icon library
 * (the existing /assets/icons set) and guarantees identical stroke width and box
 * size across sections — no per-file colour baked in.
 */
export function IconBadge({ name, size = "md", className }: IconBadgeProps) {
  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const glyph = size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5";

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full",
        box,
        className,
      )}
      style={{
        background: "color-mix(in srgb, var(--orange) 12%, transparent)",
      }}
    >
      <span
        aria-hidden
        className={cn("bg-orange", glyph)}
        style={{
          WebkitMaskImage: `url(/assets/icons/${name}.svg)`,
          maskImage: `url(/assets/icons/${name}.svg)`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </span>
  );
}
