import { HeroContent } from "@/components/hero/HeroContent";

/**
 * Hero light source — CSS only.
 *
 * The WebGL PrismaticBurst shader was removed: it glitched on the first frame
 * during load, so the hero now renders a stable, instant background built from
 * two CSS layers only:
 *   .hl-base — the warm pearl gradient wash
 *   .hl-halo — the soft "sun" glow
 *
 * The animated .hl-aurora layer is intentionally NOT rendered — we want the
 * calmest possible background with no motion on load.
 */
export function HeroPrismatic() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[88px] md:pt-[120px]"
      aria-label="Solarious hero"
    >
      <div className="hl-stage -z-20" aria-hidden>
        <div className="hl-base" />
        <div className="hl-halo" />
      </div>

      <HeroContent />
    </section>
  );
}
