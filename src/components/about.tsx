import { WaveText } from "@/components/wave-text";
import { PIXEL_DEPTH, SketchUnderline } from "@/components/sketch-underline";

const ACCENT = "#6E56F8";

export function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#F0EEE7] py-28 text-[#161616]"
    >
      {/* ───────────── Decorative blueprint layer (non-content) ───────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Dotted grid — top right */}
        <div
          className="absolute right-[7%] top-[4%] hidden h-[120px] w-[230px] lg:block"
          style={{
            backgroundImage: `radial-gradient(${ACCENT}80 1.5px, transparent 1.7px)`,
            backgroundSize: "15px 15px",
            maskImage: "linear-gradient(120deg, #000 25%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(120deg, #000 25%, transparent 92%)",
          }}
        />
        {/* Small dot column — left of the bio */}
        <div
          className="absolute left-[2%] top-[32%] hidden h-[150px] w-[42px] lg:block"
          style={{
            backgroundImage: `radial-gradient(#16161680 1.4px, transparent 1.6px)`,
            backgroundSize: "12px 12px",
            maskImage: "linear-gradient(160deg, #000 20%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(160deg, #000 20%, transparent 95%)",
            opacity: 0.5,
          }}
        />
        {/* Scattered pixel squares */}
        <span className="absolute bottom-[14%] left-[3.5%] hidden h-[10px] w-[10px] bg-[#161616] lg:block" />
        <span
          className="absolute bottom-[10%] right-[4%] hidden h-[12px] w-[12px] lg:block"
          style={{ background: ACCENT }}
        />
      </div>

      {/* ───────────── Section chrome: status dots (L) + code glyph (R) ───────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-8 z-10 mx-auto flex max-w-[1180px] items-center justify-between px-8 md:px-12">
        <div className="flex items-center gap-3" aria-hidden>
          <span className="h-[15px] w-[15px] rounded-full" style={{ background: ACCENT }} />
          <span className="h-[15px] w-[15px] rounded-full bg-[#161616]" />
          <span className="h-[15px] w-[15px] rounded-full border-[1.5px] border-[#161616]" />
        </div>
        <CodeGlyph />
      </div>

      {/* ───────────── Main layout ───────────── */}
      <div className="relative z-[1] mx-auto mt-12 flex max-w-[1180px] items-stretch justify-between gap-14 px-8 md:px-12">
        {/* ── Left column: heading + bracketed bio + arrow ── */}
        <div className="flex w-[290px] shrink-0 flex-col justify-center">
          <div className="relative inline-block w-fit">
            <h2
              className="pixel-flat [font-size:clamp(54px,7vw,94px)]"
              style={{ color: "#16141d", textShadow: PIXEL_DEPTH }}
            >
              <WaveText text="Hey!" by="letter" amplitude={12} stagger={0.12} duration={1.5} />
            </h2>
            {/* Purple hand-drawn underline */}
            <SketchUnderline uid="hey" />
          </div>

          {/* Bracketed bio box — a "selection frame" with corner crop-marks
              + diagonal handle squares (matches the reference). */}
          <div className="relative mt-14 w-[300px]">
            <CornerBrackets />
            <p className="px-6 py-6 text-[17px] leading-[1.7] text-[#1f1f1f]">
              I&rsquo;m Rohit, a full-stack developer based in India, currently
              building scalable web apps and the APIs behind them at{" "}
              <span style={{ color: ACCENT }}>Shellel</span>.
            </p>
          </div>
        </div>

        {/* ── Center column: spacer — the portrait is the pinned <FlipStage>
            card (red/back face) that lands here as you scroll. ── */}
        <div aria-hidden className="h-[470px] w-[400px] shrink-0" />

        {/* ── Right column: bulleted paragraphs + Get Started ── */}
        <div className="flex w-[360px] shrink-0 flex-col justify-center gap-8">
          <BulletPara>
            I&rsquo;m a software engineer with a strong focus on building{" "}
            <HL>modern</HL>, <HL>scalable</HL>, and <HL>performance-driven</HL> web
            applications, front to back.
          </BulletPara>

          <BulletPara>
            I work across <HL>React</HL> &amp; <HL>Angular</HL> on the frontend and{" "}
            <HL>Node.js / NestJS </HL> APIs on the backend &mdash; with real-time
            features, caching, and AI built in.
          </BulletPara>

          <a
            href="#contact"
            className="group font-pixel-ui mt-2 inline-flex items-center gap-4 text-[16px] tracking-tight text-[#161616]"
          >
            <span className="border-b border-dotted border-[#161616]/60 pb-0.5">
              Get Started
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-[6px] ring-1 ring-black/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              {/* sparkle ticks */}
              <span aria-hidden className="absolute -right-1.5 -top-2">
                <Sparkle />
              </span>
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── pieces ───────────────────────── */

// Purple-highlighted keyword (real text, just coloured).
function HL({ children }: { children: React.ReactNode }) {
  return <span style={{ color: ACCENT }}>{children}</span>;
}

// Paragraph with a left rule + purple diamond marker at the top.
function BulletPara({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative pl-6">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-[calc(100%-0.4rem)] w-px bg-[#161616]/25"
      />
      <span
        aria-hidden
        className="absolute -left-[3px] top-1 h-[9px] w-[9px] rotate-45"
        style={{ background: ACCENT }}
      />
      <p className="text-[17px] leading-[1.6] text-[#1f1f1f]">{children}</p>
    </div>
  );
}

// Selection-frame crop-marks around the bio: an L bracket at each corner (offset
// slightly outward) plus filled handle squares on the TL→BR diagonal.
function CornerBrackets() {
  const corners = [
    "-left-2 -top-2 border-l-[1.5px] border-t-[1.5px]",
    "-right-2 -top-2 border-r-[1.5px] border-t-[1.5px]",
    "-left-2 -bottom-2 border-l-[1.5px] border-b-[1.5px]",
    "-right-2 -bottom-2 border-r-[1.5px] border-b-[1.5px]",
  ];
  return (
    <span aria-hidden>
      {corners.map((pos) => (
        <span key={pos} className={`absolute h-4 w-4 border-[#161616]/75 ${pos}`} />
      ))}
      {/* selection handles — top-left & bottom-right */}
      <span className="absolute -left-[10px] -top-[10px] h-[7px] w-[7px] bg-[#161616]" />
      <span className="absolute -right-[10px] -bottom-[10px] h-[7px] w-[7px] bg-[#161616]" />
    </span>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 6 L9 2 M5 9 L12 4 M7 12 L14 8" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CodeGlyph() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none" aria-hidden>
      <path
        d="M11 4 L4 11 L11 18 M23 4 L30 11 L23 18 M19 3 L15 19"
        stroke="#161616"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
