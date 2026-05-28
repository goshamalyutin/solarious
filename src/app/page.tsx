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

/* ────────────────────────────────────────────────── NAV */

function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-pearl/90 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full glass">
            <span
              aria-hidden
              className="block h-4 w-4 rounded-full"
              style={{ background: "var(--brand-gradient)" }}
            />
          </span>
          <Logo className="h-5 w-auto text-ink" />
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-medium text-ink/70 md:flex">
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
          <a href="#whitelist" className="transition hover:text-ink">
            Whitelist
          </a>
        </nav>

        <a
          href="#whitelist"
          className="btn-primary text-sm"
          style={{ padding: "10px 18px" }}
        >
          Join the Whitelist
          <ArrowRight />
        </a>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────── HERO */

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-grain"
      aria-label="Solarious hero"
    >
      {/* z-0: warm pearl base (bg-pearl) */}

      {/* z-1: PrismaticBurst recolored to brand corona */}
      <div className="absolute inset-0 -z-10 opacity-90">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.7}
          speed={0.32}
          distort={1.1}
          rayCount={36}
          mixBlendMode="multiply"
          colors={["#FFB800", "#F07501", "#E13202", "#FFD68F", "#FFFFFF"]}
        />
      </div>

      {/* z-2: warm drift blobs */}
      <div
        aria-hidden
        className="drift-a absolute -left-40 top-1/4 -z-10 h-[640px] w-[640px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.55) 0%, rgba(240,117,1,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="drift-b absolute -right-32 bottom-0 -z-10 h-[720px] w-[720px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(225,50,2,0.35) 0%, rgba(255,184,0,0) 70%)",
        }}
      />

      {/* Soft pearl vignette so corners read as page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 65% 50%, transparent 0%, transparent 40%, rgba(231,222,216,0.55) 78%, rgba(231,222,216,0.95) 100%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-24 sm:px-8 md:grid-cols-12 md:pt-32">
        <div className="md:col-span-7">
          <span className="reveal inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-ink/80 uppercase">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-orange" />
            TGE · June 2026
          </span>

          <h1 className="display reveal reveal-1 mt-7 text-[clamp(46px,7vw,84px)] text-ink">
            The <span className="orange-word">energy&#8209;backed</span>
            <br />
            blockchain.
          </h1>

          <p className="reveal reveal-2 mt-7 max-w-xl text-[17px] leading-[1.55] text-ink-muted sm:text-[18px]">
            Solar production is measured, verified, and written on-chain. Every
            $SOLAR traces back to a real kilowatt.
          </p>

          <div className="reveal reveal-3 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a href="#whitelist" className="btn-primary">
              Join the Whitelist
              <ArrowRight />
            </a>
            <a href="#poe" className="inline-block">
              <GlassButton size="lg" className="text-ink">
                Read the Docs
              </GlassButton>
            </a>
          </div>

          <dl className="reveal reveal-4 mt-14 grid max-w-2xl grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4">
            {[
              { l: "Supply", v: "1B fixed" },
              { l: "Consensus", v: "200 nodes" },
              { l: "Verification", v: "zk + signed" },
              { l: "Hardware", v: "DC-only" },
            ].map((f) => (
              <div key={f.l}>
                <dt className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-muted">
                  {f.l}
                </dt>
                <dd className="mt-1 font-display text-[18px] font-semibold text-ink">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Foreground liquid-glass orb — refracts the corona behind it */}
        <div className="relative hidden md:col-span-5 md:block">
          <GlassOrb />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.3em] text-ink/45">
        <span>Scroll</span>
        <div className="relative mx-auto mt-2 h-10 w-px overflow-hidden bg-ink/10">
          <span className="scroll-line absolute inset-0 block" />
        </div>
      </div>
    </section>
  );
}

function GlassOrb() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      {/* outer halo */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.55), rgba(225,50,2,0) 70%)",
        }}
      />
      {/* glass disc */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow:
            "inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -40px 60px -20px rgba(225,50,2,0.25), 0 30px 80px -20px rgba(26,26,26,0.25)",
        }}
      />
      {/* highlight */}
      <div
        aria-hidden
        className="absolute left-[16%] top-[14%] h-[28%] w-[40%] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* center brand sun */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-[34%] w-[34%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #FFF1C9 0%, #FFB800 25%, #F07501 60%, #E13202 100%)",
            boxShadow:
              "0 0 80px 20px rgba(255,184,0,0.45), 0 0 30px 8px rgba(240,117,1,0.55)",
          }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────── TRUST STRIP (MorphingText) */

