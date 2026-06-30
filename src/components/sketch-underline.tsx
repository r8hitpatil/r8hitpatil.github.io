const ACCENT = "#6E56F8";

// Saturated light-purple extrude used on pixel section titles (depth only; the
// letter face stays dark). Apply inline as `textShadow` on a `.pixel-flat` h2.
export const PIXEL_DEPTH =
  "1px 1px 0 #BBA4FF, 2px 2px 0 #A488FF, 3px 3px 0 #8E6CFB, 4px 4px 0 #7A55F6";

// Hand-drawn purple underline — a turbulence-displaced scribble (main pass +
// lighter second pass + a small tail flick) so it reads as an actual marker
// stroke. `uid` keeps each instance's filter id unique. Deterministic → SSR-safe.
export function SketchUnderline({ uid }: { uid: string }) {
  const fid = `sk-underline-${uid}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      className="absolute -bottom-3 left-0 h-4 w-[92%]"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={fid} x="-8%" y="-40%" width="116%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.08"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`} fill="none" stroke={ACCENT} strokeLinecap="round">
        {/* main stroke, slightly overshooting both ends */}
        <path d="M1 11 C45 6, 96 15, 150 9 S193 8, 199 12" strokeWidth="3" />
        {/* second quick pass, lower + lighter */}
        <path d="M9 16 C70 13, 122 18, 191 14" strokeWidth="1.9" opacity="0.6" />
        {/* tiny tail flick at the end */}
        <path d="M186 9 l12 -3" strokeWidth="1.6" opacity="0.5" />
      </g>
    </svg>
  );
}
