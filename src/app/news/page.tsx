import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { posts } from "@/lib/news";

export const metadata: Metadata = {
  title: "News | Solarious",
  description:
    "Announcements and updates from Solarious — the Proof-of-Energy Layer-1 for verified renewable production.",
};

export default function NewsPage() {
  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />

      {/* Header band. */}
      <section
        className="relative w-full pb-10 pt-[120px] md:pt-[150px]"
        aria-label="News"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-faint"
          >
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-ink">News</span>
          </nav>
          <h1 className="mt-6">News</h1>
        </div>
      </section>

      {/* Article list. */}
      <section className="relative w-full pb-14 md:pb-20" aria-label="Articles">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--hairline)] bg-white/40 transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover}
                  alt=""
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="mono text-[11px] uppercase tracking-[0.16em] text-orange">
                    {post.date}
                  </span>
                  <h3 className="mt-3 text-[clamp(18px,1.8vw,21px)] tracking-[-0.015em] transition-colors group-hover:text-orange">
                    {post.title}
                  </h3>
                  <p className="body mt-3 line-clamp-3 text-[14.5px]">
                    {post.excerpt}
                  </p>
                  <span className="mono mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-orange">
                    Read More
                    <span
                      aria-hidden
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
