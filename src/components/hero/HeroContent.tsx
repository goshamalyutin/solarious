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
 * HeroContent — the foreground shared by both hero treatments
 * (HeroCss / HeroPrismatic). Keeping it identical is what makes the
 * background comparison fair. No background layers live here.
 */
export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-10 text-center sm:px-8 md:pb-14">
      <HeroHeadline />

      <p className="reveal reveal-2 mt-7 max-w-xl text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-muted">
        Solarius connects measured solar output with network verification,
        wallet access and SREC / REC settlement rails.
      </p>

      <div className="reveal reveal-3 mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <a href="#whitelist" className="btn btn-primary btn-lg">
          Join the Whitelist
          <ArrowRight />
        </a>
        <a href="#proof" className="inline-block">
          <GlassButton size="lg" className="text-ink">
            Explore Proof-of-Energy
          </GlassButton>
        </a>
      </div>

      <ul className="reveal reveal-4 mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
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
  );
}
