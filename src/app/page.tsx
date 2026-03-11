import Link from "next/link";

// ─── VALIENTE® Design Language System ───────────────────────────────────────
// Background:  #DDDBD6  (warm ecru / parchment)
// Primary:     #FF1A00  (VALIENTE red — all text, icons, borders)
// Black:       #000000  (cinematic dark sections)
// Display:     Syne     (editorial grotesque — GT Pressura spirit)
// Mono:        Space Mono (industrial monospace — GT Pressura stack)
// Type:        ALL CAPS · tracking -0.04em · weight 800 for display · 400 for body
// Radius:      0 — zero everywhere
// Shadows:     none
// Dividers:    rgba(255, 26, 0, 0.18)
// ─────────────────────────────────────────────────────────────────────────────

const RED = "#FF1A00";
const BG = "#DDDBD6";
const BLACK = "#000000";
const DIVIDER = "rgba(255, 26, 0, 0.18)";

// Rotated circle CTA — signature VALIENTE® element
function CircleCTA({ href }: { href: string }) {
  return (
    <Link href={href} className="relative w-[72px] h-[72px] flex items-center justify-center group flex-shrink-0">
      <svg
        viewBox="0 0 72 72"
        className="absolute inset-0 w-full h-full"
        style={{ animation: "spin 12s linear infinite" }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 36,36 m -26,0 a 26,26 0 1,1 52,0 a 26,26 0 1,1 -52,0"
          />
        </defs>
        <circle cx="36" cy="36" r="29" fill="none" stroke={RED} strokeWidth="1" />
        <text
          style={{
            fontSize: "7.5px",
            fill: RED,
            fontFamily: "var(--font-mono)",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#circlePath">GET IN TOUCH · GET IN TOUCH ·</textPath>
        </text>
      </svg>
      {/* Arrow icon center */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
      >
        <path
          d="M10 10L4 4M4 4h6M4 4v6"
          stroke={RED}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main style={{ backgroundColor: BG, color: RED, minHeight: "100vh" }}>

      {/* ── NAV ── Vertical left menu · Center wordmark · Right circle CTA */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between"
        style={{ padding: "12px 20px", backgroundColor: "transparent" }}
      >
        {/* Left — stacked vertical nav links (VALIENTE® signature) */}
        <div className="flex flex-col gap-[3px]">
          {["ABOUT", "PROJECTS", "WORK", "VALUES", "TEAM", "CONTACT"].map((item) => (
            <Link
              key={item}
              href="#"
              className="transition-opacity duration-200 hover:opacity-40"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: RED,
                lineHeight: "1.6",
              }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Center — wordmark */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "15px",
            fontWeight: "800",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: RED,
          }}
        >
          STUDIO OS®
        </span>

        {/* Right — GET IN TOUCH circle CTA */}
        <CircleCTA href="/projects" />
      </nav>

      {/* ── HERO ── Signature VALIENTE® structure: sparse parchment + centered tagline + bottom info bar */}
      <section
        className="relative flex flex-col"
        style={{ minHeight: "100vh", backgroundColor: BG }}
      >
        {/* Centered tagline — the only element in the upper 85vh */}
        <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingTop: "120px" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            — PROJECT MANAGEMENT
          </p>
        </div>

        {/* Bottom info bar */}
        <div
          className="flex items-center justify-between px-5 py-5"
          style={{ borderTop: `1px solid ${DIVIDER}` }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            FOR INDUSTRIAL DESIGNERS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SCROLL TO VIEW MORE ↓
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em" }}>
            ©2026
          </span>
        </div>
      </section>

      {/* ── REEL / VIDEO SECTION ── Cinematic black + red play button + stacked display text */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: "100vh", backgroundColor: BLACK }}
      >
        {/* Play button (centered) */}
        <div className="flex flex-col items-center gap-4 z-10">
          <div
            className="flex items-center justify-center"
            style={{
              width: "80px",
              height: "80px",
              border: `1px solid ${RED}`,
              borderRadius: "50%",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4.5l10 5.5-10 5.5V4.5z" fill={RED} />
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: RED, opacity: 0.6 }}>
            PLAY
          </span>
        </div>

        {/* Stacked display text — bottom left, bleeds out */}
        <div className="absolute bottom-10 left-5">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "clamp(52px, 9vw, 128px)",
              letterSpacing: "-0.04em",
              lineHeight: "0.85",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            BRAVE<br />
            BRANDS<br />
            DEEP<br />
            DIVES<br />
            BOLD<br />
            CHANGE
          </h2>
        </div>
      </section>

      {/* ── ABOUT ── Parchment · Large editorial body copy */}
      <section style={{ backgroundColor: BG, padding: "80px 20px 80px" }}>
        <div
          className="flex items-baseline justify-between"
          style={{ marginBottom: "48px" }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: RED }}>
            WORLDWIDE BASED
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: RED }}>
            EST (2026)
          </span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "700",
            fontSize: "clamp(22px, 3.5vw, 42px)",
            letterSpacing: "-0.02em",
            lineHeight: "1.1",
            textTransform: "uppercase",
            color: RED,
            maxWidth: "900px",
          }}
        >
          AT&nbsp;&nbsp;STUDIO OS,&nbsp;&nbsp;WE DON&apos;T JUST MANAGE
          PROJECTS&nbsp;—&nbsp;WE GIVE INDUSTRIAL DESIGNERS THE
          CONTROL&nbsp;&nbsp;THEY DESERVE.
        </p>
      </section>

      {/* ── SERVICES / FEATURES ── Numbered list — VALIENTE® style */}
      <section
        style={{
          backgroundColor: BG,
          borderTop: `1px solid ${DIVIDER}`,
          padding: "80px 20px",
        }}
      >
        {/* Section heading */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "800",
            fontSize: "clamp(40px, 7vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: "0.9",
            textTransform: "uppercase",
            color: RED,
            marginBottom: "64px",
          }}
        >
          HOW&nbsp;WE&apos;LL<br />
          SHINE&nbsp;—<br />
          TOGETHER
        </h2>

        {/* Numbered service rows */}
        <div>
          {[
            { num: "01", label: "PROJECT BOARD", desc: "Brief → Concept → Development → Handoff" },
            { num: "02", label: "CLIENT BRIEFINGS", desc: "Every brief attached to its project" },
            { num: "03", label: "DELIVERABLES", desc: "Checklists, files, renderings — all in one place" },
            { num: "04", label: "MATERIALS", desc: "Suppliers and specs, never lost again" },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-baseline gap-6 group"
              style={{
                padding: "20px 0",
                borderBottom: `1px solid ${DIVIDER}`,
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: RED,
                  opacity: 0.45,
                  flexShrink: 0,
                }}
              >
                ({item.num})
              </span>
              <span
                className="flex-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(16px, 2.5vw, 28px)",
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: RED,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.05em",
                  color: RED,
                  opacity: 0.55,
                  textAlign: "right",
                  maxWidth: "260px",
                }}
              >
                → {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── "Enter Studio" — text-based, no button */}
      <section
        style={{
          backgroundColor: BG,
          borderTop: `1px solid ${DIVIDER}`,
          padding: "80px 20px",
        }}
      >
        <div className="flex items-end justify-between">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "800",
              fontSize: "clamp(48px, 10vw, 160px)",
              letterSpacing: "-0.04em",
              lineHeight: "0.85",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            ENTER<br />
            STUDIO
          </h2>

          {/* Arrow CTA — text + arrow, no button */}
          <Link
            href="/projects"
            className="flex items-center gap-3 group"
            style={{ marginBottom: "8px" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: RED,
                opacity: 0.7,
              }}
              className="group-hover:opacity-100 transition-opacity"
            >
              NO SETUP REQUIRED
            </span>
            <span style={{ fontSize: "20px", color: RED }}>→</span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── Minimal, parchment, mono text */}
      <footer
        className="flex items-center justify-between px-5 py-5"
        style={{
          backgroundColor: BG,
          borderTop: `1px solid ${DIVIDER}`,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: RED,
            opacity: 0.5,
          }}
        >
          STUDIO OS — BUILT FOR INDUSTRIAL DESIGNERS
        </span>
        <Link
          href="/projects"
          className="transition-opacity hover:opacity-100"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: RED,
            opacity: 0.5,
          }}
        >
          OPEN DASHBOARD →
        </Link>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: RED,
            opacity: 0.5,
          }}
        >
          BARCELONA 2026
        </span>
      </footer>

    </main>
  );
}
