import React from "react";
import DeviceVisual from "./DeviceVisual";
import ClassifiedOverlay from "./ClassifiedOverlay";

export default function DeviceCard({ d }) {
  const locked = !!d.classified;
  return (
    <div
      className="bs-card bs-fade-up overflow-hidden relative"
      style={{
        background: `linear-gradient(140deg, ${d.accent}1A 0%, var(--bg-panel) 55%)`,
        border: `1px solid ${d.accent}55`,
      }}
    >
      {locked && <ClassifiedOverlay />}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr",
          filter: locked ? "blur(7px)" : "none",
          userSelect: locked ? "none" : "auto",
          pointerEvents: locked ? "none" : "auto",
        }}
      >
        <div className="relative p-2" style={{ background: "#070B14", borderBottom: "1px solid var(--border)" }}>
          <span
            className="font-mono absolute rounded"
            style={{ top: 8, left: 10, fontSize: 8, padding: "3px 7px", background: "var(--gold, #C9A84C)", color: "#0B0B0B", letterSpacing: "0.08em" }}
          >
            {d.code}
          </span>
          <DeviceVisual device={d.key} />
        </div>

        <div className="p-3">
          <div className="font-display" style={{ fontSize: 15, color: "var(--gold, #C9A84C)", letterSpacing: "0.05em", lineHeight: 1.3 }}>
            {d.name}
          </div>
          <p className="font-body" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7, margin: "8px 0 0" }}>
            {d.story}
          </p>

          <div className="font-display mt-3 mb-1" style={{ fontSize: 8.5, color: d.accent, letterSpacing: "0.14em" }}>TECH SPECS</div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {d.specs.map(([k, v]) => (
              <div key={k} className="flex gap-2 py-1" style={{ borderBottom: "1px solid var(--border)" }}>
                <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-muted)", width: 108 }}>{k}</span>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-primary)" }}>{v}</span>
              </div>
            ))}
          </div>

          <div className="font-display mt-3 mb-1" style={{ fontSize: 8.5, color: d.accent, letterSpacing: "0.14em" }}>DOCUMENTED IMPACTS</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-1">
            {d.impacts.map((i) => (
              <li key={i} className="font-body flex gap-1.5" style={{ fontSize: 10, color: "var(--text-primary)", lineHeight: 1.5 }}>
                <span style={{ color: "var(--green, #10B981)" }}>✓</span>{i}
              </li>
            ))}
          </ul>

          {d.research && !locked && (
            <div
              className="rounded mt-3 p-2 font-mono"
              style={{ fontSize: 8.5, lineHeight: 1.7, color: "#F59E0B", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.35)" }}
            >
              <div style={{ letterSpacing: "0.1em", opacity: 0.8 }}>RESEARCH BASIS</div>
              {d.research.map((r) => <div key={r}>{r}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}