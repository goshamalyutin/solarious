import PrismaticBurst from "@/components/PrismaticBurst";
import { Logo } from "@/components/Logo";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { MorphingText } from "@/components/ui/liquid-text";

export default function Home() {
  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />
      <Hero />
      <TrustStrip />
      <Metrics />
      <About />
      <ProofOfEnergy />
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

/* ───────────────────────────────────────────────────── NAV (floating pill) */

function Nav() {
  return (
    <div className="nav-shell">
      <nav className="nav">
        <a href="#top" className="flex items-center gap-3">
          <Logo
            variant="gradient"
            className="h-6 w-auto"
            width={140}
            height={24}
            priority
          />
        </a>
        <div className="hidden items-center gap-9 text-[13px] text-ink-muted md:flex">
          <a href="#poe" className="transition hover:text-ink">
            Technology
          </a>
          <a href="#token" className="transition hover:text-ink">
            Token
          </a>
          <a href="#products" className="transition hover:text-ink">
            Ecosystem
          </a>
          <a href="#roadmap" className="transition hover:text-ink">
            Roadmap
          </a>
        </div>
        <a href="#whitelist" className="btn btn-primary btn-sm">
          Join the Whitelist
          <ArrowRight />
        </a>
      </nav>
    </div>
  );
}

/* ───────────────────────────────────────────────────── HERO */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[120px]"
      aria-label="Solarius hero"
    >
      {/* z-30: base white -> pearl wash + amber halo high above */}
      <div className="hero-sunlight -z-30" aria-hidden />

      {/* z-20: PrismaticBurst — now light-mode native. The shader
         outputs premultiplied alpha (alpha = luminance) so dark
         ray-march regions are transparent and the pearl page shows
         through them. Bright amber rays paint over the page. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 100% at 50% 28%, black 0%, black 55%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 100% at 50% 28%, black 0%, black 55%, transparent 92%)",
        }}
      >
        <PrismaticBurst
          animationType="rotate3d"
          intensity={2.2}
          speed={0.22}
          distort={0.6}
          rayCount={32}
          mixBlendMode="multiply"
          colors={["#FFB060", "#FF9540", "#FFC97A", "#FFD68F", "#FFE3A3"]}
        />
      </div>

      {/* z-10: conic CSS god-rays — atmospheric fallback for WebGL-disabled
         contexts; harmonizes with PrismaticBurst when both render */}
      <div className="god-rays -z-10" aria-hidden />

      {/* z-5: warm floor-pool + soft grain */}
      <div className="hero-floorlight -z-5" aria-hidden />
      <div className="hero-grain -z-5" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-6 pb-24 text-center sm:px-8">
        <span className="reveal mono inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
          <span className="pulse-dot" />
          TGE · June 2026
        </span>

        <h1 className="reveal reveal-1 mt-6 text-balance text-[clamp(36px,4.6vw,56px)] font-medium leading-[1.06] tracking-[-0.025em]">
          The <span className="orange-word">energy&#8209;backed</span>
          <br />
          blockchain.
        </h1>

        <p className="reveal reveal-2 mt-6 max-w-md text-[15.5px] leading-[1.55] text-ink-muted">
          Solar production is measured, verified, and written on-chain. Every
          $SOLAR traces back to a real kilowatt.
        </p>

        <div className="reveal reveal-3 mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#whitelist" className="btn btn-primary">
            Join the Whitelist
            <ArrowRight />
          </a>
          <a href="#poe" className="inline-block">
            <GlassButton size="default" className="text-ink">
              Read the Docs
            </GlassButton>
          </a>
        </div>

        <dl className="reveal reveal-4 mt-16 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 text-[12px]">
          {[
            { l: "Supply", v: "1B fixed" },
            { l: "Consensus", v: "200 nodes" },
            { l: "Verification", v: "zk + signed" },
            { l: "Hardware", v: "DC-only" },
          ].map((f) => (
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
    </section>
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

  return (
    <section
      className="relative w-full overflow-hidden border-y border-[var(--hairline)] bg-pearl-alt py-[clamp(56px,8vw,96px)]"
      aria-label="Verifiable infrastructure"
    >
      <div className="mx-auto max-w-[1280px] px-6 text-center sm:px-8">
        <p className="kicker justify-center">
          Built on verifiable infrastructure
        </p>
        <div className="mt-8">
          <MorphingText
            texts={phrases}
            className="!font-sans !text-[clamp(40px,7vw,84px)] !text-ink !leading-[0.95]"
          />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── METRICS */

function Metrics() {
  const items = [
    {
      num: "1",
      unit: "B",
      label: "$SOLAR fixed supply.\nNo future issuance beyond the cap.",
    },
    {
      num: "200",
      unit: "",
      label: "Validator nodes at consensus.\n50 are Alpha Nodes, hard-capped.",
    },
    {
      num: "1.8",
      unit: "M",
      label: "CryptoCat users moving\ninto the ecosystem.",
    },
    {
      num: "100",
      unit: "%",
      label: "Energy-backed issuance.\nEvery $SOLAR maps to a kilowatt.",
    },
  ];

  return (
    <section
      id="metrics"
      className="relative w-full py-[var(--section-y)]"
      aria-label="Network metrics"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="kicker">By the numbers</p>
          <h2 className="mt-4 text-balance">
            A network sized for{" "}
            <span className="orange-word">real production.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 divide-y divide-[var(--hairline)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 lg:divide-x">
          {items.map((m, i) => (
            <div
              key={m.num + i}
              className="px-2 py-10 first:pl-0 sm:px-8 sm:py-0 first:sm:pl-0"
            >
              <div className="h-mega text-ink">
                {m.num}
                {m.unit && <span className="text-orange">{m.unit}</span>}
              </div>
              <p className="body mt-4 whitespace-pre-line">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── ABOUT */

function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-pearl-alt py-[var(--section-y)]"
      aria-label="What is Solarious"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2">
        <div>
          <p className="kicker">What is Solarious</p>
          <h2 className="mt-4 text-balance">
            A Layer-1 anchored to{" "}
            <span className="orange-word">real energy.</span>
          </h2>
          <p className="lead mt-7">
            Solarious is a proprietary Layer-1. Measured and validated solar
            output becomes a verifiable contribution to the network. The chain
            is tied to physical energy production, not to speculation.
          </p>
        </div>

        <ol className="space-y-4">
          {[
            {
              t: "Solar production",
              d: "Real panels generating real kilowatt-hours.",
            },
            {
              t: "Hardware measurement",
              d: "Solar Miner signs every kWh inside a secure chip.",
            },
            {
              t: "On-chain settlement",
              d: "200-node consensus verifies, $SOLAR is issued.",
            },
          ].map((s, i) => (
            <li key={s.t} className="card flex items-start gap-5 p-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-white"
                style={{ background: "var(--brand-gradient)" }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="text-[18px]">{s.t}</h3>
                <p className="body mt-1 text-[14.5px]">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
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
        <div className="max-w-3xl">
          <p className="kicker">Proof of Energy</p>
          <h2 className="mt-4 text-balance">
            How <span className="orange-word">Proof of Energy</span> works.
          </h2>
          <p className="lead mt-6">
            Three stages, no middlemen, no claims. Hardware does the measuring.
            The network does the verifying.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <article key={s.t} className="card p-8">
              <div className="flex items-center justify-between">
                <span className="h-mega !text-[52px] !leading-none text-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                  Step
                </span>
              </div>
              <h3 className="mt-10">{s.t}</h3>
              <p className="body mt-3">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── PRODUCTS */

function Products() {
  const products = [
    {
      t: "Solar Miner",
      d: "Proprietary hardware that plugs into your panel and measures real output on-chain.",
      tag: "Hardware",
      icon: "miner",
    },
    {
      t: "Validators & Alpha Nodes",
      d: "Run the software, secure the network, finalize blocks, earn $SOLAR. Alpha Nodes are hard-capped at 50.",
      tag: "Network",
      icon: "network",
    },
    {
      t: "Verdex",
      d: "The Solarious wallet and access layer. Token access, claims, staking, miner console.",
      tag: "Wallet",
      icon: "wallet",
    },
    {
      t: "Mining Pool",
      d: "Operational interface for performance, devices, and payouts. Built with EMCD.",
      tag: "Operations",
      icon: "mining-pool",
    },
    {
      t: "CryptoCat",
      d: "The community layer with 1.8M users moving into the ecosystem.",
      tag: "Community",
      icon: "cat",
    },
    {
      t: "Tokenized RECs",
      d: "The settlement layer for renewable energy certificates and carbon markets. Built with Zoniqx.",
      tag: "Settlement",
      icon: "cube-stack",
    },
  ];

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-pearl-alt py-[var(--section-y)]"
      aria-label="Solarious ecosystem"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="kicker">Ecosystem</p>
          <h2 className="mt-4 text-balance">
            Six products. <span className="orange-word">One network.</span>
          </h2>
          <p className="lead mt-6">
            Hardware, validators, wallet, mining pool, community, and
            settlement. Every layer is a real product, shipping into one chain.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.t} className="card group p-7">
              <div className="flex items-center justify-between">
                <img
                  src={`/assets/icons/${p.icon}.svg`}
                  alt=""
                  aria-hidden
                  className="h-7 w-7"
                />
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-orange">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-10">{p.t}</h3>
              <p className="body mt-3">{p.d}</p>
              <div className="mt-8 flex items-center gap-2 text-[13px] text-ink-muted transition group-hover:text-orange">
                <span className="mono uppercase tracking-[0.16em]">
                  Read more
                </span>
                <ArrowRight />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── WHY (blockquote w/ orange bar) */

function WhyQuote() {
  return (
    <section
      className="relative w-full overflow-hidden py-[clamp(120px,16vh,220px)]"
      aria-label="Why energy"
    >
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8">
        <blockquote className="relative border-l-2 border-orange/80 pl-8 sm:pl-12">
          <p className="text-[clamp(28px,3.6vw,42px)] leading-[1.25] tracking-[-0.015em] text-ink">
            Every industry that scaled got a <em>settlement layer.</em> The
            internet had TCP/IP. Finance had SWIFT.{" "}
            <em>Energy never had one.</em> Solarious is that layer.
          </p>
          <footer className="mono mt-8 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            — The Solarious Thesis
          </footer>
        </blockquote>
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
      className="relative w-full py-[var(--section-y)]"
      aria-label="Security"
    >
      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="kicker">Security</p>
          <h2 className="mt-4 text-balance">
            Secured by <span className="orange-word">reality.</span>
          </h2>
          <p className="lead mt-6">
            You cannot fake a kilowatt. You have to produce one.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article key={it.t} className="card p-6">
              <img
                src={`/assets/icons/${it.icon}.svg`}
                alt=""
                aria-hidden
                className="mb-6 h-8 w-8"
              />
              <h3 className="text-[17px]">{it.t}</h3>
              <p className="body mt-2 text-[13.5px]">{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── TOKEN (donut) */

function Token() {
  const segments = [
    { name: "Ecosystem", pct: 34.0, color: "#F07501" },
    { name: "Validator rewards", pct: 25.5, color: "#FFB800" },
    { name: "Investors", pct: 15.0, color: "#E13202" },
    { name: "Reserves & Listing", pct: 9.0, color: "#C58A3B" },
    { name: "Producer rewards", pct: 8.5, color: "#8C4A1E" },
    { name: "Team & Advisors", pct: 8.0, color: "#2D2926" },
  ];
  const C = 2 * Math.PI * 80;
  let cumulative = 0;

  return (
    <section
      id="token"
      className="relative w-full overflow-hidden bg-pearl-alt py-[var(--section-y)]"
      aria-label="Token"
    >
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="kicker">$SOLAR</p>
          <h2 className="mt-4 text-balance">
            <span className="orange-word">Fixed supply.</span>
            <br />
            Energy-based issuance.
          </h2>
          <p className="lead mt-7">
            $SOLAR has a fixed supply of 1 billion. 15% is allocated at genesis
            with long-term vesting. 85% is issued over time through energy-based
            distribution. Early years are front-loaded, then a long tail
            supports infrastructure growth.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-8">
            <div>
              <div className="h-mega !text-[56px] text-ink">
                15<span className="text-orange">%</span>
              </div>
              <div className="mono mt-3 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Genesis allocation
              </div>
            </div>
            <div>
              <div className="h-mega !text-[56px] text-ink">
                85<span className="text-orange">%</span>
              </div>
              <div className="mono mt-3 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Energy-based issuance
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
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
              <div className="h-mega !text-[56px] text-ink">1B</div>
              <div className="mono mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Total supply
              </div>
              <div className="mono mt-1 text-[11px] uppercase tracking-[0.2em] text-orange">
                $SOLAR
              </div>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-2 text-[13px]">
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
        </div>
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
        <div className="max-w-3xl">
          <p className="kicker">Roadmap</p>
          <h2 className="mt-4 text-balance">
            Building <span className="orange-word">in phases.</span>
          </h2>
          <p className="lead mt-6">
            TGE in June 2026. Build first, ship hardware, then bring the network
            live with real validators and real energy.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 border-l-2 border-orange/30 pl-10 md:pl-14">
          {phases.map((p) => (
            <li key={p.t} className="relative">
              <span
                aria-hidden
                className="absolute -left-[46px] top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full md:-left-[58px]"
                style={
                  p.highlight
                    ? {
                        background: "var(--brand-gradient)",
                        boxShadow: "0 0 0 6px rgba(240,117,1,0.18)",
                      }
                    : {
                        background: "var(--pearl)",
                        border: "2px solid var(--orange)",
                      }
                }
              />
              <div className="mono text-[11px] uppercase tracking-[0.16em] text-orange">
                {p.when}
              </div>
              <h3 className="mt-1">{p.t}</h3>
              <p className="body mt-2 max-w-2xl">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── FINAL CTA */

function FinalCTA() {
  return (
    <section
      id="whitelist"
      className="relative w-full overflow-hidden py-[clamp(96px,14vh,200px)]"
      aria-label="Join the whitelist"
    >
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <div
          className="relative overflow-hidden rounded-[32px] p-12 text-center sm:p-20"
          style={{
            background:
              "linear-gradient(160deg, #1A1A1A 0%, #0A0A0A 55%, #2D1206 100%)",
          }}
        >
          <div aria-hidden className="absolute inset-0 opacity-70">
            <PrismaticBurst
              animationType="rotate"
              intensity={1.3}
              speed={0.22}
              distort={0.6}
              rayCount={20}
              mixBlendMode="screen"
              colors={["#FFB800", "#F07501", "#E13202"]}
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(10,10,10,0.55) 75%, rgba(10,10,10,0.95) 100%)",
            }}
          />

          <div className="relative">
            <p className="kicker justify-center" style={{ color: "#FFB800" }}>
              Whitelist
            </p>
            <h2 className="mt-4 !text-white">
              Be first to mine{" "}
              <span className="orange-word">solar energy.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.65] text-white/70">
              TGE is in June. The network goes live with real validators, real
              hardware, and real energy on-chain. Get notified when $SOLAR is
              available.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#" className="btn btn-primary btn-lg">
                Join the Whitelist
                <ArrowRight />
              </a>
              <GlassButton
                size="lg"
                className="text-white"
                glassColor="rgba(255,255,255,0.08)"
              >
                Read the Whitepaper
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────── FOOTER */

function Footer() {
  return (
    <footer className="relative w-full bg-midnight text-white/80">
      <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
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
            title="Network"
            links={["Technology", "Proof of Energy", "Security", "Validators"]}
          />
          <FooterCol
            title="Ecosystem"
            links={["Solar Miner", "Verdex", "CryptoCat", "Mining Pool"]}
          />
          <FooterCol
            title="Resources"
            links={["Whitepaper", "Docs", "Investor Thesis", "Press"]}
          />
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-[12px] text-white/40 sm:flex-row sm:items-center">
          <div className="mono">
            © {new Date().getFullYear()} Solarius. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Status
            </a>
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

/* ───────────────────────────────────────────────────── ICONS */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M3 8h10m-4-4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
