"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const group = {
  animate: { transition: { delayChildren: 0.95, staggerChildren: 0.08 } },
};

const item = {
  initial: { opacity: 0, y: 32, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// Boxy terminal/CLI chip — mono, sharp corners, prompt prefix, corner brackets,
// invert on hover.
const btnClass =
  "font-pixel-ui group relative inline-flex items-center gap-2 rounded-[3px] border-[1.5px] border-[#161616] bg-[#F4F2EC] px-6 py-3 text-[13px] tracking-tight text-[#161616] transition-colors duration-150 hover:bg-[#161616] hover:text-[#F0EEE7] active:translate-y-[1px]";

function CliButton({
  href,
  children,
  download,
}: {
  href: string;
  children: string;
  download?: boolean;
}) {
  return (
    <motion.a
      variants={item}
      href={href}
      download={download}
      className={btnClass}
    >
      {/* corner brackets — top-left & bottom-right */}
      <span
        aria-hidden
        className="absolute left-[3px] top-[3px] h-2 w-2 border-l-[1.5px] border-t-[1.5px] border-current opacity-60"
      />
      <span
        aria-hidden
        className="absolute bottom-[3px] right-[3px] h-2 w-2 border-b-[1.5px] border-r-[1.5px] border-current opacity-60"
      />
      <span aria-hidden className="opacity-50 transition-opacity group-hover:opacity-100">
        &gt;
      </span>
      <span>{children}</span>
      <span aria-hidden className="animate-pulse opacity-70">
        _
      </span>
    </motion.a>
  );
}

export function QuickNav() {
  return (
    <>
      {/* Bottom-right: resume + contact */}
      <motion.nav
        aria-label="Quick links"
        variants={group}
        initial="initial"
        animate="animate"
        className="fixed bottom-6 right-8 z-50 flex flex-col items-end gap-2 md:right-12"
      >
        <CliButton href="/resume.pdf" download>
          Resume
        </CliButton>
        <CliButton href="#contact">Contact Me</CliButton>
      </motion.nav>
    </>
  );
}
