// Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production (.env.local) to your
// real domain — it drives metadataBase, canonical, robots, sitemap, and OG URLs.
// `||` (not `??`) so an empty env var ("NEXT_PUBLIC_SITE_URL=") also falls back.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://r8hitpatil.github.io";
