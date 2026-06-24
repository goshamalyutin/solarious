"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, LinkedIn } from "@/components/icons";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { cn } from "@/lib/utils";

/**
 * Team — restyled from the original solarious.us pattern into our pearl brand.
 *
 * Centered header → category filter tabs (active = orange liquid glass) → a
 * horizontal snap carousel of member cards with arrow controls and pagination
 * dots. Mirrors the source site's tabbed-slider structure exactly; the visual
 * language (pearl, hairlines, Clash/Geist/Geist-Mono, single orange accent) is
 * ours.
 *
 * Photos: each member's headshot is expected under /public/assets/team. None
 * ship in this fork yet, so every member falls back to a neutral person
 * silhouette (NOT initials). Drop a file at the documented path and set the
 * member's `photo` to swap a real photo in.
 */

interface Member {
  name: string;
  role: string;
  /** Public path to a headshot, e.g. "/assets/team/jack-samatov.jpg". */
  photo?: string;
  /** Optional extra classes on the photo to tweak crop focus, e.g. "object-top". */
  photoClass?: string;
  linkedin?: string;
}

interface Group {
  category: string;
  members: Member[];
}

const GROUPS: Group[] = [
  {
    category: "Board of Directors",
    members: [
      {
        name: "Nils Tharandt",
        photo: "/assets/team/nils-tharandt.png",
        role: "Board Director",
        linkedin: "https://www.linkedin.com/in/nils-tharandt-ortiz-b07b1016",
      },
      {
        name: "Myron Duckens",
        photo: "/assets/team/myron-duckens.jpeg",
        photoClass: "object-top",
        role: "Board Director",
        linkedin: "https://www.linkedin.com/in/myron-duckens-a8440212",
      },
      {
        name: "Jeremy Roach",
        photo: "/assets/team/jeremy-roach.jpg",
        role: "Board Director",
        linkedin: "https://www.linkedin.com/in/jeremy-r-30708a74",
      },
      {
        name: "David Robson",
        photo: "/assets/team/david-robson.jpg",
        role: "Board Director",
        linkedin: "https://www.linkedin.com/in/davidrobsong",
      },
    ],
  },
  {
    category: "Core Team",
    members: [
      {
        name: "Jack Samatov",
        photo: "/assets/team/jack-samatov.jpg",
        role: "CEO",
        linkedin: "https://www.linkedin.com/in/jack-samatov",
      },
      {
        name: "Begzod Gapparov",
        photo: "/assets/team/begzod-gapparov.jpg",
        role: "Protocol Engineering",
        linkedin: "https://www.linkedin.com/in/bekzod-gapparov-404b87184",
      },
      {
        name: "Isroil Orifjonov",
        photo: "/assets/team/isroil-orifjonov.jpg",
        role: "VP of Blockchain Engineering",
        linkedin: "https://www.linkedin.com/in/cryptorator",
      },
      {
        name: "Ivanov Sergey",
        photo: "/assets/team/ivanov-sergey.png",
        role: "Game Development",
      },
      {
        name: "Dmitriy",
        photo: "/assets/team/dmitriy.webp",
        role: "Blockchain Developer",
      },
      {
        name: "Vitaliy Opryshko",
        photo: "/assets/team/vitaliy-opryshko.jpeg",
        role: "Developer",
        linkedin: "https://www.linkedin.com/in/vitaliyopryshko",
      },
    ],
  },
  {
    category: "Growth & Marketing",
    members: [
      {
        name: "Andrey Prusov",
        photo: "/assets/team/andrey-prusov.jpg",
        role: "Head of Marketing",
        linkedin: "https://www.linkedin.com/in/andreiprusov",
      },
      {
        name: "George Malutin",
        photo: "/assets/team/george-malutin.jpg",
        role: "Content Management",
        linkedin: "https://www.linkedin.com/in/george-malyutin-633390326",
      },
      {
        name: "Rishabh Gupta",
        photo: "/assets/team/rishabh-gupta.jpg",
        role: "Growth Manager",
        linkedin: "https://www.linkedin.com/in/rishabh1992",
      },
      {
        name: "Vikash Malik",
        photo: "/assets/team/vikash-malik.jpg",
        role: "Token Architect",
        linkedin: "https://www.linkedin.com/in/vikash-malik",
      },
      {
        name: "Japneet Singh",
        photo: "/assets/team/japneet-singh.jpg",
        role: "Tokenomics & MVP",
        linkedin: "https://www.linkedin.com/in/japneet-singh-anand",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    members: [
      {
        name: "Benjamin Wiles",
        photo: "/assets/team/benjamin-wiles.png",
        role: "Legal",
        linkedin: "https://www.linkedin.com/in/benjaminwiles",
      },
      {
        name: "Nathan Gaidai",
        photo: "/assets/team/nathan-gaidai.jpeg",
        role: "Compliance Officer",
        linkedin: "https://www.linkedin.com/in/1776",
      },
      {
        name: "Kurt Watkins",
        photo: "/assets/team/kurt-watkins.png",
        role: "Lawyer",
        linkedin: "https://www.linkedin.com/in/kurtmwatkins",
      },
      {
        name: "Chris Duncan",
        photo: "/assets/team/chris-duncan.png",
        role: "Cayman Lawyer",
        linkedin: "https://www.linkedin.com/in/chris-duncan-97520053",
      },
      {
        name: "Lars Peeters",
        photo: "/assets/team/lars-peeters.png",
        role: "KYC Collector",
      },
    ],
  },
  {
    category: "Advisors",
    members: [
      {
        name: "Gaurav Dubey",
        photo: "/assets/team/gaurav-dubey.jpg",
        role: "TDEFI Accelerator Advisor",
        linkedin: "https://www.linkedin.com/in/gauravdubeylive",
      },
    ],
  },
];

/** Neutral photo-style placeholder — a generic person silhouette, not initials. */
function Avatar({ member }: { member: Member }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        width={120}
        height={120}
        alt={member.name}
        className={cn(
          "h-28 w-28 rounded-full object-cover",
          member.photoClass,
        )}
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[var(--hairline)] bg-pearl-alt"
    >
      <svg viewBox="0 0 64 64" className="h-[72%] w-[72%] text-ink-faint/35">
        <circle cx="32" cy="23" r="11" fill="currentColor" />
        <path
          d="M11 57c0-11.6 9.4-19 21-19s21 7.4 21 19z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="relative flex w-[220px] shrink-0 snap-start flex-col items-center gap-6 rounded-[var(--r-lg)] border border-[var(--hairline)] bg-white/40 p-6 text-center sm:w-[236px]">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="absolute right-4 top-4 text-ink-faint transition-colors hover:text-orange"
        >
          <LinkedIn />
        </a>
      )}
      <Avatar member={member} />
      {/* gap-6 (above) spaces the photo from this text block; gap-2 spaces the
          role from the name. Using flex gap — NOT mt-* — because globals.css has
          unlayered `p`/`h3 { margin: 0 }` rules that override Tailwind margins. */}
      <div className="flex flex-col items-center gap-2">
        <p className="mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          {member.role}
        </p>
        <h3 className="text-[17px] tracking-[-0.01em]">{member.name}</h3>
      </div>
    </article>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] bg-white/50 text-ink-muted transition-colors hover:border-[color-mix(in_srgb,var(--orange)_45%,transparent)] hover:text-orange"
    >
      <ArrowRight className={dir === "prev" ? "rotate-180" : undefined} />
    </button>
  );
}

