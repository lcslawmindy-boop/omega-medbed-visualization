import React from "react";

export default function StatusMetric({ label, value, unit, pct, color = "var(--sky, #38BDF8)", detail }) {
  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
      <div className="flex items-baseline gap-2">
        <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{label}</span>
        <span className="font-mono" style={{ fontSize: 12, color }}>{value}{unit}</span>
      </div>
      <div className="mt-1.5 rounded-full overflow-hidden" style={{ height: 5, background: "var(--bg-card)" }}>
        <div style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height: "100%", background: color, transition: "width 600ms ease" }} />
      </div>
      {detail && <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{detail}</div>}
    </div>
  );
}