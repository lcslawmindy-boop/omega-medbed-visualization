import React from "react";

export default function ProtocolCard({ p, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(p.id)}
      className={`bs-card w-full text-left p-2.5 ${selected ? "active" : ""}`}
      style={{ background: "var(--bg-card)", borderRadius: 12, borderLeft: `3px solid ${p.color}` }}
    >
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 15 }}>{p.icon}</span>
        <span className="font-display flex-1" style={{ fontSize: 10, color: p.color, letterSpacing: "0.06em" }}>{p.name}</span>
        <span className="inline-block rounded-full flex-none" style={{ width: 12, height: 12, border: `2px solid ${p.color}`, background: selected ? p.color : "transparent" }} />
      </div>
      <div className="font-body mt-1" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
        Best for: {p.best}
      </div>
      <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--sky)" }}>{p.detail}</div>
      <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
        {p.id === "F" ? "Duration + systems: your choice" : `Duration: ${p.dur} min · Intensity: ${p.intensity}`}
      </div>
    </button>
  );
}