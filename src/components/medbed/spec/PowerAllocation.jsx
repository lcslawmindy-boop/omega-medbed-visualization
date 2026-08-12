import React from "react";
import { MODALITY_BY_CODE } from "@/data/modalities";

// Approximate watt allocations totaling ~3.5kW
const ALLOC = [
  ["PBM", 800], ["FIT", 600], ["HIT", 400], ["PEMF", 300], ["VAT", 250],
  ["SFT", 200], ["RIF", 200], ["NIA", 150], ["PRI", 150], ["EEG", 100],
  ["BIO", 100], ["MCT", 80], ["CHM", 70], ["GSC", 50], ["VOR", 50],
  ["NAD", 30], ["OZO", 20], ["ORG", 0],
];
const MAX_W = 800;
const TOTAL = ALLOC.reduce((s, [, w]) => s + w, 0);

export default function PowerAllocation() {
  return (
    <div className="px-4 py-3">
      <div className="font-display text-gold uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        Power Allocation — 3.5kW Total
      </div>

      <div className="space-y-0.5">
        {ALLOC.map(([code, watts]) => {
          const m = MODALITY_BY_CODE[code];
          const color = m?.color || "#888";
          const pct = (watts / MAX_W) * 100;
          return (
            <div key={code} className="flex items-center gap-2" style={{ height: 16 }}>
              <div className="font-display" style={{ fontSize: 9, width: 34, color, letterSpacing: "0.04em" }}>
                {code}
              </div>
              <div className="flex-1 rounded-sm overflow-hidden" style={{ background: "var(--bg-elevated)", height: 10 }}>
                <div
                  className="h-full rounded-sm"
                  style={{ width: `${pct}%`, background: color, boxShadow: watts > 0 ? `0 0 6px ${color}` : "none" }}
                />
              </div>
              <div className="font-mono text-right" style={{ fontSize: 9, width: 52, color: watts > 0 ? "var(--text-primary)" : "var(--text-muted)" }}>
                {watts > 0 ? `${watts}W` : "passive"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <div className="font-display text-gold" style={{ fontSize: 9, letterSpacing: "0.06em" }}>TOTAL</div>
        <div className="flex-1 rounded-sm overflow-hidden" style={{ background: "var(--bg-elevated)", height: 12 }}>
          <div className="h-full rounded-sm" style={{ width: "100%", background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
        </div>
        <div className="font-mono text-gold" style={{ fontSize: 10, width: 64, textAlign: "right" }}>{(TOTAL / 1000).toFixed(1)} kW MAX</div>
      </div>
    </div>
  );
}