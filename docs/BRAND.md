# Solarious - Brand Guideline

The canonical, in-repo brand reference for **Solarius** - the Proof-of-Energy
Layer-1. Solar production is measured, verified, and written on-chain; every
token traces back to a real kilowatt.

The visual language is **warm pearl + one orange accent + a confident display
headline**. Minimal, technical, factual.

> **Source of truth = the live tokens in `src/app/globals.css`.** This document
> and the live `/brand` style-guide page both render from those tokens. When
> code and a written rule disagree, **the code wins** - update the doc, not the
> shipped site. (This doc was reconciled to the shipped code; see _Reconciliation_
> at the end. The original external kit lives at `~/Downloads/Solarious Design
System/` for deeper reference and assets.)

---

## The system at a glance

| Axis          | What's there                                                                             | Count      |
| ------------- | ---------------------------------------------------------------------------------------- | ---------- |
| Type families | **Clash Display** (headlines) · **Geist** (body/UI) · **Geist Mono** (labels/units/code) | **3**      |
| Surfaces      | `--pearl`, `--pearl-alt` (+ `--midnight` footer)                                         | **2 (+1)** |
| Ink           | `--ink`, `--ink-muted`, `--ink-faint`                                                    | **3**      |
| Accent        | `--orange` (+ a brand-gradient for hero/CTA only)                                        | **1**      |
| Radii         | 8 / 16 / 24 / pill                                                                       | **4**      |
| Shadows       | `--shadow-card`, `--shadow-lift`, `--shadow-glow`                                        | **3**      |

Small enough to hold in your head. Everything else in the CSS is a legacy alias
kept for backward compatibility - do not reach for those in new work.

---

## Voice & content

> **Voice rule:** English, like a real industry person. Never AI marketing.

- **Tone.** Confident, factual, infrastructure-first. Sell with verifiable facts
  (kilowatts, validator counts, supply caps), never emotion or hype.
- **Casing.** Sentence case for headlines (`The Proof-of-Energy Layer-1 for
verified renewable production.`). Trailing period - headlines read as
  statements. UPPERCASE only for kickers, with `letter-spacing: 0.14em`.
- **Punctuation.**
  - **No em-dashes** (`—`). Use a hyphen, period, or semicolon. Em-dashes are an
    AI-writing tell.
  - **No "not X, but Y"** constructions.
  - Short, declarative sentences.
- **Banned words.** delve · seamless · unlock · empower · revolutionize ·
  game-changer · "in today's world" · harnessing · leveraging.
- **Emoji.** None. Hard rule.
- **The orange-word rule.** In every headline, exactly **one** word is
  `color: var(--orange)` (the `.orange-word` class). Never two. The orange word
  is the noun-phrase that carries the brand promise (e.g. **Proof-of-Energy**).

---

## Logo

| Asset                           | Use                                   |
| ------------------------------- | ------------------------------------- |
| `/assets/logotype-gradient.svg` | Default - light (pearl) backgrounds   |
| `/assets/logotype-white.svg`    | The midnight footer and dark surfaces |
| `/assets/sol-mark.svg`          | The standalone brand mark             |

Render via `components/Logo.tsx` (`<Logo variant="gradient" \| "white" />`).
Never recolor, stretch, or add effects to the mark.

> **Brand spelling is intentionally split - do not "correct" it.** The chrome
> (logo wordmark, page `<title>`, footer ©) reads **"Solarious"**; running body
> copy reads **"Solarius"**. Both are from the brief.

---

## Color

Two-axis palette: **warm pearl** for surfaces, **orange** for accent.

| Token              | Hex                                  | Role                              |
| ------------------ | ------------------------------------ | --------------------------------- |
| `--pearl`          | `#E7DED8`                            | Primary page surface              |
| `--pearl-alt`      | `#EFE9E3`                            | Alternating sections, solid cards |
| `--midnight`       | `#0A0A0A`                            | Footer / dark surfaces            |
| `--ink`            | `#1A1A1A`                            | Primary text, headings            |
| `--ink-muted`      | `#555555`                            | Body copy                         |
| `--ink-faint`      | `#8A847E`                            | Captions, meta                    |
| `--orange`         | `#F07501`                            | **The** accent                    |
| `--hairline`       | `rgba(26,26,26,0.08)`                | 1px dividers, card borders        |
| `--brand-gradient` | `135deg #FFB800 → #F07501 → #E13202` | **Hero + final CTA only**         |

**The 5% rule.** Orange is **< 5%** of pixels on any page. Use it for: one word
per headline, primary buttons, kickers, focus rings, single-pixel accent lines.
**Never** for body text. The `--brand-gradient` is hero/CTA only - never a card
fill or decoration.

---

## Typography

**Three families, one job each.** (This supersedes the external kit's older
"Geist-only / 2 fonts" rule - the shipped site uses Clash Display for headlines;
see _Reconciliation_.)

| Family            | Variable         | Role                                       | Weights               |
| ----------------- | ---------------- | ------------------------------------------ | --------------------- |
| **Clash Display** | `--font-display` | `h1`, `h2`, `.h-mega` - display headlines  | 400 / 500 / 600 / 700 |
| **Geist**         | `--font-sans`    | Body, UI, `h3`/`h4` sub-heads              | 100–900 (variable)    |
| **Geist Mono**    | `--font-mono`    | Kickers, eyebrows, units, code, timestamps | variable              |

