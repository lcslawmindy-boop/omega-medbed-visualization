import React from "react";
import { BS_SPECS } from "@/data/brightstepsSpec";

export default function SpecTable() {
  return (
    <div>
      <div className="px-3 py-2 font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        SYSTEM SPECIFICATIONS
      </div>
      {BS_SPECS.map(([k, v], i) => (
        <div
          key={k}
          className="flex items-center gap-2 px-3 py-1"
          style={{ background: i % 2 ? "var(--bg-elevated)" : "var(--bg-panel)" }}
        >
          <span className="font-mono flex-1 min-w-0 truncate" style={{ fontSize: 10, color: "var(--text-muted)" }}>{k}</span>
          <span className="font-mono flex-none text-right" style={{ fontSize: 10, color: "var(--text-primary)" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}