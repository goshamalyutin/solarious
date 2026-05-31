import { HeroContent } from "@/components/hero/HeroContent";

/**
 * HeroCss — pure-CSS warm sun-glow, no WebGL, no JS.
 *
 * Brief 7.2 verbatim: "No 3D object here ... the light and the hook carry the
 * screen." The grandeur is base.org-style restraint: ONE large, soft, low-
 * saturation dawn glow seated above the headline, on clean pearl, with huge
 * negative space. No streaky rays, no spotlight. The single .hl-halo is the
 * only persistent motion. Zero deps, best LCP, renders correctly with JS off.
 */
export function HeroCss() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[120px]"
      aria-label="Solarious hero"
    >
      <div className="hl-stage -z-10" aria-hidden>
        <div className="hl-base" />
        <div className="hl-halo" />
        <div className="hl-grain" />
      </div>

      <HeroContent />
    </section>
  );
}
