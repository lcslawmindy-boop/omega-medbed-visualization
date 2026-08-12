import React from "react";
import { MODALITY_BY_CODE, MODALITIES } from "@/data/modalities";

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-sm px-3 py-2 bg-card border border-soft" style={{ borderColor: "var(--border)" }}>
      <div className="font-mono text-muted uppercase" style={{ fontSize: 8, letterSpacing: "0.1em" }}>
        {label}
      </div>
      <div className="font-mono mt-0.5" style={{ fontSize: 11, color: accent || "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

export default function SpecPanel({ activeCode }) {
  const m = MODALITY_BY_CODE[activeCode] || MODALITIES[0];
  const idx = MODALITIES.findIndex((x) => x.code === m.code) + 1;

  return (
    <aside
      className="fixed right-0 top-[60px] bottom-[40px] z-50 flex flex-col bg-panel border-l border-soft"
      style={{ width: 320, borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-soft" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-muted uppercase" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
            Live Spec · Modality {String(idx).padStart(2, "0")}/18
          </span>
          <span
            className="font-mono px-1.5 py-0.5 rounded-sm"
            style={{ fontSize: 8, background: "rgba(16,185,129,0.12)", color: "var(--green)", letterSpacing: "0.08em" }}
          >
            ● ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }} />
          <span className="font-display font-bold" style={{ fontSize: 18, letterSpacing: "0.06em", color: m.color }}>
            {m.code}
          </span>
          <span className="font-body text-muted" style={{ fontSize: 11 }}>
            {m.name}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto scroll-dark px-4 py-3 fade-in" key={m.code}>
        <div className="space-y-3">
          <div>
            <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.12em" }}>
              Specification
            </div>
            <div className="font-mono leading-relaxed" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>
              {m.spec}
            </div>
          </div>

          <div>
            <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.12em" }}>
              Description
            </div>
            <p className="font-body leading-relaxed text-muted" style={{ fontSize: 11 }}>
              {m.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Stat label="Category" value={m.category} />
            <Stat label="Tier" value={m.tier} accent="var(--gold)" />
          </div>

          <div>
            <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.12em" }}>
              Evidence Source
            </div>
            <div className="font-mono leading-relaxed px-3 py-2 rounded-sm bg-card border border-soft" style={{ fontSize: 9.5, borderColor: "var(--border)", color: "var(--text-muted)" }}>
              {m.source}
            </div>
          </div>

          {/* Mini telemetry strip */}
          <div>
            <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.12em" }}>
              BFAC Telemetry
            </div>
            <div className="space-y-1.5">
              {[
                { l: "Dose integrity", v: "NOMINAL", c: "var(--green)" },
                { l: "Safety interlock", v: "ARMED", c: "var(--green)" },
                { l: "Phase lock", v: "SYNC", c: "var(--gold)" },
                { l: "Field amplitude", v: "IN RANGE", c: "var(--green)" },
              ].map((row) => (
                <div key={row.l} className="flex items-center justify-between font-mono" style={{ fontSize: 9.5 }}>
                  <span className="text-muted">{row.l}</span>
                  <span style={{ color: row.c }}>● {row.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}