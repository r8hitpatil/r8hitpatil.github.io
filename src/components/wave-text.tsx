"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

/**
 * Stuttery retro-arcade text: each unit (word or letter) bobs up/down in a
 * looping wave, but with STEPPED motion (quantised, no smooth glide) and
 * per-unit RANDOMNESS — every letter gets its own amplitude, speed, step-count
 * and a little delay jitter, so the wave looks organic instead of uniform.
 *
 * Randomness is deterministic (seeded by index + text), so server and client
 * render identically (no hydration mismatch). The full string stays real text
 * (aria-label on wrapper, aria-hidden units) for SEO/a11y. Inter-word spaces are
 * normal collapsible text nodes so wrapped lines don't get indented.
 *
 * NOTE: intentionally ignores prefers-reduced-motion — requested decorative
 * effect and the user's OS has reduce-motion on.
 */

// Deterministic pseudo-random in [0,1) from a numeric seed (stable SSR↔client).
function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// EaseInOut shape quantised into `steps` chunks → stuttery, stepped motion.
function steppedEase(steps: number) {
  return (t: number) => {
    const e = 0.5 - Math.cos(t * Math.PI) / 2;
    return Math.round(e * steps) / steps;
  };
}

export function WaveText({
  text,
  by = "word",
  className,
  amplitude = 3,
  stagger = 0.09,
  duration = 1.7,
  delayOffset = 0,
  stepped = true,
}: {
  text: string;
  by?: "word" | "letter";
  className?: string;
  amplitude?: number;
  stagger?: number;
  duration?: number;
  /** Phase shift so a wave can flow continuously across multiple WaveTexts. */
  delayOffset?: number;
  /** Quantise motion into discrete frames for a stuttery, retro feel. */
  stepped?: boolean;
}) {
  const seedBase = text.length * 2.7 + 11;

  const Bob = ({ children, i }: { children: string; i: number }) => {
    const s = seedBase + (i + 1) * 17.3 + children.charCodeAt(0);
    const amp = amplitude * (0.5 + rnd(s) * 1.0); // 0.5x – 1.5x height
    const dur = duration * (0.78 + rnd(s + 4.2) * 0.6); // 0.78x – 1.38x speed
    const jitter = rnd(s + 9.1) * 0.2; // small extra delay
    const steps = 3 + Math.floor(rnd(s + 13.7) * 4); // 3..6 steps
    return (
      <motion.span
        aria-hidden
        className="inline-block will-change-transform"
        animate={{ y: [0, -amp, 0] }}
        transition={{
          duration: dur,
          repeat: Infinity,
          ease: stepped ? steppedEase(steps) : "easeInOut",
          delay: i * stagger + delayOffset + jitter,
        }}
      >
        {children}
      </motion.span>
    );
  };

  if (by === "letter") {
    let idx = 0;
    return (
      <span className={className} aria-label={text}>
        {Array.from(text).map((ch, i) =>
          /\s/.test(ch) ? (
            <span key={i} aria-hidden>
              {" "}
            </span>
          ) : (
            <Bob key={i} i={idx++}>
              {ch}
            </Bob>
          ),
        )}
      </span>
    );
  }

  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <Bob i={i}>{w}</Bob>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
