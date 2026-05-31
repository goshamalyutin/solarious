import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import { HeroPrismatic } from "@/components/hero/HeroPrismatic";
import { VideoShowcase } from "@/components/VideoShowcase";
import { WhitelistForm } from "@/components/WhitelistForm";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { IndexRow } from "@/components/IndexRow";
import { CountUp } from "@/components/CountUp";
import { getDeviceImageUrl } from "@/lib/assets";

export default function Home() {
  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />
      <HeroPrismatic />
      <TrustStrip />
      <VideoShowcase />
      <About />
      <Metrics />
      <ProofOfEnergy />
      <Device />
      <Products />
      <WhyQuote />
      <Security />
      <Token />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ───────────────────────────────────────────────────── TRUST STRIP */

function TrustStrip() {
  const phrases = [
    "Proof-of-Energy",
    "200-node consensus",
    "zk verification",
    "DC-only hardware",
    "ATECC608B signing",
    "Real kilowatt-hours",
  ];
  // Duplicate the list so the -50% loop is seamless.
  const loop = [...phrases, ...phrases];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[var(--hairline)] bg-pearl-alt py-9"
      aria-label="Built on verifiable infrastructure"
    >
      <div className="mx-auto mb-7 max-w-[1280px] px-6 sm:px-8">
        <p className="kicker">Built on verifiable infrastructure</p>
      </div>
      <div className="marquee-mask">
        <div className="marquee">
          {loop.map((p, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-4 px-7 text-[clamp(15px,1.5vw,18px)] text-ink-muted"
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange/60"
              />
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── ABOUT (statement) */

function About() {
  const flow = [
    "Solar production",
    "Proof-of-Energy",
    "Validators",
    "$SOLAR economy",
    "Tokenized commodities",
  ];

  return (
    <section
      id="about"
      className="relative w-full py-[var(--section-y)]"
      aria-label="What is Solarious"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead kicker="What is Solarious" index="01">
          A Layer-1 anchored to{" "}
          <span className="orange-word">real energy.</span>
        </SectionHead>

        <Reveal delay={80}>
          <p className="mt-9 max-w-3xl text-[clamp(19px,2vw,26px)] leading-[1.45] tracking-[-0.01em] text-ink">
            Solarious is a proprietary Layer-1. Measured and validated solar
            output becomes a verifiable contribution to the network. The chain
            is tied to physical energy production, not to speculation.
          </p>
        </Reveal>

        {/* Flow chain — ruled, monospace, no boxes. */}
        <Reveal delay={160}>
          <ol className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-[var(--hairline)] pt-8">
            {flow.map((f, i) => (
              <li key={f} className="flex items-center gap-3">
                <span className="mono text-[12px] tabular-nums text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] text-ink sm:text-[15px]">{f}</span>
                {i < flow.length - 1 && (
                  <span aria-hidden className="px-1 text-orange/50">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── METRICS */

function Metrics() {
  const items = [
    {
      value: 1,
      decimals: 0,
      unit: "B",
      label: "$SOLAR fixed supply. No future issuance beyond the cap.",
    },
    {
      value: 200,
      decimals: 0,
      unit: "",
      label: "Validator nodes at consensus. 50 are Alpha Nodes, hard-capped.",
    },
    {
      value: 1.8,
      decimals: 1,
      unit: "M",
      label: "CryptoCat users moving into the ecosystem.",
    },
    {
      value: 100,
      decimals: 0,
      unit: "%",
      label: "Energy-backed issuance. Every $SOLAR maps to a kilowatt.",
    },
  ];

  return (
    <section
      id="metrics"
      className="relative w-full bg-pearl-alt py-[var(--section-y)]"
      aria-label="Network metrics"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead kicker="By the numbers" index="02">
          A network sized for{" "}
          <span className="orange-word">real production.</span>
        </SectionHead>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((m, i) => (
            <Reveal
              key={i}
              delay={i * 90}
              className="border-t border-[var(--hairline)] py-8 pr-6 sm:py-10"
            >
              <div className="flex items-baseline tracking-[-0.04em]">
                <span className="text-[clamp(52px,6vw,80px)] font-semibold leading-none text-ink">
                  <CountUp value={m.value} decimals={m.decimals} />
                </span>
                {m.unit && (
                  <span className="ml-0.5 text-[clamp(32px,3.6vw,48px)] font-semibold leading-none text-orange">
                    {m.unit}
                  </span>
                )}
              </div>
              <p className="body mt-5 max-w-[24ch] text-[14.5px]">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── PROOF OF ENERGY */

function ProofOfEnergy() {
  const steps = [
    {
      t: "Solar energy is produced.",
      d: "A solar panel generates electricity. The Solar Miner connects to the panel and measures real output in kilowatt-hours.",
    },
    {
      t: "A proof is created.",
      d: "The device signs every kilowatt-hour inside a secure chip. The key is generated on the device and never leaves it.",
    },
    {
      t: "The proof goes on-chain.",
      d: "The signed proof reaches the 200-node validator network. Validators verify it. $SOLAR is issued in proportion to real output.",
    },
  ];

  return (
    <section
      id="poe"
      className="relative w-full py-[var(--section-y)]"
      aria-label="How Proof of Energy works"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead
          kicker="Proof of Energy"
          index="03"
          lead="Three stages, no middlemen, no claims. Hardware does the measuring. The network does the verifying."
        >
          How <span className="orange-word">Proof of Energy</span> works.
        </SectionHead>

        <div className="mt-16">
          {steps.map((s, i) => (
            <Reveal
              key={s.t}
              delay={i * 90}
              className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-2 border-t border-[var(--hairline)] py-9 last:border-b sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-12"
            >
              <span className="text-[clamp(40px,5vw,64px)] font-semibold leading-none tracking-[-0.04em] text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl self-center">
                <h3 className="text-[clamp(20px,2vw,26px)] tracking-[-0.02em]">
                  {s.t}
                </h3>
                <p className="body mt-3">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── DEVICE (product spotlight) */

function Device() {
  // What it does — the verification client's job, as ruled rows.
  const functions = [
    "Measures voltage, current and energy",
    "Signs energy proofs",
    "Controls mining load",
    "Sends verified data",
  ];
  // Architecture constraints — what makes it DC-native.
  const architecture = [
    "DC-only architecture",
    "No 220V dependency",
    "No grid simulation",
  ];

  return (
    <section
      id="device"
      className="relative w-full bg-pearl-alt py-[var(--section-y)]"
      aria-label="The DC Energy Device"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-16 gap-y-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-center">
        {/* Render — transparent WebP floating on the pearl, with a single warm
            ground glow. No card, no frame. */}
        <Reveal className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[6%] bottom-[8%] top-[28%] -z-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 55%, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0) 70%)",
              filter: "blur(8px)",
            }}
          />
          <img
            src={getDeviceImageUrl()}
            alt="The Solarious DC Energy Device — a DC-only solar energy verification client."
            width={2000}
            height={1090}
            loading="lazy"
            decoding="async"
            className="relative w-full"
          />
        </Reveal>

        <div className="order-2">
          <p className="mono mb-5 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            Hardware · device-1
          </p>
          <SectionHead kicker="The device">
            Built for solar. <span className="orange-word">Not a miner.</span>
          </SectionHead>
          <Reveal delay={80}>
            <p className="lead mt-6">
              Not adapted from ASICs. It is an energy verification client.
            </p>
          </Reveal>

          {/* Architecture constraints — mono tags, hairline-separated. */}
          <Reveal delay={140}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-ink">
              {architecture.map((a, i) => (
                <li key={a} className="flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-3 w-px bg-[var(--hairline)]"
                    />
                  )}
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-orange/70"
                    />
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* What it does — ruled rows with mono indices. */}
          <ol className="mt-10">
            {functions.map((f, i) => (
              <Reveal
                key={f}
                delay={180 + i * 70}
                className="flex items-center gap-5 border-t border-[var(--hairline)] py-4 last:border-b"
              >
                <span className="mono text-[11px] tabular-nums text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-ink">{f}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── PRODUCTS (index rows) */

function Products() {
  const products = [
    {
      t: "Solar Miner",
      d: "Proprietary hardware that plugs into your panel and measures real output on-chain.",
      tag: "Hardware",
    },
    {
      t: "Validators & Alpha Nodes",
      d: "Run the software, secure the network, finalize blocks, earn $SOLAR. Alpha Nodes are hard-capped at 50.",
      tag: "Network",
    },
    {
      t: "Verdex",
      d: "The Solarious wallet and access layer. Token access, claims, staking, miner console.",
      tag: "Wallet",
    },
    {
      t: "Mining Pool",
      d: "Operational interface for performance, devices, and payouts. Built with EMCD.",
      tag: "Operations",
    },
    {
      t: "CryptoCat",
      d: "The community layer with 1.8M users moving into the ecosystem.",
      tag: "Community",
    },
    {
      t: "Tokenized RECs",
      d: "The settlement layer for renewable energy certificates and carbon markets. Built with Zoniqx.",
      tag: "Settlement",
    },
  ];

  return (
    <section
      id="products"
      className="relative w-full bg-pearl-alt py-[var(--section-y)]"
      aria-label="Solarious ecosystem"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead
          kicker="Ecosystem"
          index="04"
          lead="Hardware, validators, wallet, mining pool, community, and settlement. Every layer is a real product, shipping into one chain."
        >
          Six products. <span className="orange-word">One network.</span>
        </SectionHead>

        <div className="mt-14">
          {products.map((p, i) => (
            <Reveal key={p.t} delay={i * 60}>
              <IndexRow
                index={String(i + 1).padStart(2, "0")}
                title={p.t}
                tag={p.tag}
                description={p.d}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── WHY (dark contrast beat) */

function WhyQuote() {
  return (
    <section
      className="relative w-full overflow-hidden bg-midnight py-[clamp(120px,18vh,240px)] text-white"
      aria-label="Why energy"
    >
      {/* Feather both edges into the pearl-alt of the neighbouring sections so
          the dark beat floats instead of hard-seaming (matches the video). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
        style={{
          background:
            "linear-gradient(to bottom, var(--pearl-alt), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
        style={{
          background: "linear-gradient(to top, var(--pearl-alt), transparent)",
        }}
      />
      {/* faint amber floor glow, single light source, no second hue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <Reveal>
          <p className="kicker" style={{ color: "var(--orange)" }}>
            Why energy
          </p>
          <p className="mt-8 text-[clamp(28px,3.8vw,46px)] font-medium leading-[1.22] tracking-[-0.02em] text-white">
            Every industry that scaled got a settlement layer. The internet had
            TCP/IP. Finance had SWIFT.{" "}
            <span className="text-white/45">Energy never had one.</span>{" "}
            Solarious is that layer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── SECURITY */

function Security() {
  const items = [
    {
      t: "Hardware signing",
      d: "Proofs are signed inside a secure chip. The private key never leaves the device.",
      icon: "chip",
    },
    {
      t: "On-chain validation",
      d: "Every proof is verified by the validator network before any token is issued.",
      icon: "globe-validated",
    },
    {
      t: "Replay protection",
      d: "Lifetime counters block reuse. A proof cannot be duplicated.",
      icon: "replay-block",
    },
    {
      t: "Production caps",
      d: "Each device has realistic limits. Inflated claims are rejected by the network.",
      icon: "cap-meter",
    },
  ];

  return (
    <section
      id="security"
      className="relative w-full bg-pearl-alt py-[var(--section-y)]"
      aria-label="Security"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead
          kicker="Security"
          index="05"
          lead="You cannot fake a kilowatt. You have to produce one."
        >
          Secured by <span className="orange-word">reality.</span>
        </SectionHead>

        {/* Hairline-ruled rows, icon beside the heading. Rows over cards. */}
        <div className="mt-14 grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal
              key={it.t}
              delay={(i % 2) * 90}
              className="flex items-start gap-5 border-t border-[var(--hairline)] py-7"
            >
              <img
                src={`/assets/icons/${it.icon}.svg`}
                alt=""
                aria-hidden
                className="mt-0.5 h-6 w-6 shrink-0"
              />
              <div>
                <h3 className="text-[18px] tracking-[-0.015em]">{it.t}</h3>
                <p className="body mt-2 max-w-md text-[14.5px]">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── TOKEN (donut) */

function Token() {
  // Single-hue warm ramp: orange accent for the largest slice, darkening
  // toward ink for the smaller ones. No second accent color (the old palette
  // mixed flame red + gold + brown, which broke the one-accent rule).
  const segments = [
    { name: "Ecosystem", pct: 34.0, color: "#F07501" },
    { name: "Validator rewards", pct: 25.5, color: "#C9691E" },
    { name: "Investors", pct: 15.0, color: "#9A521F" },
    { name: "Reserves & Listing", pct: 9.0, color: "#6E3F20" },
    { name: "Producer rewards", pct: 8.5, color: "#473023" },
    { name: "Team & Advisors", pct: 8.0, color: "#2D2926" },
  ];
  const C = 2 * Math.PI * 80;
  let cumulative = 0;

  return (
    <section
      id="token"
      className="relative w-full overflow-hidden py-[var(--section-y)]"
      aria-label="Token"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead
          kicker="$SOLAR"
          index="06"
          lead="$SOLAR has a fixed supply of 1 billion. 15% is allocated at genesis with long-term vesting. 85% is issued over time through energy-based distribution. Early years are front-loaded, then a long tail supports infrastructure growth."
        >
          <span className="orange-word">Fixed supply.</span> Energy-based
          issuance.
        </SectionHead>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-[1280px] grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="grid max-w-md grid-cols-2 gap-10">
            <div>
              <div className="text-[clamp(48px,5vw,72px)] font-semibold leading-none tracking-[-0.04em] text-ink">
                15<span className="text-orange">%</span>
              </div>
              <div className="mono mt-4 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Genesis allocation
              </div>
            </div>
            <div>
              <div className="text-[clamp(48px,5vw,72px)] font-semibold leading-none tracking-[-0.04em] text-ink">
                85<span className="text-orange">%</span>
              </div>
              <div className="mono mt-4 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Energy-based issuance
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-2 text-[13px]">
            {segments.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between border-b border-[var(--hairline)] pb-2"
              >
                <span className="flex items-center gap-3 text-ink">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
                <span className="mono font-medium text-ink">
                  {s.pct.toFixed(1)}%
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(26,26,26,0.06)"
                strokeWidth="20"
              />
              {segments.map((s) => {
                const len = (s.pct / 100) * C;
                const el = (
                  <circle
                    key={s.name}
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="20"
                    strokeDasharray={`${len} ${C}`}
                    strokeDashoffset={-cumulative}
                  />
                );
                cumulative += len;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[clamp(44px,4.5vw,60px)] font-semibold leading-none tracking-[-0.04em] text-ink">
                1B
              </div>
              <div className="mono mt-3 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Total supply
              </div>
              <div className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-orange">
                $SOLAR
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── ROADMAP */

function Roadmap() {
  const phases = [
    {
      when: "Feb 2023 – Mar 2026",
      t: "Build",
      d: "Mining Pool, Solar Miner development, CryptoCat (1.8M users), L1 foundation.",
    },
    {
      when: "April 2026",
      t: "Pre-Network",
      d: "First Solar Miner installed, validator setup, L1 MVP ready.",
    },
    {
      when: "Jun – Aug 2026",
      t: "Network Bootstrap",
      d: "TGE, Alpha Node yield program, real validators, chain producing blocks, airdrop.",
      highlight: true,
    },
    {
      when: "Sep – Nov 2026",
      t: "Controlled Expansion",
      d: "More hardware, exchange listings, ICO, liquidity.",
    },
    {
      when: "Dec 2026 – Jul 2027",
      t: "Market Validation",
      d: "Stable mining economics, secondary liquidity, CryptoCat airdrop #2.",
    },
    {
      when: "Jun – Dec 2027",
      t: "Institutionalization",
      d: "Third-party builders, RWA integrations, industrial solar.",
    },
  ];

  return (
    <section
      id="roadmap"
      className="relative w-full py-[var(--section-y)]"
      aria-label="Roadmap"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <SectionHead
          kicker="Roadmap"
          index="07"
          lead="TGE in June 2026. Build first, ship hardware, then bring the network live with real validators and real energy."
        >
          Building <span className="orange-word">in phases.</span>
        </SectionHead>

        <ol className="mt-16">
          {phases.map((p, i) => (
            <Reveal
              key={p.t}
              delay={i * 70}
              className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-[var(--hairline)] py-7 last:border-b sm:grid-cols-[14rem_minmax(0,1fr)]"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: p.highlight ? "var(--orange)" : "transparent",
                    boxShadow: p.highlight
                      ? "0 0 0 4px rgba(240,117,1,0.16)"
                      : "inset 0 0 0 1.5px var(--ink-faint)",
                  }}
                />
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-orange">
                  {p.when}
                </span>
              </div>
              <div className="max-w-2xl sm:pl-0">
                <h3 className="flex items-baseline gap-3 text-[clamp(19px,1.9vw,24px)] tracking-[-0.02em]">
                  {p.t}
                  {p.highlight && (
                    <span className="mono text-[10px] uppercase tracking-[0.18em] text-orange">
                      TGE
                    </span>
                  )}
                </h3>
                <p className="body mt-2">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── FINAL CTA */

function FinalCTA() {
  // Three proof points, mono tags — the same vocabulary as the device specs.
  const proof = [
    "Real infrastructure",
    "Measured output",
    "Energy-secured consensus",
  ];

  return (
    <section
      id="whitelist"
      className="relative w-full bg-pearl-alt py-[var(--section-y)]"
      aria-label="Join the whitelist"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-x-16 gap-y-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-start">
        {/* Copy */}
        <div>
          <p className="kicker">Stay up-to-date</p>
          <h2 className="mt-5 text-balance">
            Join <span className="orange-word">early access.</span>
          </h2>
          <Reveal delay={80}>
            <p className="lead mt-6">
              Solarious is entering its next growth phase. Whitelist
              participants receive early access to hardware deployment and
              validator onboarding.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <ul className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-ink">
              {proof.map((p, i) => (
                <li key={p} className="flex items-center gap-4">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="h-3 w-px bg-[var(--hairline)]"
                    />
                  )}
                  <span className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-orange/70"
                    />
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Email capture */}
        <Reveal delay={120} className="lg:pt-2">
          <WhitelistForm />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── FOOTER */

function Footer() {
  const legal = [
    "Website Terms",
    "Protocol Terms",
    "Risk Disclosure",
    "Token Disclaimer",
    "Community Guidelines",
    "Hardware Terms",
  ];

  return (
    <footer className="relative w-full bg-midnight text-white/80">
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo
              variant="white"
              className="h-7 w-auto"
              width={160}
              height={28}
            />
            <p className="mt-6 max-w-sm text-[14.5px] leading-[1.65] text-white/55">
              The energy-backed blockchain. Solar production measured, verified,
              and written on-chain.
            </p>
            <p className="mono mt-10 text-[11px] uppercase tracking-[0.18em] text-white/40">
              TGE · June 2026
            </p>
          </div>
          <FooterCol
            title="Resources"
            links={[
              "News",
              "Whitepaper",
              "Executive Summary",
              "Investor Model",
              "Investor Thesis",
              "Presentation",
            ]}
          />
          <FooterCol
            title="Protocol"
            links={["Explorer", "API Docs", "GitHub"]}
          />
          <FooterCol
            title="Products"
            links={[
              "CryptoCat",
              "Verdex Wallet",
              "Mining Pool",
              "SOLAR Miners",
              "Alpha Nodes",
            ]}
          />
          <FooterCol
            title="Community"
            links={["X", "Telegram", "LinkedIn", "Contact"]}
          />
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/45">
            {legal.map((l) => (
              <li key={l}>
                <a href="#" className="transition hover:text-white">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="mono mt-6 text-[12px] text-white/40">
            © Solarious 2026 All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2">
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-white/45">
        {title}
      </div>
      <ul className="mt-5 space-y-3 text-[14px]">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-white/75 transition hover:text-white">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
