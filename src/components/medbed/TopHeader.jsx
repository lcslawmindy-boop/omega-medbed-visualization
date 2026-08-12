import React from "react";

const TICKER_TEXT =
  "⬛ CLASS III MEDICAL DEVICE CONCEPT — FDA 21 CFR PART 880 — RESEARCH PROTOTYPE ONLY  ·  NOT APPROVED FOR CLINICAL USE  ·  NOT MEDICAL ADVICE  ·  18 SIMULTANEOUS MODALITIES UNDER BFAC+ACE AI CONTROL  ·  CONCEPT — SUBJECT TO MANUFACTURER VALIDATION  ·  ZA-ENG-MB-OMEGA-A-PRD REV A · 2026-08-12  ·  ";

function ZarpMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="3" cy="8" r="2" fill="#C9A84C" />
      <circle cx="13" cy="4" r="2" fill="#C9A84C" />
      <circle cx="13" cy="12" r="2" fill="#C9A84C" />
      <line x1="3" y1="8" x2="13" y2="4" stroke="#C9A84C" strokeWidth="1" />
      <line x1="3" y1="8" x2="13" y2="12" stroke="#C9A84C" strokeWidth="1" />
      <line x1="13" y1="4" x2="13" y2="12" stroke="#8A6E2E" strokeWidth="1" />
    </svg>
  );
}

export default function TopHeader({ onExport }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center bg-panel border-b border-soft"
      style={{ height: 60, borderColor: "var(--border)" }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 px-4 h-full" style={{ minWidth: 320 }}>
        <ZarpMark />
        <div className="flex flex-col leading-tight">
          <span className="font-display font-bold text-gold" style={{ fontSize: 16, letterSpacing: "0.04em" }}>
            OMEGA MEDBED
          </span>
          <span className="font-display text-muted" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
            ZA-MB-Ω
          </span>
        </div>
        <div className="h-8 w-px mx-2" style={{ background: "var(--border)" }} />
        <span className="font-body text-muted uppercase hidden md:inline" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
          Zenith Apex Research Division
        </span>
      </div>

      {/* CENTER TICKER */}
      <div className="flex-1 h-full overflow-hidden flex items-center" style={{ background: "var(--red-dark)" }}>
        <div className="marquee-track font-display text-white" style={{ fontSize: 9, letterSpacing: "0.1em", padding: "4px 0" }}>
          {TICKER_TEXT}
          {TICKER_TEXT}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 px-4 h-full" style={{ minWidth: 260 }}>
        <span className="hidden lg:flex items-center gap-1.5 font-mono" style={{ fontSize: 10, color: "var(--green)" }}>
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
          BFAC ACTIVE
        </span>
        <button
          className="font-display border rounded-sm hover:bg-elevated transition-colors"
          style={{ borderColor: "var(--gold)", color: "var(--gold)", fontSize: 10, padding: "5px 10px", letterSpacing: "0.08em" }}
        >
          📄 PRD DOC
        </button>
        <button
          onClick={onExport}
          className="font-display rounded-sm transition-colors hover:brightness-110"
          style={{ background: "var(--gold)", color: "#000", fontSize: 10, padding: "5px 10px", letterSpacing: "0.08em" }}
        >
          ⬇ EXPORT
        </button>
      </div>
    </header>
  );
}