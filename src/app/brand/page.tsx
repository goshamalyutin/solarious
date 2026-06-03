import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

/**
 * /brand - the live style guide. Renders the real design tokens and recipes
 * from globals.css, so it can never drift from the shipped site (it IS the
 * shipped site's CSS). Companion to docs/BRAND.md.
 *
 * noindex: this is an internal reference, not a marketing page. It is not linked
 * from nav or footer; reach it by direct URL.
 */
export const metadata: Metadata = {
  title: "Brand - Solarius",
  description: "Live style guide for the Solarius design system.",
  robots: { index: false, follow: false },
};

const COLORS: { name: string; hex: string; role: string; dark?: boolean }[] = [
  { name: "--pearl", hex: "#E7DED8", role: "Primary page surface" },
  { name: "--pearl-alt", hex: "#EFE9E3", role: "Alt sections · solid cards" },
  {
    name: "--midnight",
    hex: "#0A0A0A",
    role: "Footer · dark surfaces",
    dark: true,
  },
  {
    name: "--ink",
    hex: "#1A1A1A",
    role: "Headings · primary text",
    dark: true,
  },
  { name: "--ink-muted", hex: "#555555", role: "Body copy", dark: true },
  { name: "--ink-faint", hex: "#8A847E", role: "Captions · meta", dark: true },
  { name: "--orange", hex: "#F07501", role: "The accent (< 5%)", dark: true },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96];

const RADII: { label: string; value: string }[] = [
  { label: "sm", value: "8px" },
  { label: "md", value: "16px" },
  { label: "lg", value: "24px" },
  { label: "pill", value: "999px" },
];

const SHADOWS: { name: string; var: string; note: string }[] = [
  { name: "shadow-card", var: "var(--shadow-card)", note: "Default card rest" },
  {
    name: "shadow-lift",
    var: "var(--shadow-lift)",
    note: "Card / panel hover",
  },
  { name: "shadow-glow", var: "var(--shadow-glow)", note: "Primary button" },
];

const TYPE: {
  tag: string;
  family: string;
  size: string;
  cls: string;
  sample: string;
  el:
    | "mega"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "lead"
    | "body"
    | "caption"
    | "kicker"
    | "mono";
}[] = [
  {
    tag: ".h-mega",
    family: "Clash Display",
    size: "clamp(72 · 120)",
    cls: "",
    sample: "204,358",
    el: "mega",
  },
  {
    tag: "h1",
    family: "Clash Display",
    size: "clamp(44 · 66)",
    cls: "",
    sample: "The Proof-of-Energy Layer-1",
    el: "h1",
  },
  {
    tag: "h2",
    family: "Clash Display",
    size: "clamp(32 · 46)",
    cls: "",
    sample: "Verified renewable production.",
    el: "h2",
  },
  {
    tag: "h3",
    family: "Geist",
    size: "22px",
    cls: "",
    sample: "Sub-head on Geist",
    el: "h3",
  },
  {
    tag: "h4",
    family: "Geist",
    size: "17px",
    cls: "",
    sample: "Smaller sub-head",
    el: "h4",
  },
  {
    tag: ".lead",
    family: "Geist",
    size: "18px",
    cls: "lead",
    sample: "Lead paragraph: the one-line promise under a headline.",
    el: "lead",
  },
  {
    tag: ".body",
    family: "Geist",
    size: "16px",
    cls: "body",
    sample: "Body copy. Short, declarative sentences. Facts over hype.",
    el: "body",
  },
  {
    tag: ".caption",
    family: "Geist",
    size: "13px",
    cls: "caption",
    sample: "Caption / meta line beneath a metric.",
    el: "caption",
  },
  {
    tag: ".kicker",
    family: "Geist Mono",
    size: "12px · 0.14em",
    cls: "kicker",
    sample: "Section kicker",
    el: "kicker",
  },
  {
    tag: ".mono",
    family: "Geist Mono",
    size: "any",
    cls: "mono",
    sample: "1,871,286 kWh · 4.0s · 34 validators",
    el: "mono",
  },
];

