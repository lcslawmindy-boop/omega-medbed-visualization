import React from "react";
import { MODALITIES } from "@/data/modalities";

export default function SceneOverlay({ activeCode, onHighlight, onView, bootStage }) {
  return (
    <>
      {/* Top-left badge */}
      <div
        className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-sm bg-card border border-soft backdrop-blur"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="font-display text-gold" style={{ fontSize: 10, letterSpacing: "0.1em" }}>
          ZA-MB-Ω
        </span>
        <span className="font-mono text-muted mx-2" style={{ fontSize: 9 }}>|</span>
        <span className="font-mono" style={{ fontSize: 9, color: "var(--text-primary)" }}>18 MODALITIES ACTIVE</span>
        <span className="font-mono text-muted mx-2" style={{ fontSize: 9 }}>|</span>
        <span className="font-mono" style={{ fontSize: 9, color: "var(--green)" }}>BFAC+ACE ● ONLINE</span>
      </div>

      {/* Boot sequence stage banner */}
      {bootStage && (
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 rounded-sm fade-in"
          style={{ background: "rgba(0,4,8,0.88)", border: "1px solid var(--gold)", backdropFilter: "blur(4px)" }}
        >
          <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
          <span className="font-mono text-muted" style={{ fontSize: 8, letterSpacing: "0.12em" }}>BOOT</span>
          <span className="font-display text-gold" style={{ fontSize: 10, letterSpacing: "0.14em" }}>{bootStage}</span>
        </div>
      )}

      {/* Highlight modality panel (top-right) */}
      <div
        className="absolute top-3 right-3 z-10 p-2 rounded-sm bg-card border border-soft backdrop-blur"
        style={{ borderColor: "var(--border)", maxWidth: 260 }}
      >
        <div className="font-mono text-muted uppercase mb-1.5" style={{ fontSize: 8, letterSpacing: "0.12em" }}>
          Highlight Modality
        </div>
        <div className="grid grid-cols-6 gap-1">
          {MODALITIES.map((m) => {
            const active = m.code === activeCode;
            return (
              <button
                key={m.code}
                onClick={() => onHighlight(m.code)}
                title={`${m.code} — ${m.name}`}
                className="font-display rounded-sm transition-all"
                style={{
                  fontSize: 8.5,
                  letterSpacing: "0.04em",
                  padding: "3px 0",
                  background: active ? m.color : "var(--bg-elevated)",
                  color: active ? "#000" : m.color,
                  border: `1px solid ${active ? m.color : "var(--border)"}`,
                  boxShadow: active ? `0 0 8px ${m.color}` : "none",
                }}
              >
                {m.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom-left view controls */}
      <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
        {[
          { k: "reset", label: "⟲ Reset" },
          { k: "front", label: "📐 Front" },
          { k: "side", label: "📐 Side" },
          { k: "top", label: "📐 Top" },
        ].map((b) => (
          <button
            key={b.k}
            onClick={() => onView(b.k)}
            className="font-mono rounded-sm bg-card border border-soft hover:border-[var(--gold)] transition-colors"
            style={{ fontSize: 9.5, padding: "5px 9px", color: "var(--text-primary)", height: 28, borderColor: "var(--border)" }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Device classification badge (permanent, non-dismissible) */}
      <div
        className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-full"
        style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}
      >
        <span className="font-body" style={{ fontSize: 8, letterSpacing: "0.04em", opacity: 0.95 }}>
          CLASS III CONCEPT · FDA 21 CFR 880 · NOT FOR CLINICAL USE
        </span>
      </div>
    </>
  );
}