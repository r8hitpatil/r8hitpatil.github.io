import { ImageResponse } from "next/og";

// Required for `output: export` — generate this image once at build time.
export const dynamic = "force-static";

export const alt = "Rohit — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Themed link-preview card (cream + dark + purple accent), generated at build.
// Also serves as the Twitter/X summary_large_image automatically.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#F0EEE7",
          color: "#161616",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#6E56F8" }}>
          /// HELLO, WORLD!
        </div>
        <div style={{ display: "flex", fontSize: 132, fontWeight: 800, marginTop: 18 }}>
          Rohit
        </div>
        <div style={{ display: "flex", fontSize: 60, marginTop: 4 }}>
          Software Engineer
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 34, color: "#3a3a3a" }}>
          Full-stack developer — modern, scalable, performance-driven web apps.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 46,
            letterSpacing: 6,
            color: "#6E56F8",
          }}
        >
          + CODE. BUILD. IMPACT. +
        </div>
      </div>
    ),
    { ...size },
  );
}
