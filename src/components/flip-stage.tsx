"use client";

import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Entrance: the single portrait card blurs/eases in with the rest of the hero.
const cardEnter = {
  initial: { opacity: 0, y: 44, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: 0.95 },
  },
};

/**
 * Wraps the hero + about region and renders ONE portrait card, pinned to the
 * centre of the screen, that turns over as you scroll: grayscale (hero) face on
 * the front, red (about) face on the back. It is the same single element the
 * whole way down — "stitched" from the hero into the about section.
 *
 * Crawler-safe: the meaningful <Image> (with alt) is always in the DOM; only
 * transform/opacity animate.
 */
export function FlipStage({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  // The pinned card is shared on ALL viewports (one stitched portrait). On mobile
  // the About content stacks BELOW the photo, so the card must flip in and then
  // exit upward sooner — otherwise it would stay pinned over the About text.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Progress across the whole hero+about block.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  // Spring-smooth the scroll value so the FLIP eases (smooth, slightly delayed).
  // Moderately tight so rotate + scale stay in sync without lagging long enough
  // to overlap neighbouring sections on a fast scroll.
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 22,
    mass: 0.4,
    restDelta: 0.0005,
  });

  // Rotation AND scale ride the SAME spring so they flip + resize together
  // (simultaneously), in either scroll direction. On mobile the card rests much
  // SMALLER (a ~256px card, not the 400px full-bleed that swallows a phone screen
  // and hides the surrounding text) — so it reads as one portrait stitched between
  // the sections rather than a wall covering them.
  const rotateY = useTransform(progress, [0, 0.4], [0, 180]);
  const scale = useTransform(progress, [0, 0.4], [0.52, isMobile ? 0.64 : 1]);

  // Position + fade ride the RAW scroll so the card docks and LEAVES in lock-step
  // with the page — a lagging spring here let it overlap Skills on a fast scroll.
  // Mobile retimes it: land by ~0.34, hold, then exit up by ~0.6 so the photo is
  // gone before the stacked About bullets scroll into the centre of the screen.
  // Mobile: land the small card in its spacer (~progress 0.47), hold briefly,
  // then let it EXIT at roughly the natural scroll rate so it scrolls away glued
  // to its slot (no empty gap, no flying-off) as the bullets rise in below it.
  const y = useTransform(
    scrollYProgress,
    isMobile ? [0, 0.44, 0.5, 1] : [0, 0.5, 1],
    isMobile ? [246, 0, 0, -1120] : [246, 0, -822],
  );
  const fade = useTransform(
    scrollYProgress,
    isMobile ? [0.82, 0.9] : [0.82, 0.92],
    [1, 0],
  );
  // Camera-bracket frame lives HERE (with the photo) so it tracks it and can't
  // disconnect. It belongs to the HERO only: derive its fade from the card's `y`
  // (reliable) — it's 246 at rest and drops the moment you scroll, so the frame
  // vanishes before the photo lands in About (no square in the About section).
  const frameFade = useTransform(y, [246, 224], [1, 0]);

  // ── About-section terminal frame ──
  // Same idea as the hero frame, but driven by SCROLL VELOCITY: it disappears on
  // the slightest movement and only fades back in once the photo is STATIC
  // (scroll fully settled). Gated to the about region so it never shows in hero.
  const scrollVelocity = useVelocity(scrollYProgress);
  // 1 when motionless → 0 with even minimal movement (tent over a tiny dead-zone).
  const stillness = useTransform(
    scrollVelocity,
    [-0.03, -0.004, 0.004, 0.03],
    [0, 1, 1, 0],
  );
  // Smooth the settle so it eases in rather than snapping on.
  const stillnessSmooth = useSpring(stillness, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  });
  // Only valid once the photo has flipped to its red/about face and is near its
  // resting band (plateau 0.5→0.74), faded at the edges.
  const aboutBand = useTransform(
    scrollYProgress,
    [0.42, 0.5, 0.74, 0.82],
    [0, 1, 1, 0],
  );
  const aboutFrameOpacity = useTransform(
    [aboutBand, stillnessSmooth],
    ([b, s]: number[]) => b * s,
  );

  return (
    <div ref={stageRef} className="relative">
      {children}

      {/* About shadow — BEHIND the card (z-20) so the photo sits on top and only
          the soft shadow that spills past the photo edges shows. Same `y` +
          velocity-fade as before, so it eases in only once scroll has settled. */}
      <motion.div
        aria-hidden
        style={{ opacity: aboutFrameOpacity }}
        className="pointer-events-none fixed inset-0 z-20 hidden items-center justify-center md:flex"
      >
        <motion.div style={{ y }}>
          <AboutShadow />
        </motion.div>
      </motion.div>

      {/* Camera-bracket frame — same centred layer + same `y` as the card, so it
          stays glued to the photo; fades out the moment you scroll (hero only).
          Wears the SAME `cardEnter` entrance as the photo so the frame and the
          portrait blur/rise in together instead of the empty box popping in
          first. (FrameBrackets isn't preserve-3d, so the blur filter is safe.) */}
      <motion.div
        aria-hidden
        style={{ opacity: frameFade }}
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
      >
        <motion.div variants={cardEnter} initial="initial" animate="animate">
          <motion.div style={{ y }}>
            <FrameBrackets />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The single pinned flip card.
          NOTE: the entrance (which animates `filter: blur`) must stay OFF the
          preserve-3d element — a `filter` flattens the 3D context and kills
          backface-visibility, leaving the grayscale face stuck on. */}
      <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center">
        <motion.div style={{ opacity: fade }}>
          <motion.div variants={cardEnter} initial="initial" animate="animate">
            <motion.div
              style={{
                rotateY,
                scale,
                y,
                transformPerspective: 1200,
                willChange: "transform",
              }}
              className="relative h-[470px] w-[400px] [transform-style:preserve-3d]"
            >
              {/* Front face — grayscale (hero) */}
              <div className="absolute inset-0 overflow-hidden rounded-[3px] [backface-visibility:hidden]">
                <Image
                  src="/assets/pf1.png"
                  alt="Portrait of Rohit, full-stack developer and software engineer"
                  fill
                  priority
                  sizes="400px"
                  className="object-cover grayscale"
                />
              </div>

              {/* Back face — red (about), pre-rotated so it reads correctly */}
              <div
                className="absolute inset-0 overflow-hidden rounded-[3px] [backface-visibility:hidden]"
                style={{ transform: "rotateY(180deg)" }}
              >
                <Image
                  src="/assets/pf1.png"
                  alt=""
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}

