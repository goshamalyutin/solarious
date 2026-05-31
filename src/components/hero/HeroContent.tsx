import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { ArrowRight } from "@/components/icons";
import { HeroHeadline } from "@/components/hero/HeroHeadline";

const FACTS = [
  { l: "Supply", v: "1B fixed" },
  { l: "Consensus", v: "200 nodes" },
  { l: "Verification", v: "zk + signed" },
  { l: "Hardware", v: "DC-only" },
];

/**
 * HeroContent — the foreground shared by both hero treatments
 * (HeroCss / HeroPrismatic). Keeping it identical is what makes the
 * background comparison fair. No background layers live here.
 */
export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-24 text-center sm:px-8">
      <span className="reveal mono inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white/45 px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.22em] text-ink-faint backdrop-blur-sm">
        <span className="pulse-dot" />
        TGE · June 2026
      </span>

      <HeroHeadline />

      <p className="reveal reveal-2 mt-7 max-w-lg text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-muted">
        Solar production is measured, verified, and written on-chain. Every
        $SOLAR traces back to a real kilowatt.
      </p>

      <div className="reveal reveal-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <a href="#whitelist" className="btn btn-primary btn-lg">
          Join the Whitelist
          <ArrowRight />
        </a>
        <a href="#poe" className="inline-block">
          <GlassButton size="lg" className="text-ink">
            Read the Docs
          </GlassButton>
        </a>
      </div>

      <dl className="reveal reveal-4 mt-16 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-[12px]">
        {FACTS.map((f) => (
          <div key={f.l} className="flex items-center gap-2 text-ink-muted">
            <dt className="mono uppercase tracking-[0.18em] text-ink-faint">
              {f.l}
            </dt>
            <span className="text-ink-faint/40">·</span>
            <dd className="text-ink">{f.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
