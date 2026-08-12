import React from "react";
import { BS_SPECS } from "@/data/brightstepsSpec";
import CountUpValue from "./CountUpValue";

// key → [target, duration, delay, decimals, suffix]
const COUNTERS = {
  "Active Systems": [12, 800, 0, 0, ""],
  "Total Components": [847, 1200, 100, 0, ""],
  "BOM Line Items": [67, 900, 200, 0, ""],
  "Assembly Hours": [112, 1000, 300, 0, "h"],
  "Max Power": [1.2, 800, 400, 1, " kW"],
};

export default function SpecTable() {
  return (
    <div>
      <div className="px-3 py-2 font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        SYSTEM SPECIFICATIONS
      </div>
      {BS_SPECS.map(([k, v], i) => {
        const c = COUNTERS[k];
        return (
          <div
            key={k}
            className="flex items-center gap-2 px-3 py-1"
            style={{ background: i % 2 ? "var(--bg-elevated)" : "var(--bg-panel)" }}
          >
            <span className="font-mono flex-1 min-w-0 truncate" style={{ fontSize: 10, color: "var(--text-muted)" }}>{k}</span>
            <span className="font-mono flex-none text-right" style={{ fontSize: 10, color: "var(--text-primary)" }}>
              {c ? <CountUpValue target={c[0]} duration={c[1]} delay={c[2]} decimals={c[3]} suffix={c[4]} /> : v}
            </span>
          </div>
        );
      })}
    </div>
  );
}