// Camera-bracket frame sized to the hero photo (scale-0.52 of the 400×470 card).
function FrameBrackets() {
  const corners = [
    "left-0 top-0 border-l-2 border-t-2",
    "right-0 top-0 border-r-2 border-t-2",
    "left-0 bottom-0 border-l-2 border-b-2",
    "right-0 bottom-0 border-r-2 border-b-2",
  ];
  return (
    <div className="relative h-[245px] w-[208px]" aria-hidden>
      <div className="absolute -inset-3 border border-dashed border-[#161616]/35" />
      {corners.map((pos) => (
        <span
          key={pos}
          className={`absolute h-4 w-4 border-[#161616] ${pos}`}
          style={{ margin: "-12px" }}
        />
      ))}
      <span className="absolute -right-3 top-1/3 h-2 w-2 -translate-y-1/2 translate-x-1/2 bg-[#161616]" />
      <span className="absolute -right-3 top-2/3 h-2 w-2 -translate-y-1/2 translate-x-1/2 bg-[#161616]" />
    </div>
  );
}

// Very subtle elevation shadow for the About photo (rendered BEHIND the card so
// only the soft halo spilling past the photo edges shows). Same size + rounding
// as the card; the shadow does the talking, the box itself is transparent.
function AboutShadow() {
  return (
    <div
      aria-hidden
      className="h-[470px] w-[400px] rounded-[3px]"
      style={{
        boxShadow:
          "0 22px 48px -18px rgba(22,22,22,0.22), 0 6px 18px -10px rgba(22,22,22,0.12)",
      }}
    />
  );
}
