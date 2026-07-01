import {
  getHeroCertificateUrl,
  getHeroCoinUrl,
  getHeroDiscUrl,
  getHeroPanelUrl,
} from "@/lib/assets";

/**
 * HeroScene — the composed product scene in the RIGHT column of the hero.
 *
 * Centered, symmetrical hierarchy:
 *   • CENTER / FRONT / LARGE — the glass disc + lifting coins (hero-coin-v2),
 *     the clear hero object.
 *   • LEFT / BEHIND / SMALLER — the solar panel, tilted, peeking from behind
 *     the disc's left edge.
 *   • RIGHT / BEHIND / SMALLER — the certificate, mirrored to the panel: same
 *     size, opposite tilt, peeking from behind the disc's right edge.
 *   • Small coins (coin.png) scaled down, scattered symmetrically at varied
 *     depth with a gentle staggered float.
 *   • A pearl glass podium ellipse + a low-opacity warm glow behind the disc.
 *
 * Everything is positioned as a percentage of a square stage, so the whole
 * scene scales cleanly from a ~400px mobile block up to ~600px on desktop.
 */

const COIN = getHeroCoinUrl();

type SmallCoin = {
  /** width of the coin image box, as % of the stage */
  w: number;
  left: number;
  top?: number;
  bottom?: number;
  rot: number;
  op: number;
  z: number;
  /** float duration (s) + delay (s) — staggered per coin */
  dur: number;
  delay: number;
};

// Balanced, roughly mirrored ring of small coins — subtle (never blown out),
// some far/behind (low z + low opacity), some near the base and front.
const SMALL_COINS: SmallCoin[] = [
  { w: 18, left: 5, top: 7, rot: -16, op: 0.7, z: 5, dur: 7, delay: 0 },
  { w: 18, left: 77, top: 7, rot: 16, op: 0.7, z: 5, dur: 7.5, delay: 1.0 },
  { w: 14, left: 43, top: -1, rot: 8, op: 0.5, z: 1, dur: 9, delay: 0.5 },
  { w: 16, left: -2, bottom: 13, rot: 10, op: 0.62, z: 5, dur: 8, delay: 0.8 },
  { w: 16, left: 86, bottom: 13, rot: -10, op: 0.62, z: 5, dur: 8, delay: 0.3 },
  { w: 20, left: 47, bottom: -1, rot: -14, op: 0.78, z: 5, dur: 8.5, delay: 0.6 },
  { w: 12, left: 28, top: 21, rot: 24, op: 0.5, z: 1, dur: 8, delay: 1.4 },
  { w: 12, left: 60, top: 22, rot: -20, op: 0.5, z: 1, dur: 7, delay: 1.7 },
];

export function HeroScene() {
  return (
    <div className="pointer-events-none relative mx-auto w-full max-w-[400px] select-none sm:max-w-[460px] md:max-w-[560px] lg:max-w-[600px]">
      <div className="relative aspect-square">
        {/* Warm radial glow behind the disc — low opacity, fades into cream. */}
        <div
          aria-hidden
          className="absolute left-[12%] right-[12%] top-[8%] bottom-[8%]"
          style={{
            zIndex: 0,
            background:
              "radial-gradient(closest-side at 50% 50%, rgba(240,117,1,0.14) 0%, rgba(240,117,1,0.06) 46%, rgba(240,117,1,0) 72%)",
            filter: "blur(8px)",
          }}
        />

        {/* Contact shadow — grounds the podium. */}
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] bottom-[3%] h-[8%]"
          style={{
            zIndex: 0,
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(26,26,26,0.16) 0%, rgba(26,26,26,0) 72%)",
            filter: "blur(8px)",
          }}
        />

        {/* Glass podium ellipse — pearl-toned. */}
        <div
          aria-hidden
          className="absolute left-[13%] right-[13%] bottom-[5%] h-[14%] rounded-[50%]"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(58% 62% at 50% 38%, rgba(255,255,255,0.9) 0%, rgba(255,247,239,0.5) 55%, rgba(255,255,255,0) 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -6px 14px rgba(240,117,1,0.05)",
            border: "1px solid rgba(255,255,255,0.55)",
          }}
        />

        {/* Panel — left, behind, smaller, tilted; disc overlaps its inner edge. */}
        <img
          src={getHeroPanelUrl()}
          alt="Solar panel — measured renewable production."
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute h-auto"
          style={{
            zIndex: 2,
            width: "41%",
            left: "-7%",
            bottom: "22%",
            transform: "rotate(-8deg)",
          }}
        />

        {/* Certificate — right, behind, mirrored to the panel; fully readable. */}
        <img
          src={getHeroCertificateUrl()}
          alt="Renewable Energy Certificate — verified on-chain."
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute h-auto"
          style={{
            zIndex: 2,
            width: "41%",
            left: "66%",
            bottom: "20%",
            transform: "rotate(8deg)",
          }}
        />

        {/* Center hero — glass disc + lifting coins. Largest, centered, front.
            A mild brightness/contrast trim keeps the baked glow from reading as
            overexposed against the cream. */}
        <img
          src={getHeroDiscUrl()}
          alt="Solarious glass solar disc with SOLAR coins lifting off."
          width={769}
          height={974}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute h-auto"
          style={{
            zIndex: 4,
            width: "60%",
            left: "20%",
            bottom: "7%",
            filter: "brightness(0.97) contrast(1.04) saturate(1.03)",
          }}
        />

        {/* Small coins — scaled down, symmetric scatter, subtle, floating. */}
        {SMALL_COINS.map((c, i) => (
          <span
            key={i}
            aria-hidden
            className="hero-coin-float absolute"
            style={
              {
                zIndex: c.z,
                width: `${c.w}%`,
                left: `${c.left}%`,
                ...(c.top !== undefined ? { top: `${c.top}%` } : {}),
                ...(c.bottom !== undefined ? { bottom: `${c.bottom}%` } : {}),
                "--float-dur": `${c.dur}s`,
                "--float-delay": `${c.delay}s`,
              } as React.CSSProperties
            }
          >
            <img
              src={COIN}
              alt=""
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-auto w-full"
              style={{
                opacity: c.op,
                transform: `rotate(${c.rot}deg)`,
                filter: "brightness(0.96)",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
