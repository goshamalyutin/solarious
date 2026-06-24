import Image from "next/image";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { ArrowRight } from "@/components/icons";
import { HeroHeadline } from "@/components/hero/HeroHeadline";

// Proof chips replace the old fixed-supply / node-count stat strip (brief §2.2):
// positioning vocabulary only, no banned numbers or hardware part names.
const PROOF_CHIPS = [
  "Proof-of-Energy",
  "Solar Miner measurement",
  "Validator verification",
  "SREC / REC pathway",
];

/**
 * HeroContent — the hero foreground.
 *
 * Two-column on desktop: copy (headline, subcopy, CTAs, proof chips) on the
 * left, the glass globe on the right. On mobile it collapses to one column with
 * the globe FIRST (top), copy below, everything centered. At md+ the copy is
 * left-aligned and the globe moves to the right.
 *
 * No background layers live here; HeroPrismatic owns the light behind it.
 */
export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 px-6 pb-10 text-center sm:px-8 md:grid-cols-2 md:pb-14 md:text-left lg:gap-16">
      {/* Copy column — left on desktop, second on mobile. */}
      <div className="order-2 flex flex-col items-center md:order-1 md:items-start">
        <HeroHeadline />

        <p className="reveal reveal-2 mt-8 max-w-md text-[16px] leading-[1.65] text-ink-muted md:mt-16">
          Solarious transforms measured solar output into verifiable digital
          assets, connecting energy producers to wallets, validators, and SREC /
          REC markets.
        </p>

        <div className="reveal reveal-3 mt-8 flex flex-col items-center gap-3 sm:flex-row md:mt-14">
          <a href="#whitelist" className="inline-block">
            <GlassButton
              size="lg"
              glassColor="rgba(240,117,1,0.55)"
              className="h-14 whitespace-nowrap text-ink ring-1 ring-[var(--orange)] shadow-[0_0_16px_rgba(240,117,1,0.35)]"
              contentClassName="whitespace-nowrap"
            >
              Join the Whitelist
              <ArrowRight />
            </GlassButton>
          </a>
          <a href="#proof" className="inline-block">
            <GlassButton
              size="lg"
              className="h-14 whitespace-nowrap text-ink"
              contentClassName="whitespace-nowrap"
            >
              Explore Proof-of-Energy
            </GlassButton>
          </a>
        </div>

        <ul className="reveal reveal-4 mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 md:mt-10 md:justify-start">
          {PROOF_CHIPS.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white/45 px-3.5 py-2 text-[12.5px] text-ink-muted backdrop-blur-sm"
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange/70"
              />
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* Hero coin column — right on desktop, first (top) on mobile. The white
          background was flood-filled to transparency (public/assets/hero-coin.png),
          so it sits directly on the cream hero background with no card/frame:
          contained in the same square slot, centered, never clipped. Behind it,
          a soft orange glow + faint network arcs read the object as a connected
          network node (aria-hidden, low opacity, no hard edge). */}
      <div className="relative order-1 flex items-center justify-center md:order-2 md:h-full">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
        >
          {/* Soft radial orange glow that blends into the cream — no hard edge.
              The decorative network arcs / spark dots were removed. */}
          <div
            className="absolute aspect-square w-[82%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0.07) 40%, rgba(240,117,1,0) 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>
        <Image
          src="/assets/hero-coin-v2.png"
          width={769}
          height={974}
          alt="Solarious solar disc with lifting coins, bearing the sunburst emblem"
          priority
          className="pointer-events-none relative z-[1] mx-auto aspect-square h-auto w-full max-w-[380px] select-none object-contain sm:max-w-[430px] md:max-w-[595px] lg:max-w-[700px]"
        />
      </div>
    </div>
  );
}
