/**
 * News posts as a typed array in code — no CMS (brief Part 4). Seed content is
 * the Simcat → Solarious rebrand announcement; bodies are placeholders until
 * real article text lands (TODO).
 */

export interface NewsPost {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  cover: string;
  /** Placeholder body for now (TODO: real article text). */
  body?: string;
}

export const posts: NewsPost[] = [
  {
    slug: "simcat-rebrands-to-solarious",
    date: "MAY 2026",
    title:
      "Simcat Officially Rebrands to Solarious and Transitions to a Layer 1",
    excerpt:
      "We are excited to officially announce that Simcat is rebranding to Solarious and transitioning into a Proof-of-Energy Layer-1 — connecting measured solar production with verifiable network activity.",
    cover: "/news/simcat-rebrand.svg",
  },
];

export function getPost(slug: string): NewsPost | undefined {
  return posts.find((p) => p.slug === slug);
}