function TrustStrip() {
  const phrases = [
    "Proof-of-Energy",
    "200-node consensus",
    "zk verification",
    "DC-only hardware",
    "ATECC608B secure chip",
    "Real kilowatt-hours",
  ];

  return (
    <section
      className="relative w-full overflow-hidden border-y border-ink/5 bg-pearl-alt py-16"
      aria-label="Verifiable infrastructure"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="kicker text-center">
          Built on verifiable infrastructure
        </div>
        <div className="mt-6">
          <MorphingText
            texts={phrases}
            className="!font-display !text-[clamp(40px,7vw,84px)] !text-ink !leading-[0.95]"
          />
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── METRICS */

function Metrics() {
  const items = [
    {
      num: "1B",
      label: "$SOLAR fixed supply.\nNo future issuance beyond the cap.",
    },
    {
      num: "200",
      label: "Validator nodes at consensus.\n50 are Alpha Nodes, hard-capped.",
    },
    { num: "1.8M", label: "CryptoCat users moving\ninto the ecosystem." },
    {
      num: "100%",
      label: "Energy-backed issuance.\nEvery $SOLAR maps to a kilowatt.",
    },
  ];

  return (
    <section
      id="metrics"
      className="relative w-full py-[clamp(96px,12vh,180px)]"
      aria-label="Network metrics"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="kicker">By the numbers</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            A network sized for{" "}
            <span className="orange-word">real production.</span>
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4">
          {items.map((m) => (
            <div key={m.num}>
              <div className="display text-[clamp(56px,6vw,96px)] leading-none text-ink">
                {m.num.replace(/[%MB]/, "")}
                <span className="text-orange">
                  {m.num.match(/[%MB]/)?.[0] ?? ""}
                </span>
              </div>
              <p className="mt-4 whitespace-pre-line text-[14px] leading-[1.55] text-ink-muted">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── ABOUT */

function About() {
  return (
    <section
      id="about"
      className="relative w-full py-[clamp(96px,12vh,180px)]"
      aria-label="What is Solarious"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2">
        <div>
          <p className="kicker">What is Solarious</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            A Layer-1 anchored to{" "}
            <span className="orange-word">real energy.</span>
          </h2>
          <p className="mt-7 max-w-md text-[17px] leading-[1.65] text-ink-muted">
            Solarious is a proprietary Layer-1. Measured and validated solar
            output becomes a verifiable contribution to the network. The chain
            is tied to physical energy production, not to speculation.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-10 rounded-[40px] blur-3xl drift-a"
            style={{
              background:
                "radial-gradient(circle, rgba(255,184,0,0.32), rgba(240,117,1,0) 65%)",
            }}
          />
          <ol className="relative space-y-4">
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
              <li
                key={s.t}
                className="glass relative flex items-start gap-5 rounded-[20px] p-6"
              >
                <div
                  className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "var(--brand-gradient)" }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-[18px] font-semibold text-ink">
                    {s.t}
                  </h3>
                  <p className="mt-1 text-[14px] text-ink-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── PROOF OF ENERGY */

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
      className="relative w-full overflow-hidden bg-pearl-alt py-[clamp(96px,12vh,180px)]"
      aria-label="How Proof of Energy works"
    >
      <div
        aria-hidden
        className="drift-b absolute -right-32 top-1/3 h-[560px] w-[560px] rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.42), rgba(240,117,1,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="kicker">Proof of Energy</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            How <span className="orange-word">Proof of Energy</span> works.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-ink-muted">
            Three stages, no middlemen, no claims. Hardware does the measuring.
            The network does the verifying.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <article
              key={s.t}
              className="glass relative overflow-hidden rounded-[24px] p-8"
            >
              <div className="flex items-center justify-between">
                <span className="display text-[44px] leading-none text-orange/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  Step
                </span>
              </div>
              <h3 className="mt-8 font-display text-[20px] font-semibold text-ink">
                {s.t}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── PRODUCTS */

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
      className="relative w-full py-[clamp(96px,12vh,180px)]"
      aria-label="Solarious ecosystem"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="kicker">Ecosystem</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            Six products. <span className="orange-word">One network.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-ink-muted">
            Hardware, validators, wallet, mining pool, community, and
            settlement. Every layer is a real product, shipping into one chain.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.t}
              className="group relative overflow-hidden rounded-[24px] border border-ink/5 bg-white/55 p-7 transition hover:-translate-y-1 hover:bg-white/75"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-2xl opacity-60 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,184,0,0.45), rgba(240,117,1,0) 70%)",
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="kicker">{p.tag}</span>
                <ArrowRight className="text-ink/40 transition group-hover:translate-x-0.5 group-hover:text-orange" />
              </div>
              <h3 className="relative mt-8 font-display text-[22px] font-semibold text-ink">
                {p.t}
              </h3>
              <p className="relative mt-3 text-[14.5px] leading-[1.6] text-ink-muted">
                {p.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── WHY (Fraunces pull-quote) */

function WhyQuote() {
  return (
    <section
      className="relative w-full overflow-hidden bg-pearl-alt py-[clamp(120px,16vh,220px)]"
      aria-label="Why energy"
    >
      <div
        aria-hidden
        className="drift-a absolute -left-32 top-0 h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,184,0,0.34), rgba(240,117,1,0) 70%)",
        }}
      />
      <blockquote className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <p className="text-[clamp(28px,3.8vw,46px)] leading-[1.25] text-ink">
          Every industry that scaled got a{" "}
          <em className="font-serif italic text-orange">settlement layer.</em>{" "}
          The internet had TCP/IP. Finance had SWIFT.{" "}
          <em className="font-serif italic">Energy never had one.</em> Solarious
          is that layer.
        </p>
        <footer className="mt-10 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
          — The Solarious Thesis
        </footer>
      </blockquote>
    </section>
  );
}

/* ────────────────────────────────────────────────── SECURITY */

function Security() {
  const items = [
    {
      t: "Hardware signing",
      d: "Proofs are signed inside a secure chip. The private key never leaves the device.",
    },
    {
      t: "On-chain validation",
      d: "Every proof is verified by the validator network before any token is issued.",
    },
    {
      t: "Replay protection",
      d: "Lifetime counters block reuse. A proof cannot be duplicated.",
    },
    {
      t: "Production caps",
      d: "Each device has realistic limits. Inflated claims are rejected by the network.",
    },
  ];

  return (
    <section
      id="security"
      className="relative w-full py-[clamp(96px,12vh,180px)]"
      aria-label="Security"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="kicker">Security</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            Secured by <span className="orange-word">reality.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-ink-muted">
            You cannot fake a kilowatt. You have to produce one.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <article
              key={it.t}
              className="glass relative overflow-hidden rounded-[22px] p-6"
            >
              <div
                aria-hidden
                className="mb-6 h-9 w-9 rounded-full"
                style={{ background: "var(--brand-gradient)" }}
              />
              <h3 className="font-display text-[17px] font-semibold text-ink">
                {it.t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-muted">
                {it.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── TOKEN (donut) */

function Token() {
  const segments = [
    { name: "Ecosystem", pct: 34.0, color: "#F07501" },
    { name: "Validator rewards", pct: 25.5, color: "#FFB800" },
    { name: "Investors", pct: 15.0, color: "#E13202" },
    { name: "Reserves & Listing", pct: 9.0, color: "#C58A3B" },
    { name: "Producer rewards", pct: 8.5, color: "#8C4A1E" },
    { name: "Team & Advisors", pct: 8.0, color: "#2D2926" },
  ];
  const C = 2 * Math.PI * 80; // 502.6548
  let cumulative = 0;

  return (
    <section
      id="token"
      className="relative w-full overflow-hidden bg-pearl-alt py-[clamp(96px,12vh,180px)]"
      aria-label="Token"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="kicker">$SOLAR</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            <span className="orange-word">Fixed supply.</span>
            <br />
            Energy-based issuance.
          </h2>
          <p className="mt-7 max-w-md text-[16.5px] leading-[1.65] text-ink-muted">
            $SOLAR has a fixed supply of 1 billion. 15% is allocated at genesis
            with long-term vesting. 85% is issued over time through energy-based
            distribution. Early years are front-loaded, then a long tail
            supports infrastructure growth.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-2 gap-6">
            <div>
              <div className="display text-[44px] leading-none text-ink">
                15<span className="text-orange">%</span>
              </div>
              <div className="mt-2 text-[12.5px] uppercase tracking-[0.16em] text-ink-muted">
                Genesis allocation
              </div>
            </div>
            <div>
              <div className="display text-[44px] leading-none text-ink">
                85<span className="text-orange">%</span>
              </div>
              <div className="mt-2 text-[12.5px] uppercase tracking-[0.16em] text-ink-muted">
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
                    strokeLinecap="butt"
                  />
                );
                cumulative += len;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="display text-[52px] leading-none text-ink">
                1B
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Total supply
              </div>
              <div className="kicker mt-1">$SOLAR</div>
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-2 text-[13px]">
            {segments.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between border-b border-ink/5 pb-2"
              >
                <span className="flex items-center gap-3 text-ink">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-sm"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
                <span className="font-display font-semibold text-ink">
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

/* ────────────────────────────────────────────────── ROADMAP */

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
      className="relative w-full py-[clamp(96px,12vh,180px)]"
      aria-label="Roadmap"
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <p className="kicker">Roadmap</p>
          <h2 className="display mt-3 text-[clamp(34px,4.5vw,52px)] text-ink">
            Building <span className="orange-word">in phases.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-ink-muted">
            TGE in June 2026. Build first, ship hardware, then bring the network
            live with real validators and real energy.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-8 border-l-2 border-orange/30 pl-10 md:pl-14">
          {phases.map((p) => (
            <li key={p.t} className={`relative ${p.highlight ? "" : ""}`}>
              <span
                aria-hidden
                className={`absolute -left-[46px] top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full md:-left-[58px] ${
                  p.highlight ? "" : "bg-pearl"
                }`}
                style={
                  p.highlight
                    ? {
                        background: "var(--brand-gradient)",
                        boxShadow: "0 0 0 6px rgba(240,117,1,0.18)",
                      }
                    : { border: "2px solid var(--orange)" }
                }
              />
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-orange">
                {p.when}
              </div>
              <h3 className="mt-1 font-display text-[22px] font-semibold text-ink">
                {p.t}
              </h3>
              <p className="mt-2 max-w-2xl text-[14.5px] leading-[1.6] text-ink-muted">
                {p.d}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────── FINAL CTA */

function FinalCTA() {
  return (
    <section
      id="whitelist"
      className="relative w-full overflow-hidden py-[clamp(96px,14vh,200px)]"
      aria-label="Join the whitelist"
    >
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <div
          className="relative overflow-hidden rounded-[36px] p-12 text-center sm:p-20"
          style={{
            background:
              "linear-gradient(160deg, #1A1A1A 0%, #0A0A0A 60%, #2D1206 100%)",
          }}
        >
          <div aria-hidden className="absolute inset-0 opacity-70">
            <PrismaticBurst
              animationType="rotate"
              intensity={1.4}
              speed={0.22}
              distort={0.7}
              rayCount={22}
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
            <p className="kicker" style={{ color: "#FFB800" }}>
              Whitelist
            </p>
            <h2 className="display mt-4 text-[clamp(32px,5vw,60px)] text-white">
              Be first to mine{" "}
              <span className="orange-word">solar energy.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.65] text-white/70">
              TGE is in June. The network goes live with real validators, real
              hardware, and real energy on-chain. Get notified when $SOLAR is
              available.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#" className="btn-primary">
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

/* ────────────────────────────────────────────────── FOOTER */

function Footer() {
  return (
    <footer className="relative w-full bg-midnight text-white/80">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-16 h-16"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.6) 60%, var(--midnight) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo className="h-7 w-auto text-white" variant="white" />
            <p className="mt-6 max-w-sm text-[14.5px] leading-[1.65] text-white/55">
              The energy-backed blockchain. Solar production measured, verified,
              and written on-chain.
            </p>
            <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-white/40">
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
          <div>© {new Date().getFullYear()} Solarius. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
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
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
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

/* ────────────────────────────────────────────────── ICONS */

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
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
