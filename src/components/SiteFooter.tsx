import Link from "next/link";
import { Logo } from "@/components/Logo";

/**
 * Shared site footer (home, /miner, /news). Copy and columns per brief §2.14;
 * News links to /news and Solar Miner links to /miner per Part 5 wiring. Other
 * destinations are `#` placeholders until those surfaces exist — the brief's own
 * convention for not-yet-built links. No TGE / launch-date line.
 */

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "Investor Materials", href: "#" },
      { label: "News", href: "/news" },
    ],
  },
  {
    title: "Protocol",
    links: [
      { label: "Proof-of-Energy", href: "/#proof" },
      { label: "Explorer", href: "#" },
      { label: "API Docs", href: "#" },
      { label: "Validator Program", href: "#" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Solar Miner", href: "/miner" },
      { label: "Verdex Wallet", href: "#" },
      { label: "CryptoCat", href: "#" },
      { label: "Mining Pool", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Website Terms", href: "#" },
      { label: "Risk Disclosure", href: "#" },
      { label: "Token Disclaimer", href: "#" },
      { label: "Hardware Terms", href: "#" },
      { label: "Community Guidelines", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full bg-midnight text-white/80">
      <div className="relative mx-auto max-w-[1200px] px-5 py-[var(--section-y)] md:px-8">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-24">
          <div className="max-w-sm">
            <Logo
              variant="white"
              className="h-9 w-auto"
              width={148}
              height={36}
            />
            <p className="mt-7 text-[15px] leading-[1.7] text-white/55">
              Solarius is building Proof-of-Energy infrastructure for verified
              renewable production and environmental-commodity settlement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 sm:gap-x-14 lg:gap-x-20">
            {COLUMNS.map((col) => (
              <FooterCol key={col.title} column={col} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Proof-of-Energy Layer-1
          </div>
          <div className="mono shrink-0 text-[12px] text-white/40">
            © 2026 Solarious. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ column }: { column: FooterColumn }) {
  return (
    <div>
      <div className="mono text-[11px] uppercase tracking-[0.18em] text-white/45">
        {column.title}
      </div>
      <ul className="mt-5 space-y-3.5 text-[14px]">
        {column.links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-white/70 transition hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
