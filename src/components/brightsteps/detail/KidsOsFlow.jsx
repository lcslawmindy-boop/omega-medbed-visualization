import React from "react";

const NODES = [
  { label: "SENSOR DATA", color: "var(--teal)", note: "5 channels" },
  { label: "KIDS-OS AI", color: "var(--sky)", note: "100ms cycle" },
  { label: "PEDIATRIC PARAM CHECK", color: "var(--teal)", note: "hardware ceiling" },
];

export default function KidsOsFlow({ code, color }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {NODES.map((n) => (
        <span key={n.label} className="flex items-center gap-1.5">
          <span className="flex flex-col items-center rounded-md px-2 py-1" style={{ border: `1px solid ${n.color}`, background: `${"transparent"}` }}>
            <span className="font-display" style={{ fontSize: 8, color: n.color, letterSpacing: "0.06em" }}>{n.label}</span>
            <span className="font-mono" style={{ fontSize: 7, color: "var(--text-muted)" }}>{n.note}</span>
          </span>
          <span style={{ color: "var(--sky)", fontSize: 12 }}>→</span>
        </span>
      ))}
      <span className="font-display rounded-md px-2 py-1.5" style={{ fontSize: 8, color, border: `1px solid ${color}`, letterSpacing: "0.06em" }}>
        {code} ADAPTATION
      </span>
    </div>
  );
}