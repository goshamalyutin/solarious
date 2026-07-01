/**
 * Asset helper utilities for media content.
 *
 * Mirrors the dickbutt-web pattern (its src/lib/assets.ts): an env-driven
 * public base URL so the SAME code serves assets from the local /public folder
 * in development and from a Cloudflare R2 public bucket in production. Set
 * NEXT_PUBLIC_R2_PUBLIC_URL (e.g. https://assets.solarius.io or a
 * https://pub-xxxx.r2.dev URL) to flip every asset over to R2 at once.
 *
 * Uploads are out-of-band via rclone — see scripts/upload-r2.sh.
 */

// When set, assets resolve to the R2 public bucket under the /v1 prefix;
// when empty, they resolve to local files served from /public.
const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";

/**
 * Resolve a versioned asset path to a full URL.
 * @param path Path relative to the asset root, e.g. "video/solarius-hero-reel.mp4".
 */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\/+/, "");
  return R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/v1/${clean}` : `/${clean}`;
}

/** The reel that plays in the section directly after the hero. */
export function getHeroReelUrl(): string {
  return assetUrl("video/solarius-hero-reel.mp4");
}

/** Poster frame shown before the hero reel loads / on reduced motion. */
export function getHeroReelPosterUrl(): string {
  return assetUrl("video/solarius-hero-reel-poster.jpg");
}

/** The DC Energy Device product render (transparent, optimized WebP). */
export function getDeviceImageUrl(): string {
  return assetUrl("assets/device/solarius-device.webp");
}

/* Hero product-scene layers — transparent PNGs composed in HeroScene. */

/** Glass solar disc with two coins lifting off — the center hero object. */
export function getHeroDiscUrl(): string {
  return assetUrl("assets/hero-coin-v2.png");
}

/** Solar panel render, standing at the back of the hero scene. */
export function getHeroPanelUrl(): string {
  return assetUrl("assets/hero/panel.png");
}

/** "Renewable Energy Certificate" card, standing at the right of the scene. */
export function getHeroCertificateUrl(): string {
  return assetUrl("assets/hero/certificate.png");
}

/** Glass SOLAR coin — the hero element (front) and the scattered small coins. */
export function getHeroCoinUrl(): string {
  return assetUrl("assets/hero/coin.png");
}
