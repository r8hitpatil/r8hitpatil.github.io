import Image from "next/image";
import { WaveText } from "@/components/wave-text";

const HASHNODE_HOST = "r8hitpatil.hashnode.dev";
const BLOG_URL = `https://${HASHNODE_HOST}`;

type Post = {
  title: string;
  brief: string;
  url: string;
  publishedAt: string | null;
  coverImage?: { url: string } | null;
};

// Local, free-to-use cover art (grayscaled in the card to match the theme).
// Reused as a default when a live Hashnode post has no cover of its own.
const COVER_FALLBACKS = ["/assets/blog/sky.jpg", "/assets/blog/wave.jpg"];

// Shown only if the Hashnode API is unreachable (e.g. offline / sandbox).
const FALLBACK_POSTS: Post[] = [
  {
    title: "Building Real-Time Apps with Socket.io",
    brief:
      "A guide to using WebSockets in React, covering full-duplex communication and room-based messaging.",
    url: BLOG_URL,
    publishedAt: null,
    coverImage: { url: "/assets/blog/sky.jpg" },
  },
  {
    title: "Nest.js for Beginners",
    brief:
      "An introduction to NestJS, covering its modular structure and where it helps compared to plain Express.",
    url: BLOG_URL,
    publishedAt: null,
    coverImage: { url: "/assets/blog/wave.jpg" },
  },
];

async function getPosts(): Promise<Post[]> {
  const query = `
    query Posts($host: String!) {
      publication(host: $host) {
        posts(first: 6) {
          edges {
            node {
              title
              brief
              url
              publishedAt
              coverImage { url }
            }
          }
        }
      }
    }`;

  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: { host: HASHNODE_HOST } }),
      // ISR: re-fetch at most once an hour, keeps posts in the server HTML.
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK_POSTS;

    const json = await res.json();
    const edges = json?.data?.publication?.posts?.edges ?? [];
    const posts: Post[] = edges
      .map((e: { node: Post }) => e?.node)
      .filter(Boolean);
    return posts.length ? posts : FALLBACK_POSTS;
  } catch {
    return FALLBACK_POSTS;
  }
}

export async function Blogs() {
  const posts = (await getPosts()).slice(0, 2).map((post, i) => ({
    ...post,
    // Give every card a cover — use the post's own, else a themed local image.
    coverImage: post.coverImage?.url
      ? post.coverImage
      : { url: COVER_FALLBACKS[i % COVER_FALLBACKS.length] },
  }));

  return (
    <section id="blogs" className="w-full bg-[#F0EEE7] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="pixel-flat [font-size:clamp(40px,5.5vw,68px)]">
          <WaveText text="Blogs" by="letter" amplitude={8} stagger={0.07} duration={1.5} />
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.url + post.title} post={post} />
          ))}

          {/* CTA card */}
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[460px] flex-col justify-between overflow-hidden rounded-[3px] bg-[#0E0E0E] p-8 text-white transition-transform hover:scale-[0.99]"
          >
            {/* Subtle dark cover texture */}
            <Image
              src="/assets/blog/stones.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/55" />

            <p className="relative max-w-[330px] text-[clamp(26px,2.4vw,34px)] font-medium leading-[1.18] tracking-tight">
              See how I share what I build, learn, and ship&mdash; explore the
              blog
            </p>
            <span className="font-pixel-ui relative flex items-center gap-3 text-[13px]">
              View All Posts
              <span className="flex h-9 w-9 items-center justify-center rounded-[3px] ring-1 ring-white/25 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="group relative h-[460px] overflow-hidden rounded-[3px] bg-zinc-800">
      {post.coverImage?.url ? (
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500 via-zinc-700 to-zinc-950" />
      )}

      {/* Scrim for legible text — heavier at the bottom where the title/brief sit */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0" />

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-[24px] font-semibold leading-[1.15] tracking-tight">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-snug text-white/70">
          {post.brief}
        </p>
      </div>

      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={post.title}
      />
    </article>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
