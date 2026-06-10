import Link from "next/link";
import { Nav } from "@/components/Nav";
import { HeroPrismatic } from "@/components/hero/HeroPrismatic";
import { NetworkExpand } from "@/components/NetworkExpand";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBlock } from "@/components/ContactBlock";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { CountUp } from "@/components/CountUp";
import { IconBadge } from "@/components/IconBadge";
import { ArrowRight } from "@/components/icons";
import { getDeviceImageUrl } from "@/lib/assets";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />
      <HeroPrismatic />
      <TrustStrip />
      <NetworkExpand />
      <MarketProblem />
      <About />
      <ProofOfEnergy />
      <EvidenceMetrics />
      <Device />
      <Ecosystem />
      <WhyQuote />
      <Security />
      <SolarEconomics />
      <Roadmap />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

/* ─────────────────────────────────────────────────── SECTION PRIMITIVE
   One rhythm for every top-level section: py-14 / md:py-20, one container
   width (max-w-[1200px], px-5 / md:px-8). The single source of outer spacing
   (brief Part 1). */

function Section({
  id,
  label,
  alt,
  children,
}: {
  id?: string;
  label: string;
  alt?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative w-full py-[var(--section-y)]",
        alt && "bg-pearl-alt",
      )}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── TRUST STRIP (§2.3) */

