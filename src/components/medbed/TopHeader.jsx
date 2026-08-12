import React, { useState, useMemo } from "react";
import { MODALITIES } from "@/data/modalities";
import TierBadge from "@/components/medbed/TierBadge";

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

const EXPORTS = [
  { k: "prd", label: "📄 Full PRD PDF" },
  { k: "spec", label: "📊 Modality Spec Sheet" },
  { k: "zone", label: "🗺 Zone Map PDF" },
  { k: "protocol", label: "💾 Protocol JSON" },
];

export default function TopHeader({ onExport, session, remaining, nominal, onSearchSelect }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [exportOpen, setExportOpen] = useState(false);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MODALITIES.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.code.toLowerCase().includes(q) ||
      m.spec.toLowerCase().includes(q) ||
      m.mechanism.join(" ").toLowerCase().includes(q) ||
      m.source.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

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
      <div className="relative flex-1 h-full overflow-hidden flex items-center" style={{ background: "var(--red-dark)" }}>
        <div className="marquee-track font-display text-white" style={{ fontSize: 9, letterSpacing: "0.1em", padding: "4px 0" }}>
          {TICKER_TEXT}
          {TICKER_TEXT}
        </div>
        {session && (
          <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1 rounded-sm" style={{ background: "var(--gold)", color: "#000" }}>
            <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#000" }} />
            <span className="font-display font-bold" style={{ fontSize: 10, letterSpacing: "0.1em" }}>SESSION ACTIVE</span>
            <span className="font-mono font-bold" style={{ fontSize: 12 }}>{fmt(remaining)}</span>
          </div>
        )}
        {nominal && (
          <div
            className="absolute z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm fade-in"
            style={{ background: "var(--green)", color: "#000", left: "calc(50% + 120px)" }}
          >
            <span className="font-display font-bold" style={{ fontSize: 9, letterSpacing: "0.08em" }}>● ALL SYSTEMS NOMINAL</span>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 px-4 h-full" style={{ minWidth: 260 }}>
        {/* Search */}
        <div className="relative flex items-center">
          <button
            onClick={() => setSearchOpen((o) => !o)}
            className="font-display rounded-sm transition-colors hover:bg-elevated"
            style={{ fontSize: 12, padding: "5px 8px", color: "var(--gold)", border: "1px solid var(--gold-dim)", background: "transparent" }}
            title="Search modalities"
          >
            🔍
          </button>
          {searchOpen && (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modalities..."
              className="font-body outline-none rounded-sm ml-1"
              style={{ width: 170, fontSize: 11, padding: "5px 8px", background: "var(--bg-panel)", border: "1px solid var(--gold-dim)", color: "#fff" }}
            />
          )}
          {searchOpen && query && results.length > 0 && (
            <div
              className="absolute top-full right-0 mt-1 w-80 rounded-sm overflow-hidden z-[106]"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--gold)", maxHeight: 320, overflowY: "auto" }}
            >
              {results.map((m) => (
                <button
                  key={m.code}
                  onClick={() => { onSearchSelect(m.code); setSearchOpen(false); setQuery(""); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-left hover:bg-card transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <span className="inline-block w-2 h-2 rounded-full flex-none" style={{ background: m.color }} />
                  <span className="font-display" style={{ fontSize: 10, color: m.color, width: 36 }}>{m.code}</span>
                  <span className="font-body flex-1 truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{m.name}</span>
                  <TierBadge tierCode={m.tierCode} />
                </button>
              ))}
            </div>
          )}
        </div>

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

        {/* Export dropdown */}
        <div className="relative">
          <button
            onClick={() => setExportOpen((o) => !o)}
            className="font-display rounded-sm transition-colors hover:brightness-110"
            style={{ background: "var(--gold)", color: "#000", fontSize: 10, padding: "5px 10px", letterSpacing: "0.08em" }}
          >
            ⬇ EXPORT
          </button>
          {exportOpen && (
            <>
              <div className="fixed inset-0 z-[104]" onClick={() => setExportOpen(false)} />
              <div
                className="absolute top-full right-0 mt-1 w-56 rounded-sm overflow-hidden z-[105] fade-in"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--gold)" }}
              >
                {EXPORTS.map((o) => (
                  <button
                    key={o.k}
                    onClick={() => { onExport(o.k); setExportOpen(false); }}
                    className="w-full text-left font-body px-3 py-2 hover:bg-card transition-colors"
                    style={{ fontSize: 10, color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}
                  >
                    {o.label}
                  </button>
                ))}
                <div className="font-mono text-center py-1.5" style={{ fontSize: 8, color: "var(--text-muted)" }}>
                  Opens ZARP Export Center
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}