import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be served by GitHub Pages (no Node server).
  output: "export",
  // Hide the on-screen dev indicator (the floating Next.js logo).
  devIndicators: false,
  images: {
    // Required for static export — no server to run Image Optimization at runtime.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.hashnode.com" },
      { protocol: "https", hostname: "**.hashnode.com" },
    ],
  },
};

export default nextConfig;
