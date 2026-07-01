import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

// Self-hosted pixel monospace (Departure Mono) for small UI text.
const pixelUi = localFont({
  src: "../fonts/DepartureMono-Regular.woff2",
  variable: "--font-pixel-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rohit - Software Engineer",
    template: "%s · Rohit",
  },
  description:
    "Rohit is a full-stack developer building modern, scalable, and performance-driven web apps and the APIs behind them — React, Angular, Node.js, and NestJS.",
  keywords: [
    "Rohit",
    "Software Engineer",
    "Full-Stack Developer",
    "NestJS",
    "Node.js",
    "React",
    "Angular",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rohit" }],
  creator: "Rohit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Rohit - Software Engineer",
    description:
      "Full-stack developer building modern, scalable, performance-driven web apps and APIs.",
    siteName: "Rohit",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit - Software Engineer",
    description:
      "Full-stack developer building modern, scalable, performance-driven web apps and APIs.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${pixel.variable} ${pixelUi.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
