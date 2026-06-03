/**
 * Shared shader-hero configuration.
 *
 * HeroPrismatic reads a ShaderConfig to drive PrismaticBurst. The values below
 * are the locked hero look, passed straight to <PrismaticBurst /> on the
 * landing page.
 */

export type AnimationType = "rotate" | "rotate3d";
export type RampName = "amber" | "gold" | "flare" | "ember";

export interface ShaderConfig {
  animationType: AnimationType;
  intensity: number;
  speed: number;
  distort: number;
  rayCount: number;
  /** Vertical origin shift in px. Positive pushes the burst origin upward,
   *  so rays fan down from "above" like a sun. */
  offsetY: number;
  ramp: RampName;
  /** Mask center Y in %. Lower = rays concentrate higher, leaving the
   *  headline on clean pearl. */
  maskY: number;
}

/**
 * Color ramps, built from the real brand palette tokens (brief section 4):
 *   amber  #FFB800   orange #F07501   flame #E13202
 * The official brand gradient is FFB800 -> F07501 -> E13202, allowed for
 * "gradient and glow only" — which is exactly what the hero burst is.
 *
 * The ramp is sampled left->right as the ray-march steps outward, so order =
 * core->edge. Each ramp opens on a near-white so the sun has a luminous hot
 * center. Hue then walks the exact brand tokens.
 *
 * - flare  : warm-white -> amber -> orange. THE brand-correct hero glow.
 * - amber  : tighter amber->orange, no white core (subtler, monochromatic).
 * - gold   : cooler, more yellow lift; alt mood.
 * - ember  : full brand gradient incl. flame red at the edge; richest, but
 *            flame is a second hue so use deliberately (still on-palette).
 */
// IMPORTANT: tuned for mix-blend-mode "multiply" on warm pearl. Under multiply,
// near-white stops multiply to ~pearl (invisible) and only desaturate the
// result to beige — so these ramps stay SATURATED amber->orange with no cream
// core. #FFB800 x pearl = rich gold; that is the glow we want.
export const RAMPS: Record<RampName, string[]> = {
  flare: ["#FFD24A", "#FFB800", "#F7941E", "#F07501"],
  amber: ["#FFC233", "#FAA916", "#F4881A", "#F07501"],
  gold: ["#FFDE6E", "#FFC42E", "#FBA81E", "#F0A001"],
  ember: ["#FFB800", "#F7941E", "#F07501", "#E13202"],
};

/**
 * The locked hero configuration ("Dawn"): calm, majestic, base.org-restrained —
 * a few soft beams, low intensity, slow drift, concentrated high above the
 * headline. The alternate presets and the /hero-lab tuner were removed once the
 * look was locked; recover them from git history if you ever need to re-tune.
 */
export const DEFAULT_SHADER_CONFIG: ShaderConfig = {
  animationType: "rotate3d",
  intensity: 2.4,
  speed: 0.09, // calmer: slow, gentle rotation
  distort: 0.16, // cleaner rays, a little soft bend so motion stays gentle
  rayCount: 19,
  offsetY: 90,
  ramp: "ember",
  maskY: 12,
};

/** Radial mask that keeps rays up top and fades them well before the headline,
 *  so the burst reads as a glow high in the frame, not streaks across the hero. */
export function maskFor(c: ShaderConfig): string {
  return `radial-gradient(ellipse 82% 60% at 50% ${c.maskY}%, black 0%, black 26%, transparent 66%)`;
}
