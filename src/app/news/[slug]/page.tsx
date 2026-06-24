import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { getPost, posts } from "@/lib/news";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "News | Solarious" };
  return {
    title: `${post.title} | Solarious`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative w-full bg-pearl text-ink">
      <Nav />

      <article className="relative w-full pb-14 pt-[120px] md:pb-20 md:pt-[150px]">
        <div className="mx-auto max-w-[720px] px-5 md:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mono flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink-faint"
          >
            <Link href="/" className="transition hover:text-ink">
              Home
            </Link>
            <span aria-hidden>›</span>
            <Link href="/news" className="transition hover:text-ink">
              News
            </Link>
          </nav>

          <span className="mono mt-6 block text-[11px] uppercase tracking-[0.16em] text-orange">
            {post.date}
          </span>
          <h1 className="mt-3">{post.title}</h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt=""
            className="mt-8 aspect-video w-full rounded-[var(--r-lg)] border border-[var(--hairline)] object-cover"
            decoding="async"
          />

          <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-ink-muted">
            <p>{post.excerpt}</p>
            {/* TODO: real article body. */}
            <p>
              Full article coming soon. This post is part of the Solarious news
              feed — announcements and updates from the Proof-of-Energy Layer-1
              for verified renewable production.
            </p>
          </div>

          <div className="mt-12">
            <Link
              href="/news"
              className="mono inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-orange"
            >
              <span aria-hidden>←</span>
              Back to News
            </Link>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