function Carousel({ members }: { members: Member[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Measure page count on mount and whenever the track resizes. ResizeObserver
  // fires once on observe, which covers the initial measurement; setting state
  // from its callback is the sanctioned external-subscription pattern. (The
  // Carousel is keyed by tab, so a filter change re-mounts it at page 0.)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth === 0) return;
      setPageCount(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
      setPage(Math.round(el.scrollLeft / el.clientWidth));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function scrollByPage(dir: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }

  function goToPage(p: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: p * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={() => {
          const el = trackRef.current;
          if (el && el.clientWidth)
            setPage(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5"
      >
        {members.map((m) => (
          <MemberCard key={m.name} member={m} />
        ))}
      </div>

      {/* Controls: prev arrow · pagination dots · next arrow. */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <ArrowButton dir="prev" onClick={() => scrollByPage(-1)} />
        <div className="flex items-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === page}
              onClick={() => goToPage(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === page
                  ? "w-6 bg-orange"
                  : "w-2 bg-[var(--ink-faint)]/30 hover:bg-[var(--ink-faint)]/50",
              )}
            />
          ))}
        </div>
        <ArrowButton dir="next" onClick={() => scrollByPage(1)} />
      </div>
    </div>
  );
}

export function Team() {
  const [tab, setTab] = useState(0);

  return (
    <section
      id="team"
      aria-label="Team"
      className="relative w-full bg-pearl py-[var(--section-y)]"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Centered header. */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <span className="kicker">Team</span>
          </div>
          <h2 className="mt-5 text-balance">
            Engineers, validators and operators behind{" "}
            <span className="orange-word">Solarious</span>
          </h2>
          <p className="lead mx-auto mt-5">
            The people building Proof-of-Energy infrastructure across protocol,
            validation, growth and compliance.
          </p>
        </div>

        {/* Category filter tabs — active is orange liquid glass, rest are pearl pills. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {GROUPS.map((g, i) =>
            i === tab ? (
              <GlassButton
                key={g.category}
                size="sm"
                glassColor="rgba(240,117,1,0.55)"
                onClick={() => setTab(i)}
                className="text-ink ring-1 ring-[var(--orange)] shadow-[0_0_16px_rgba(240,117,1,0.30)]"
              >
                {g.category}
              </GlassButton>
            ) : (
              <button
                key={g.category}
                type="button"
                onClick={() => setTab(i)}
                className="rounded-full border border-[var(--hairline)] bg-white/40 px-4 py-2 text-[13.5px] text-ink-muted transition-colors hover:border-[color-mix(in_srgb,var(--orange)_40%,transparent)] hover:text-ink"
              >
                {g.category}
              </button>
            ),
          )}
        </div>

        {/* Slider — keyed by tab so it re-mounts and resets cleanly on filter. */}
        <div className="mt-12">
          <Carousel key={tab} members={GROUPS[tab].members} />
        </div>
      </div>
    </section>
  );
}