function TrustStrip() {
  const phrases = [
    "Renewable-energy verification",
    "Proof-of-Energy",
    "Solar Miner measurement",
    "Validator infrastructure",
    "Network evidence",
    "SREC / REC rails",
  ];
  // Duplicate the list so the -50% loop is seamless and no partial word freezes.
  const loop = [...phrases, ...phrases];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[var(--hairline)] bg-pearl-alt py-5"
      aria-label="Built on verifiable infrastructure"
    >
      <div className="marquee-mask">
        <div className="marquee">
          {loop.map((p, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-4 px-7 text-[clamp(14px,1.4vw,17px)] text-ink-muted"
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

/* ─────────────────────────────────────────────────── MARKET PROBLEM (§2.4) */

function MarketProblem() {
  const cards = [
    {
      t: "Delayed verification",
      d: "Renewable production is often certified after the fact, through slow and fragmented processes.",
    },
    {
      t: "Fragmented REC infrastructure",
      d: "Registries, brokers, utilities and compliance programs create friction for smaller producers.",
    },
    {
      t: "Under-monetized producers",
      d: "Many solar producers create environmental value without a simple path to programmable economic participation.",
    },
  ];

  return (
    <Section id="problem" label="The market gap" alt>
      <SectionHead
        kicker="The market gap"
        index="01"
        lead="Small and distributed solar producers often face delayed audits, registry friction, manual reconciliation and broker-dependent REC monetization. Solarius is building infrastructure to make renewable-energy production easier to verify, record and connect to programmable markets."
      >
        Renewable energy creates value that is still hard to verify and{" "}
        <span className="orange-word">monetize.</span>
      </SectionHead>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal
            key={c.t}
            delay={i * 80}
            className="rounded-[var(--r-lg)] border border-[var(--hairline)] bg-white/40 p-6"
          >
            <h3 className="text-[18px] tracking-[-0.015em]">{c.t}</h3>
            <p className="body mt-3 text-[14.5px]">{c.d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── WHAT IS SOLARIUS (§2.5) */

function About() {
  const flow = [
    "Solar production",
    "Proof-of-Energy",
    "Validators",
    "SOLAR economy",
    "SREC / REC settlement",
  ];

  return (
    <Section id="about" label="What is Solarius">
      <SectionHead kicker="What is Solarius" index="02">
        A Layer-1 anchored to{" "}
        <span className="orange-word">measured energy.</span>
      </SectionHead>

      <Reveal>
        <p className="max-w-3xl text-[clamp(18px,1.9vw,24px)] leading-[1.45] tracking-[-0.01em] text-ink">
          Solarius is a proprietary Layer-1 blockchain built around
          Proof-of-Energy. Measured solar production becomes verifiable network
          activity, connecting real-world renewable output with validators,
          wallet access, SOLAR utility and environmental-commodity settlement.
        </p>
      </Reveal>

      {/* Flow chain — ruled, monospace, no boxes. */}
      <Reveal delay={120}>
        <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-[var(--hairline)] pt-8">
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
    </Section>
  );
}

/* ─────────────────────────────────────────────────── PROOF OF ENERGY (§2.6) */

function ProofOfEnergy() {
  const steps = [
    {
      t: "Solar energy is produced.",
      d: "A solar asset generates electricity and creates measurable production data.",
    },
    {
      t: "Production is measured.",
      d: "Solar Miner or connected infrastructure captures output data from the energy source.",
    },
    {
      t: "A proof record is created.",
      d: "Production data is packaged for verification through the Solarius network.",
    },
    {
      t: "Validators check the proof.",
      d: "The network verifies accepted records before they can affect network activity.",
    },
    {
      t: "Energy data becomes useful.",
      d: "Verified production can support SOLAR utility, network participation and SREC / REC settlement rails.",
    },
  ];

  return (
    <Section id="proof" label="Proof-of-Energy" alt>
      <SectionHead
        kicker="Proof-of-Energy"
        index="03"
        lead="Proof-of-Energy starts with real solar output. Solar Miner captures production data, the network verifies the proof, and accepted records support SOLAR utility, validator participation and energy-market settlement."
      >
        Measured production becomes{" "}
        <span className="orange-word">verifiable network activity.</span>
      </SectionHead>

      <div>
        {steps.map((s, i) => (
          <Reveal
            key={s.t}
            delay={i * 70}
            className="grid grid-cols-[auto_1fr] gap-x-7 gap-y-2 border-t border-[var(--hairline)] py-7 last:border-b sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-12"
          >
            <span className="text-[clamp(34px,4.4vw,56px)] font-semibold leading-none tracking-[-0.04em] text-orange">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="max-w-2xl self-center">
              <h3 className="text-[clamp(19px,1.9vw,24px)] tracking-[-0.02em]">
                {s.t}
              </h3>
              <p className="body mt-2">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── EVIDENCE METRICS (§2.7) */

function EvidenceMetrics() {
  const items = [
    {
      value: 204358,
      decimals: 0,
      group: true,
      label: "Blocks minted",
      caption: "Network activity already underway.",
    },
    {
      value: 4.0,
      decimals: 1,
      suffix: "s",
      label: "Average block time",
      caption: "Fast verification rhythm.",
    },
    {
      value: 34,
      decimals: 0,
      label: "Verdex wallet addresses",
      caption: "Wallet access already forming.",
    },
    {
      value: 6,
      decimals: 0,
      label: "SOLAR producer activations",
      caption: "Producer-side proof already started.",
    },
    {
      value: 1871286,
      decimals: 0,
      group: true,
      label: "CryptoCat users",
      caption: "Community reach ready for activation.",
    },
  ];

  return (
    <Section id="evidence" label="Current evidence">
      <SectionHead
        kicker="Current evidence"
        index="04"
        lead="Solarius already shows evidence across network activity, wallet access, producer activation and community reach. Together, these signals show an ecosystem moving from architecture into scale."
      >
        Network proof already <span className="orange-word">in motion.</span>
      </SectionHead>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
        {items.map((m, i) => (
          <Reveal
            key={m.label}
            delay={i * 70}
            className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-white/40 p-5"
          >
            <div className="text-[clamp(28px,3vw,40px)] font-semibold leading-none tracking-[-0.03em] text-ink">
              <CountUp
                value={m.value}
                decimals={m.decimals}
                group={m.group}
                suffix={m.suffix}
              />
            </div>
            <div className="mt-3 text-[13.5px] font-medium leading-snug text-ink">
              {m.label}
            </div>
            <p className="caption mt-1.5 text-[12px]">{m.caption}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── DEVICE (§2.8) */

function Device() {
  const functions = [
    "Measures voltage, current and energy",
    "Signs energy proofs",
    "Controls mining load",
    "Sends verified data",
  ];
  const architecture = [
    "DC-only architecture",
    "No 220V dependency",
    "No grid simulation",
  ];

  return (
    <Section id="device" label="The DC Energy Device" alt>
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center">
        {/* Render — grounded with a soft contact shadow so it sits on a surface
            instead of floating in empty space (brief §2.8 / B5). */}
        <Reveal className="relative order-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] bottom-[6%] top-[26%] -z-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 55%, rgba(240,117,1,0.14) 0%, rgba(240,117,1,0) 70%)",
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
          {/* Contact shadow — grounds the device on the surface. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[20%] bottom-[3%] -z-0 h-5 rounded-[50%]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(26,26,26,0.20) 0%, rgba(26,26,26,0) 72%)",
              filter: "blur(7px)",
            }}
          />
        </Reveal>

        <div className="order-2">
          <p className="mono mb-5 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            Hardware · device-1
          </p>
          <SectionHead kicker="The device">
            Built for solar. <span className="orange-word">Not a miner.</span>
          </SectionHead>
          <Reveal>
            <p className="lead -mt-2">
              Not adapted from ASICs. It is an energy verification client.
            </p>
          </Reveal>

          {/* Architecture constraints — even grid of orange-dot labels, no orphan
              dividers; one-per-line on mobile (brief §2.8). */}
          <Reveal delay={100}>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 text-[13px] text-ink sm:grid-cols-3">
              {architecture.map((a) => (
                <span key={a} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70"
                  />
                  {a}
                </span>
              ))}
            </div>
          </Reveal>

          {/* What it does — ruled rows with mono indices. */}
          <ol className="mt-9">
            {functions.map((f, i) => (
              <Reveal
                key={f}
                delay={120 + i * 60}
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
    </Section>
  );
}

/* ─────────────────────────────────────────────────── ECOSYSTEM (§2.9) */

function Ecosystem() {
  const rows = [
    {
      t: "Proof-of-Energy L1",
      d: "Protocol layer that turns measured renewable-energy production into verifiable network activity.",
      icon: "cube-stack",
      href: "#",
    },
    {
      t: "Solar Miner",
      d: "Measurement device designed to connect real solar output to the Solarius network.",
      icon: "miner",
      href: "/miner",
    },
    {
      t: "Validators / Alpha Validators",
      d: "Participate in network verification and infrastructure operations.",
      icon: "shield-check",
      href: "#",
    },
    {
      t: "Verdex Wallet",
      d: "Wallet and access layer for claims, staking and Solarious ecosystem activity.",
      icon: "wallet",
      href: "#",
    },
    {
      t: "Mining Pool / Payout Infrastructure",
      d: "Operational layer for accounts, devices, rewards and payout flows.",
      icon: "mining-pool",
      href: "#",
    },
    {
      t: "CryptoCat",
      d: "Community education and onboarding layer with large user reach.",
      icon: "cat",
      href: "#",
    },
    {
      t: "SREC / REC Layer",
      d: "Environmental-commodity layer connecting verified renewable production with certificate and settlement rails.",
      icon: "leaf",
      href: "#",
    },
  ];

  return (
    <Section id="ecosystem" label="Solarius ecosystem">
      <SectionHead
        kicker="Ecosystem"
        index="05"
        lead="Solarius is not a single product. It is an ecosystem of measurement, verification, wallet access, infrastructure participation and environmental-commodity settlement."
      >
        Connected layers, built around{" "}
        <span className="orange-word">one network.</span>
      </SectionHead>

      <div>
        {rows.map((r, i) => (
          <Reveal key={r.t} delay={i * 50}>
            <Link
              href={r.href}
              className="group flex items-start gap-5 border-t border-[var(--hairline)] py-6 transition-colors last:border-b hover:bg-[color-mix(in_srgb,var(--orange)_4%,transparent)]"
            >
              <IconBadge name={r.icon} />
              <div className="min-w-0 flex-1">
                <h3 className="text-[clamp(18px,1.8vw,22px)] tracking-[-0.02em] transition-colors group-hover:text-orange">
                  {r.t}
                </h3>
                <p className="body mt-1.5 max-w-2xl text-[14.5px]">{r.d}</p>
              </div>
              <span className="mt-2 hidden text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-orange sm:block">
                <ArrowRight />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── WHY (dark beat) */

function WhyQuote() {
  return (
    <section
      className="relative w-full overflow-hidden bg-midnight py-[var(--section-y)] text-white"
      aria-label="Why energy"
    >
      {/* Faint amber floor glow — single warm light source, no second hue. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="max-w-4xl">
          <Reveal>
            <p className="kicker" style={{ color: "var(--orange)" }}>
              Why energy
            </p>
            <p className="mt-7 text-[clamp(26px,3.6vw,44px)] font-medium leading-[1.22] tracking-[-0.02em] text-white">
              Every industry that scaled got a settlement layer. The internet
              had TCP/IP. Finance had SWIFT.{" "}
              <span className="text-white/45">Energy never had one.</span>{" "}
              Solarious is that layer.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────── SECURITY (§2.10) */

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
    <Section id="security" label="Security" alt>
      <SectionHead
        kicker="Security"
        index="06"
        lead="You cannot fake a kilowatt. You have to produce one."
      >
        Secured by <span className="orange-word">reality.</span>
      </SectionHead>

      {/* Fixed icon box, top-aligned to the heading, identical across all four. */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-2 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal
            key={it.t}
            delay={(i % 2) * 80}
            className="flex items-start gap-4 border-t border-[var(--hairline)] py-7"
          >
            <IconBadge name={it.icon} />
            <div>
              <h3 className="text-[18px] tracking-[-0.015em]">{it.t}</h3>
              <p className="body mt-2 max-w-md text-[14.5px]">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── SOLAR ECONOMICS (§2.11) */

function SolarEconomics() {
  const utility = [
    "Network transaction fees",
    "Validator participation",
    "Wallet and claim activity",
    "Ecosystem utility",
    "Environmental-commodity settlement",
  ];
  // Allocation chart kept verbatim (15 / 85 split + 1B total supply, brief §2.11).
  const segments = [
    { name: "Ecosystem", pct: 34.0, color: "#F07501" },
    { name: "Validator rewards", pct: 25.5, color: "#FF9D5C" },
    { name: "Investors", pct: 15.0, color: "#FFC59A" },
    { name: "Reserves & Listing", pct: 9.0, color: "#D45F00" },
    { name: "Producer rewards", pct: 8.5, color: "#A84800" },
    { name: "Team & Advisors", pct: 8.0, color: "#7A3400" },
  ];
  const C = 2 * Math.PI * 80;
  let cumulative = 0;

  return (
    <Section id="token" label="SOLAR economics">
      <SectionHead
        kicker="SOLAR economics"
        index="07"
        lead="SOLAR is designed as the utility asset of the Solarius network. The economic model connects verified production, validator participation, wallet activity and ecosystem utility into one network economy."
      >
        Designed around verified production and{" "}
        <span className="orange-word">network utility.</span>
      </SectionHead>

      {/* Utility bullets. */}
      <Reveal>
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
          {utility.map((u) => (
            <li
              key={u}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-white/40 px-3.5 py-2 text-[12.5px] text-ink-muted"
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-orange/70"
              />
              {u}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Existing allocation chart, kept beneath the new lead-in. */}
      <div className="mt-14 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
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
                Network issuance
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
                    className="inline-block h-3 w-3 shrink-0 rounded-[3px]"
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
                SOLAR
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── ROADMAP (§2.12) */

function Roadmap() {
  const phases = [
    {
      t: "Foundation Built",
      d: "Proof-of-Energy architecture, mining pool infrastructure, CryptoCat reach and Solar Miner layer.",
    },
    {
      t: "Proof Demonstrated",
      d: "April 29 Proof-of-Energy demonstration, network activity and producer activations.",
    },
    {
      t: "Network Launch Readiness",
      d: "Validator onboarding, Verdex wallet / claim readiness, docs and explorer evidence.",
    },
    {
      t: "Market Infrastructure Readiness",
      d: "Token mechanics, market-maker review and exchange/on-ramp readiness.",
    },
    {
      t: "Infrastructure Scale",
      d: "Solar Miner rollout path, more producers, more verified energy data and broader validator participation.",
    },
    {
      t: "Environmental-Commodity Pathway",
      d: "SREC / REC rails, energy-sector partnerships and tokenized environmental-commodity settlement.",
    },
  ];

  return (
    <Section id="roadmap" label="Roadmap" alt>
      <SectionHead
        kicker="Roadmap"
        index="08"
        lead="Solarius is moving through a staged infrastructure buildout: energy verification, validator readiness, wallet access, producer activation and environmental-commodity rails."
      >
        From working proof to{" "}
        <span className="orange-word">infrastructure scale.</span>
      </SectionHead>

      <ol>
        {phases.map((p, i) => (
          <Reveal
            key={p.t}
            delay={i * 60}
            className="grid grid-cols-1 gap-x-10 gap-y-2 border-t border-[var(--hairline)] py-7 last:border-b sm:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ boxShadow: "inset 0 0 0 1.5px var(--ink-faint)" }}
              />
              <span className="mono text-[11px] uppercase tracking-[0.16em] text-orange">
                Phase {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="max-w-2xl">
              <h3 className="text-[clamp(19px,1.9vw,24px)] tracking-[-0.02em]">
                {p.t}
              </h3>
              <p className="body mt-2">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ─────────────────────────────────────────────────── FINAL CTA (§2.13) */

function FinalCTA() {
  return (
    <Section id="whitelist" label="Join the network">
      <SectionHead
        kicker="Join the network"
        lead="Solarius is opening strategic conversations across investment, validator infrastructure, energy production, market infrastructure and ecosystem distribution."
      >
        Help build the <span className="orange-word">Proof-of-Energy</span>{" "}
        economy.
      </SectionHead>

      <ContactBlock />
    </Section>
  );
}