Clash Display is geometric and runs wide, so display tracking is relaxed
(`--display-track: -0.02em`; mega `-0.03em`) - no Geist-style `-0.03em` choke.
Self-hosted woff2, no Google Fonts dependency.

### Scale

| Style      | Family     | Size                                | Line |
| ---------- | ---------- | ----------------------------------- | ---- |
| `.h-mega`  | Clash      | `clamp(72px, 9vw, 120px)`           | 1.0  |
| `h1`       | Clash      | `clamp(44px, 5.5vw, 66px)`          | 1.02 |
| `h2`       | Clash      | `clamp(32px, 3.6vw, 46px)`          | 1.06 |
| `h3`       | Geist      | `22px`                              | 1.25 |
| `h4`       | Geist      | `17px`                              | 1.3  |
| `.lead`    | Geist      | `18px`                              | 1.55 |
| `.body`    | Geist      | `16px`                              | 1.6  |
| `.caption` | Geist      | `13px`                              | 1.5  |
| `.kicker`  | Geist Mono | `12px`, uppercase, `0.14em`, orange | -    |

> **Known exception - the hero `<h1>`.** The global `h1` rule
> (`font-size: clamp(44px, 5.5vw, 66px)`) is **unlayered** CSS and beats Tailwind
> utilities, so the hero `<h1>` sets its size with an **inline** style
> (`clamp(31px, 4.4vw, 56px)`) to win cleanly. Any per-page headline that needs a
> non-default size must do the same (inline or `!important`). Applies to `/miner`
> and `/news` H1s too.

---

## Spacing & layout

- 12-column grid · `max-width: 1280px` (page content `max-w-[1200px]`) ·
  gutters 24–32px.
- Section padding: `--section-y: clamp(80px, 10vw, 140px)` vertical. In the app
  the `Section` primitive uses `py-14 md:py-20` for the tighter landing rhythm.
- Spacing scale: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`.
- **Nav:** floating pill, fixed-top with 14px margin - never edge-to-edge.
- **Section transitions:** alternating `--pearl` / `--pearl-alt`, separated by a
  1px `--hairline` divider - never decorative.
- **Footer:** full-bleed `--midnight`.

## Radii

`8 / 16 / 24 / 999` (pill). Buttons are pill. Cards are 24. Big panels can use 24.

## Shadows

Three flavors, **always warm-tinted** - never gray drop shadows.

```
--shadow-card:  0 1px 2px rgba(26,26,26,0.04), 0 8px 24px rgba(225,50,2,0.05)
--shadow-lift:  0 24px 60px rgba(26,26,26,0.10)
--shadow-glow:  0 12px 32px rgba(240,117,1,0.22)   /* primary button */
```

## Cards

Solid `--pearl-alt` + `--hairline` border + `--shadow-card`. Hover lifts -4px to
`--shadow-lift`. The "liquid glass" surface (`.lg-surface`) is optional - reach
for it only when a hero or product card needs to feel layered. No bright-white
glass borders; no hard `1px solid black` anywhere.

## Motion

Restrained. **Max 4 animated elements visible at once.**

- Ease: `--ease-out: cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Durations: `--dur-fast 150ms` · `--dur-base 250ms` · `--dur-slow 600ms`.
- Reveals fade-up 700–800ms; hover lifts -2 to -4px; button hover -1px + glow.
- All motion respects `prefers-reduced-motion`.
- **Banned:** parallax, scroll-jacked reveals, cursor trails, particle JS,
  bounce easing.

## Iconography

Hand-rolled inline SVGs (`components/icons.tsx`) at **1.6–1.8px stroke**,
`stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, default stroke
`--ink`. No icon font, no emoji. The shipped set lives in `/assets/icons/`.

```svg
<svg width="22" height="22" viewBox="0 0 24 24" fill="none"
     stroke="#1A1A1A" stroke-width="1.6"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

## Imagery

The brand has no stock photography. When real imagery is needed, treat it: warm
white balance, 4–6% grain, lifted blacks. Until then, SVG placeholders in the
brand palette.

---

## Reconciliation (v3 - code is source of truth)

This doc was rebuilt from the external kit (`~/Downloads/Solarious Design System/`)
and **reconciled to the shipped code**, which is authoritative:

- **Typography is 3 families, not 2.** The shipped site loads **Clash Display**
  (`--font-display`, `layout.tsx`) for `h1`/`h2`/`.h-mega` headlines - chosen for
  stronger headline-vs-body contrast. The kit's "Geist for everything / 2 fonts"
  rule is superseded.
- Token values, the type scale, shadows, radii, and spacing are taken verbatim
  from `globals.css`.
- The hero `<h1>` inline-size exception is documented under _Typography_.

**History (for context only):** the kit previously dropped Montserrat / IBM Plex
Sans / Fraunces in favor of Geist-only. v3 reintroduces a single display face
(Clash Display) on top of Geist + Geist Mono.
