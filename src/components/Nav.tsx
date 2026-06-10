"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight } from "@/components/icons";

/**
 * Floating glass header. Desktop shows the in-page section anchors; the primary
 * CTA "Join the Whitelist" is locked (brief Part 7) and scrolls to the final
 * form. On mobile the links collapse into a hamburger sheet that also carries
 * the /miner and /news routes — previously the site had no mobile navigation.
 *
 * Section anchors use the `/#id` form so they resolve from /miner and /news too,
 * navigating home and scrolling to the section.
 */

const SECTIONS = [
  { label: "Problem", href: "/#problem" },
  { label: "Proof", href: "/#proof" },
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Docs", href: "#" },
];

const MOBILE_EXTRA = [
  { label: "Miner", href: "/miner" },
  { label: "News", href: "/news" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-shell">
      <nav className="nav">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Solarious home"
        >
          <Logo
            variant="gradient"
            className="h-6 w-auto"
            width={98}
            height={24}
            priority
          />
        </Link>

        <div className="hidden items-center gap-9 text-[13px] text-ink-muted md:flex">
          {SECTIONS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="transition hover:text-ink"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/#whitelist" className="btn btn-primary btn-sm">
            Join the Whitelist
            <ArrowRight />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet. */}
      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-[1280px] rounded-[var(--r-lg)] border border-white/55 bg-[rgba(247,239,232,0.85)] p-3 shadow-[0_8px_24px_rgba(26,26,26,0.08)] backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {[...SECTIONS, ...MOBILE_EXTRA].map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center rounded-[var(--r-sm)] px-4 text-[15px] text-ink transition hover:bg-white/50"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 8h16M4 16h16"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