const ICONS = [
  "sun",
  "bolt",
  "leaf",
  "shield-check",
  "globe-validated",
  "chip",
  "wallet",
  "network",
  "key",
  "cube-stack",
  "clock",
  "check",
];

function Block({
  n,
  label,
  title,
  children,
}: {
  n: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--hairline)]">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-8 md:py-20">
        <p className="kicker">
          {n} · {label}
        </p>
        <h2 className="mt-4 text-balance">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function TypeSpecimen({ row }: { row: (typeof TYPE)[number] }) {
  const text = row.sample;
  const node =
    row.el === "mega" ? (
      <span className="h-mega">{text}</span>
    ) : row.el === "h1" ? (
      <h1 style={{ fontSize: "clamp(34px, 4vw, 52px)" }}>{text}</h1>
    ) : row.el === "h2" ? (
      <h2>{text}</h2>
    ) : row.el === "h3" ? (
      <h3>{text}</h3>
    ) : row.el === "h4" ? (
      <h4>{text}</h4>
    ) : (
      <p className={row.cls}>{text}</p>
    );

  return (
    <div className="grid grid-cols-1 gap-2 border-b border-[var(--hairline-soft)] py-6 last:border-0 md:grid-cols-[180px_1fr] md:gap-8">
      <div className="mono text-[11px] leading-relaxed text-ink-faint">
        <div className="text-ink">{row.tag}</div>
        <div>{row.family}</div>
        <div>{row.size}</div>
      </div>
      <div className="min-w-0">{node}</div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <main className="bg-pearl text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-[var(--hairline)] bg-pearl/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 md:px-8">
          <Logo width={132} height={26} />
          <a
            href="/"
            className="mono text-[11px] uppercase tracking-[0.14em] text-ink-muted transition hover:text-ink"
          >
            ← back to site
          </a>
        </div>
      </header>

      {/* Title */}
      <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 md:py-24">
        <p className="kicker">Brand guideline</p>
        <h1 className="mt-5 max-w-[16ch] text-balance">
          The Solarius <span className="orange-word">design system</span>.
        </h1>
        <p className="lead mt-6">
          Warm pearl, one orange accent, a confident display headline. Minimal,
          technical, factual. Every specimen below renders the live tokens from{" "}
          <span className="mono text-[0.92em]">globals.css</span>, so this page
          can never drift from the shipped site.
        </p>
      </section>

      {/* 01 Voice */}
      <Block
        n="01"
        label="Voice"
        title="English, like a real industry person. Never AI marketing."
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            [
              "Tone",
              "Confident, factual, infrastructure-first. Sell with verifiable facts: kilowatts, validator counts, supply caps. Never emotion or hype.",
            ],
            [
              "Casing",
              "Sentence case headlines with a trailing period; they read as statements. UPPERCASE only for kickers at 0.14em.",
            ],
            [
              "No em-dashes",
              "Use a hyphen, period, or semicolon. Em-dashes are an AI-writing tell. Also no “not X, but Y”.",
            ],
            [
              "Banned words",
              "delve · seamless · unlock · empower · revolutionize · game-changer · harnessing · leveraging. No emoji, ever.",
            ],
            [
              "Orange-word rule",
              "Exactly one word per headline is orange (.orange-word): the noun-phrase carrying the brand promise. Never two.",
            ],
            [
              "Brand spelling",
              "Chrome (logo / title / © ) reads “Solarious”; body copy reads “Solarius”. Intentional; do not correct.",
            ],
          ].map(([h, b]) => (
            <li key={h} className="card p-5">
              <div className="text-[15px] font-semibold">{h}</div>
              <p className="body mt-1.5 text-[14px]">{b}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* 02 Logo */}
      <Block n="02" label="Logo" title="One mark, two finishes.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card flex flex-col items-center justify-center gap-4 py-14">
            <Logo width={200} height={40} />
            <span className="mono text-[11px] text-ink-faint">
              logotype-gradient.svg · light surfaces
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 rounded-[var(--r-lg)] bg-midnight py-14">
            <Logo variant="white" width={200} height={40} />
            <span className="mono text-[11px] text-white/45">
              logotype-white.svg · midnight footer
            </span>
          </div>
        </div>
        <p className="body mt-5 text-[14px] text-ink-muted">
          Never recolor, stretch, or add effects to the mark. The standalone
          brand mark is <span className="mono text-[0.92em]">sol-mark.svg</span>
          .
        </p>
      </Block>

      {/* 03 Color */}
      <Block
        n="03"
        label="Color"
        title="Warm pearl for surfaces, orange for accent."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-[var(--r-md)] border border-[var(--hairline)]"
            >
              <div
                className="h-24 w-full"
                style={{
                  background: c.hex,
                  boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.04)",
                }}
              />
              <div className="bg-white/50 px-3 py-2.5">
                <div className="mono text-[11px] text-ink">{c.name}</div>
                <div className="mono text-[11px] text-ink-faint">{c.hex}</div>
                <div className="mt-1 text-[12px] text-ink-muted">{c.role}</div>
              </div>
            </div>
          ))}
          {/* Brand gradient */}
          <div className="overflow-hidden rounded-[var(--r-md)] border border-[var(--hairline)]">
            <div
              className="h-24 w-full"
              style={{ background: "var(--brand-gradient)" }}
            />
            <div className="bg-white/50 px-3 py-2.5">
              <div className="mono text-[11px] text-ink">--brand-gradient</div>
              <div className="mono text-[11px] text-ink-faint">
                FFB800 → F07501 → E13202
              </div>
              <div className="mt-1 text-[12px] text-ink-muted">
                Hero + final CTA only
              </div>
            </div>
          </div>
        </div>
        <p className="body mt-6 text-[14px] text-ink-muted">
          <span className="font-semibold text-ink">The 5% rule.</span> Orange is
          under 5% of pixels on any page: one word per headline, primary
          buttons, kickers, focus rings, single-pixel accent lines. Never body
          text. The gradient is hero/CTA only, never a card fill.
        </p>
      </Block>

      {/* 04 Type */}
      <Block n="04" label="Type" title="Three families, one job each.">
        <div className="rounded-[var(--r-lg)] border border-[var(--hairline)] bg-pearl-alt/40 px-5 py-2 md:px-8">
          {TYPE.map((row) => (
            <TypeSpecimen key={row.tag} row={row} />
          ))}
        </div>
        <p className="body mt-6 text-[14px] text-ink-muted">
          <span className="font-semibold text-ink">Clash Display</span> carries
          headlines (h1 / h2 / .h-mega);{" "}
          <span className="font-semibold text-ink">Geist</span> is body + UI +
          h3/h4; <span className="font-semibold text-ink">Geist Mono</span> is
          kickers, units, and code. Self-hosted woff2, no Google Fonts.
        </p>
      </Block>

      {/* 05 Spacing */}
      <Block n="05" label="Spacing" title="One scale: 4 → 96.">
        <div className="space-y-2.5">
          {SPACING.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="mono w-12 text-right text-[11px] text-ink-faint">
                {s}
              </span>
              <span
                className="h-4 rounded-sm"
                style={{ width: `${s}px`, background: "var(--orange)" }}
              />
            </div>
          ))}
        </div>
        <p className="body mt-6 text-[14px] text-ink-muted">
          Section rhythm:{" "}
          <span className="mono text-[0.92em]">
            --section-y: clamp(80px, 10vw, 140px)
          </span>{" "}
          (landing uses the tighter{" "}
          <span className="mono text-[0.92em]">py-14 md:py-20</span>).
        </p>
      </Block>

      {/* 06 Radii */}
      <Block n="06" label="Radii" title="8 / 16 / 24 / pill.">
        <div className="flex flex-wrap gap-5">
          {RADII.map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div
                className="h-24 w-24 border border-[var(--hairline)] bg-pearl-alt"
                style={{ borderRadius: r.value }}
              />
              <span className="mono text-[11px] text-ink-faint">
                {r.label} · {r.value}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* 07 Shadows */}
      <Block n="07" label="Shadows" title="Three flavors, always warm-tinted.">
        <div className="grid gap-6 sm:grid-cols-3">
          {SHADOWS.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3">
              <div
                className="h-28 w-full rounded-[var(--r-lg)] bg-white"
                style={{ boxShadow: s.var }}
              />
              <div className="text-center">
                <div className="mono text-[11px] text-ink">--{s.name}</div>
                <div className="text-[12px] text-ink-muted">{s.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* 08 Buttons */}
      <Block n="08" label="Buttons" title="Pill recipes, three sizes.">
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn btn-primary btn-lg">Join the Whitelist</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary glass</button>
          <button className="btn btn-dark">Dark</button>
          <button className="btn btn-primary btn-sm">Small</button>
        </div>
        <div className="mt-5 rounded-[var(--r-lg)] bg-midnight p-6">
          <button className="btn btn-ghost">Ghost (on dark)</button>
        </div>
        <p className="body mt-5 text-[14px] text-ink-muted">
          Primary uses{" "}
          <span className="mono text-[0.92em]">--brand-gradient</span> +{" "}
          <span className="mono text-[0.92em]">--shadow-glow</span>. Hover lifts
          -1px. Sizes:{" "}
          <span className="mono text-[0.92em]">
            .btn-sm 36 · .btn 44 · .btn-lg 52
          </span>
          .
        </p>
      </Block>

      {/* 09 Cards */}
      <Block
        n="09"
        label="Cards"
        title="Solid pearl-alt, hairline border, warm shadow."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="card p-6">
            <p className="kicker">Default</p>
            <h3 className="mt-3">.card</h3>
            <p className="body mt-2 text-[14px]">
              Solid --pearl-alt + --hairline border + --shadow-card. Hover lifts
              -4px to --shadow-lift.
            </p>
          </div>
          <div className="lg-surface rounded-[var(--r-lg)] p-6">
            <p className="kicker">Optional</p>
            <h3 className="mt-3">.lg-surface</h3>
            <p className="body mt-2 text-[14px]">
              The refractive liquid-glass surface. Use only when a hero or
              product card needs to feel layered, not the default.
            </p>
          </div>
        </div>
      </Block>

      {/* 10 Motion */}
      <Block
        n="10"
        label="Motion"
        title="Restrained. Max 4 animated elements at once."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <div className="text-[15px] font-semibold">Easings & durations</div>
            <p className="mono mt-2 text-[12px] leading-relaxed text-ink-muted">
              --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1)
              <br />
              --dur-fast 150 · --dur-base 250 · --dur-slow 600
            </p>
          </div>
          <div className="card p-5">
            <div className="text-[15px] font-semibold">Banned</div>
            <p className="body mt-2 text-[14px]">
              Parallax, scroll-jacked reveals, cursor trails, particle JS,
              bounce easing. All motion respects prefers-reduced-motion.
            </p>
          </div>
        </div>
      </Block>

      {/* 11 Icons */}
      <Block n="11" label="Icons" title="Hand-rolled inline SVG, 1.6px stroke.">
        <div className="flex flex-wrap gap-3">
          {ICONS.map((name) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div
              key={name}
              className="flex h-16 w-16 flex-col items-center justify-center gap-1.5 rounded-[var(--r-md)] border border-[var(--hairline)] bg-pearl-alt"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/assets/icons/${name}.svg`}
                alt={name}
                width={22}
                height={22}
              />
            </div>
          ))}
        </div>
        <p className="body mt-5 text-[14px] text-ink-muted">
          stroke-linecap / linejoin round, fill none, default stroke --ink. No
          icon font, no emoji. Components in{" "}
          <span className="mono text-[0.92em]">components/icons.tsx</span>.
        </p>
      </Block>

      {/* Footer note */}
      <footer className="border-t border-[var(--hairline)] bg-pearl-alt">
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-8">
          <p className="caption">
            Source of truth: <span className="mono">src/app/globals.css</span>{" "}
            tokens + <span className="mono">docs/BRAND.md</span>. This page
            renders them live. noindex: internal reference, not a marketing
            page.
          </p>
        </div>
      </footer>
    </main>
  );
}
