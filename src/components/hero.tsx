"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { WaveText } from "@/components/wave-text";

// Smooth ease-out (expo-like) for that polished, 60fps feel.
const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#6E56F8";

// Subtle blur-in, brisk but smooth. "Software" first…
const word1V = {
  initial: { opacity: 0, filter: "blur(12px)", y: -20 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: 0.15 },
  },
};

// …then "Engineer" follows closely, so it reads as one flowing cascade.
const word2V = {
  initial: { opacity: 0, filter: "blur(12px)", y: -20 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay: 0.4 },
  },
};

// …then everything else eases UP into place together (same blur ease).
const restV = {
  initial: { opacity: 0, y: 44, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: 0.95 },
  },
};

// Top chrome (header + decorations) fades in early from the top.
const chromeV = {
  initial: { opacity: 0, y: -12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: 0.2 },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress: 0 while the hero fills the screen → 1 as it scrolls out.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven choreography (transform/opacity only — crawler-safe).
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const footerY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const chromeFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-screen min-h-[760px] w-full overflow-hidden bg-[#F0EEE7] text-[#161616]"
    >
      {/* ───────────── Decorative blueprint layer (non-content) ───────────── */}
      <motion.div style={{ opacity: chromeFade }} className="pointer-events-none absolute inset-0 z-0">
        {/* Dotted grid — top right */}
        <motion.div
          variants={chromeV}
          initial="initial"
          animate="animate"
          aria-hidden
          className="absolute right-[6%] top-[16%] h-[110px] w-[230px]"
          style={{
            backgroundImage: `radial-gradient(${ACCENT}88 1.5px, transparent 1.7px)`,
            backgroundSize: "15px 15px",
            maskImage:
              "linear-gradient(120deg, #000 30%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(120deg, #000 30%, transparent 95%)",
          }}
        />

        {/* Blueprint node-path — left of headline */}
        <motion.div
          variants={chromeV}
          initial="initial"
          animate="animate"
          aria-hidden
          className="absolute left-[5%] top-[52%] hidden lg:block"
        >
          <BlueprintLines />
        </motion.div>

        {/* Small handle marker — right, near the bolt */}
        <motion.div
          variants={chromeV}
          initial="initial"
          animate="animate"
          aria-hidden
          className="absolute right-[8%] top-[60%] hidden lg:block"
        >
          <HandleMarker />
        </motion.div>

        {/* Subtle crosshair — top right (replaces the old menu glyph) */}
        <motion.div
          variants={chromeV}
          initial="initial"
          animate="animate"
          aria-hidden
          className="absolute right-8 top-7 md:right-12"
        >
          <Crosshair />
        </motion.div>
      </motion.div>

      {/* ───────────── Top bar (HELLO WORLD / MENU.TXT) ───────────── */}
      <motion.header
        style={{ opacity: chromeFade }}
        className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-8 py-7 md:px-12"
      >
        <motion.div variants={chromeV} initial="initial" animate="animate">
          <p className="font-pixel-ui text-[12px] tracking-[0.08em] text-[#161616]">
            <span style={{ color: ACCENT }}>///</span> HELLO, WORLD!
          </p>
          <div className="mt-3.5 flex items-center gap-3" aria-hidden>
            <span
              className="h-[15px] w-[15px] rounded-full"
              style={{ background: ACCENT }}
            />
            <span className="h-[15px] w-[15px] rounded-full bg-[#161616]" />
            <span className="h-[15px] w-[15px] rounded-full border-[1.5px] border-[#161616]" />
            <span className="ml-1.5 h-[1.5px] w-12 bg-[#161616]/40" />
          </div>
        </motion.div>
      </motion.header>

      {/* ───────────── Center group: headline + tagline + portrait ───────────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-24 pt-32">
        {/* headlineY = parallax drift on scroll */}
        <motion.div style={{ y: headlineY }} className="relative">
          {/* Chrome star — top-left */}
          <motion.div
            variants={restV}
            initial="initial"
            animate="animate"
            className="pointer-events-none absolute -left-[128px] -top-[104px] h-[138px] w-[138px] select-none"
          >
            <Image
              src="/assets/chrome-2.png"
              alt=""
              fill
              priority
              sizes="138px"
              className="object-contain"
            />
          </motion.div>

          {/* Chrome lightning bolt — bottom-right */}
          <motion.div
            variants={restV}
            initial="initial"
            animate="animate"
            className="pointer-events-none absolute -bottom-[86px] -right-[128px] h-[138px] w-[138px] select-none"
          >
            <Image
              src="/assets/chrome-1.png"
              alt=""
              fill
              priority
              sizes="138px"
              className="object-contain"
            />
          </motion.div>

          <h1
            className="pixel-3d text-center uppercase leading-[1.4] tracking-[0.04em] [font-size:clamp(34px,7vw,96px)]"
            style={{
              color: "#16141d",
              // Saturated light-purple extrude (depth only; face stays dark)
              textShadow: `1px 1px 0 #BBA4FF, 2px 2px 0 #A488FF, 3px 3px 0 #8E6CFB, 4px 4px 0 #7A55F6, 5px 5px 0 #6645EE`,
            }}
          >
            <motion.span
              variants={word1V}
              initial="initial"
              animate="animate"
              className="block"
            >
              <WaveText
                text="Software"
                by="letter"
                amplitude={7}
                stagger={0.08}
                duration={1.5}
              />
            </motion.span>
            <motion.span
              variants={word2V}
              initial="initial"
              animate="animate"
              className="block"
            >
              <WaveText
                text="Engineer"
                by="letter"
                amplitude={7}
                stagger={0.08}
                duration={1.5}
                delayOffset={0.64}
              />
            </motion.span>
          </h1>

          {/* Tagline (absolute so it doesn't shift the portrait spacer) */}
          <motion.div
            variants={restV}
            initial="initial"
            animate="animate"
            aria-hidden
            className="font-pixel-ui absolute left-1/2 top-full mt-6 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-[15px] tracking-[0.18em] text-[#161616] [-webkit-text-stroke:0.5px_#161616]"
          >
            <Plus />
            <span>
              CODE. BUILD.{" "}
              <span style={{ color: ACCENT }} className="[-webkit-text-stroke:0.5px_#6E56F8]">
                IMPACT.
              </span>
            </span>
            <Plus />
          </motion.div>
        </motion.div>

        {/* Spacer — the portrait AND its camera-bracket frame are rendered by
            <FlipStage> (so the frame tracks the photo and can't disconnect).
            This invisible block just keeps the headline placed. */}
        <div aria-hidden className="h-[245px] w-[208px] shrink-0" />
      </div>

      {/* ───────────── Footer row: copyright + tagline (parallax) ───────────── */}
      <motion.div
        style={{ y: footerY }}
        className="absolute inset-x-0 bottom-8 z-20 px-8 md:px-12"
      >
        <motion.div
          variants={restV}
          initial="initial"
          animate="animate"
          className="mx-auto flex max-w-[1180px] items-end justify-between"
        >
          <span className="font-pixel-ui uppercase leading-none tracking-tight text-[#161616] [font-size:clamp(20px,1.9vw,26px)] [-webkit-text-stroke:0.85px_#161616]">
            <span className="[font-family:var(--font-sans)] align-[-0.06em] mr-0.5 [-webkit-text-stroke:0px]">
              ©
            </span>
            2026
          </span>
          <span className="font-pixel-ui hidden uppercase tracking-tight text-[#161616] [font-size:clamp(20px,1.9vw,26px)] [-webkit-text-stroke:0.85px_#161616] lg:block">
            /Creating Since <span style={{ color: ACCENT }}>2023</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────── small FX (all inline, decorative) ───────────────────────── */

function Crosshair() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <path d="M10 0v20M0 10h20" stroke="#161616" strokeWidth="1" opacity="0.35" />
      <rect
        x="7"
        y="7"
        width="6"
        height="6"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function Plus() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M6 0v12M0 6h12" stroke={ACCENT} strokeWidth="1.5" />
    </svg>
  );
}

function BlueprintLines() {
  return (
    <svg
      width="150"
      height="120"
      viewBox="0 0 150 120"
      fill="none"
      className="text-[#161616]"
      aria-hidden
    >
      {/* stacked short bars */}
      <rect x="0" y="0" width="70" height="3" fill="currentColor" opacity="0.5" />
      <rect x="14" y="8" width="56" height="3" fill="currentColor" opacity="0.35" />
      <rect x="28" y="16" width="42" height="3" fill="currentColor" opacity="0.2" />
      {/* node path */}
      <path
        d="M10 40 H70 V96 H120"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.55"
      />
      <circle cx="10" cy="40" r="3.5" fill={ACCENT} />
      <circle cx="70" cy="96" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="120" cy="96" r="3.5" fill="#161616" />
    </svg>
  );
}

function HandleMarker() {
  return (
    <svg width="70" height="40" viewBox="0 0 70 40" fill="none" aria-hidden>
      <rect x="0" y="14" width="12" height="12" fill="none" stroke="#161616" strokeWidth="1.5" />
      <rect x="3" y="17" width="6" height="6" fill={ACCENT} />
      <path d="M12 20 H70" stroke="#161616" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

