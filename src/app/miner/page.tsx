import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { VideoEmbed } from "@/components/VideoEmbed";
import { MinerSpecs } from "@/components/MinerSpecs";
import { ArrowRight } from "@/components/icons";
import { getDeviceImageUrl } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Solar Miner — Real Energy. On-Chain Proof. | Solarious",
  description:
    "The Solar Miner plugs directly into your solar panel, measures real electricity output and sends cryptographic proof on-chain. $SOLAR is issued in proportion to verified production.",
};

const SUMMARY_CHIPS = [
  "DC-only architecture",
  "220V independent",
  "Off-grid ready",
];

export default function MinerPage() {
  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />

      {/* ── Section 1 — hero ──────────────────────────────────────────── */}
      <section
        className="relative w-full pb-14 pt-[120px] md:pb-20 md:pt-[150px]"
        aria-label="Solar Miner"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-faint"
              >
                <Link href="/" className="transition hover:text-ink">
                  Home
                </Link>
                <span aria-hidden>›</span>
                <span className="text-ink">Miner</span>
              </nav>

              <h1 className="mt-6 text-[clamp(36px,5vw,60px)] font-semibold leading-[1.04]">
                Real Energy.{" "}
                <span className="orange-word">On-Chain Proof.</span>
              </h1>

              <p className="lead mt-6">
                Plugs directly into your solar panel. Measures real electricity
                output. Sends cryptographic proof on-chain. $SOLAR is issued in
                proportion to verified production.
              </p>

              <div className="mt-8">
                <Link href="/#whitelist" className="btn btn-primary btn-lg">
                  Join the Whitelist
                  <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Miner render — grounded with a warm glow + contact shadow. */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[8%] bottom-[6%] top-[24%] -z-0"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 55%, rgba(240,117,1,0.16) 0%, rgba(240,117,1,0) 70%)",
                  filter: "blur(8px)",
                }}
              />
              <img
                src={getDeviceImageUrl()}
                alt="The Solarius Solar Miner — a DC-only solar energy verification device."
                width={2000}
                height={1090}
                decoding="async"
                className="relative w-full"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[20%] bottom-[3%] -z-0 h-5 rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(26,26,26,0.20) 0%, rgba(26,26,26,0) 72%)",
                  filter: "blur(7px)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 — See How It Works ──────────────────────────────── */}
      <section
        className="relative w-full bg-pearl-alt py-14 md:py-20"
        aria-label="See how it works"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center">See How It Works</h2>
          <div className="mx-auto mt-8 max-w-[960px] md:mt-10">
            <VideoEmbed label="Solar Miner — how it works" />
          </div>
        </div>
      </section>

      {/* ── Section 3 — product summary ───────────────────────────────── */}
      <section
        className="relative w-full py-14 md:py-20"
        aria-label="Solar Miner summary"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="max-w-2xl text-balance">
            Solar Miner. Measures What Your{" "}
            <span className="orange-word">Panel Produces.</span>
          </h2>
          <p className="lead mt-6">
            Built for solar from the ground up. Plugs directly into your panel,
            reads real output, sends cryptographic proof on-chain.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 text-[13px] text-ink sm:grid-cols-3">
            {SUMMARY_CHIPS.map((c) => (
              <span key={c} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70"
                />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4 — Solarious Miner Specifications ────────────────── */}
      <section
        className="relative w-full bg-pearl-alt py-14 md:py-20"
        aria-label="Solarious Miner Specifications"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="text-center">Solarious Miner Specifications</h2>

          <div className="relative mx-auto mt-8 max-w-[520px] md:mt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[10%] bottom-[6%] top-[26%] -z-0"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 55%, rgba(240,117,1,0.12) 0%, rgba(240,117,1,0) 70%)",
                filter: "blur(8px)",
              }}
            />
            <img
              src={getDeviceImageUrl()}
              alt="The Solarius Solar Miner device."
              width={2000}
              height={1090}
              loading="lazy"
              decoding="async"
              className="relative w-full"
            />
          </div>

          <div className="mt-12">
            <MinerSpecs />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
