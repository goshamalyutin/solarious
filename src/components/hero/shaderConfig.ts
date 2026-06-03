/**
 * Shared shader-hero configuration.
 *
 * HeroPrismatic reads a ShaderConfig to drive PrismaticBurst. The hero-lab
 * control panel writes one live. Whatever config wins in the lab becomes the
 * argument passed to <HeroPrismatic /> on the real landing page, so tuning
 * and production never drift.
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
 * center (the old ramps started mid-orange, which read flat and muddy at high
 * intensity). Hue then walks the exact brand tokens.
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

export const RAMP_BRAND_SAFE: Record<RampName, boolean> = {
  flare: true,
  amber: true,
  gold: true,
  // ember walks all the way to flame red (#E13202) — still a brand token, but
  // a second hue, so flag it. On-palette, use deliberately.
  ember: false,
};

/**
 * Designed directions for a solar-L1 hero.
 * Dawn is the default: calm, majestic, base.org-restrained. Few soft beams,
 * low intensity, slow drift, concentrated high above the headline.
 */
export const PRESETS: Record<string, ShaderConfig> = {
  // User-tuned in the lab. Bright, lively sunburst high in the frame, on the
  // brand-correct warm-white -> amber -> orange "flare" ramp.
  Dawn: {
    animationType: "rotate3d",
    intensity: 2.4,
    speed: 0.09, // calmer: slow, gentle rotation
    distort: 0.16, // cleaner rays, a little soft bend so motion stays gentle
    rayCount: 19,
    offsetY: 90,
    ramp: "ember",
    maskY: 12,
  },
  Cathedral: {
    animationType: "rotate3d",
    intensity: 1.85,
    speed: 0.16,
    distort: 0.42,
    rayCount: 26,
    offsetY: 0,
    ramp: "amber",
    maskY: 26,
  },
  Sunrays: {
    animationType: "rotate",
    intensity: 2.1,
    speed: 0.12,
    distort: 0.28,
    rayCount: 44,
    offsetY: 220,
    ramp: "gold",
    maskY: 18,
  },
  Corona: {
    animationType: "rotate3d",
    intensity: 2.3,
    speed: 0.22,
    distort: 0.7,
    rayCount: 16,
    offsetY: 0,
    ramp: "amber",
    maskY: 30,
  },
  Ember: {
    animationType: "rotate",
    intensity: 1.6,
    speed: 0.1,
    distort: 0.5,
    rayCount: 34,
    offsetY: 120,
    ramp: "ember",
    maskY: 24,
  },
};

export const DEFAULT_SHADER_CONFIG: ShaderConfig = PRESETS.Dawn;

/** Radial mask that keeps rays up top and fades them well before the headline.
 *  Tighter than v1 (was 95% x 100%, near-full-frame) so the burst reads as a
 *  glow high in the frame, not streaks across the whole hero. */
export function maskFor(c: ShaderConfig): string {
  return `radial-gradient(ellipse 82% 60% at 50% ${c.maskY}%, black 0%, black 26%, transparent 66%)`;
}

/** Name of the preset this config matches exactly, or null if custom. */
export function matchPreset(c: ShaderConfig): string | null {
  for (const [name, p] of Object.entries(PRESETS)) {
    if (
      p.animationType === c.animationType &&
      p.intensity === c.intensity &&
      p.speed === c.speed &&
      p.distort === c.distort &&
      p.rayCount === c.rayCount &&
      p.offsetY === c.offsetY &&
      p.ramp === c.ramp &&
      p.maskY === c.maskY
    ) {
      return name;
    }
  }
  return null;
}
