"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import "lenis/dist/lenis.css";

/**
 * Buttery, inertia-based smooth scrolling — the "Framer feel".
 *
 * We use Lenis (smooth scroll engine) driven by GSAP's ticker so the rAF loop
 * is unified with GSAP. Lenis scrolls the REAL document (it doesn't transform a
 * wrapper), so `position: fixed` (the hero→about flip card) and Framer Motion's
 * `useScroll` keep working, and content stays server-rendered for crawlers.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Respect users who ask for reduced motion — no smoothing for them.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1, // lower = smoother / longer glide
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Drive Lenis from GSAP's ticker (unified timing, no double rAF loop).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Make in-page anchor links (QuickNav: #skills, #blogs, #contact, …) glide.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
