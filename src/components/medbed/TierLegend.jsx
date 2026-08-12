import React from "react";
import { MODALITIES } from "@/data/modalities";

const TIER = {
  T1: { color: "#10B981", label: "FDA/PEER-REVIEWED" },
  T2: { color: "#F59E0B", label: "CLINICAL EVIDENCE" },
  T3: { color: "#EF4444", label: "FRONTIER/RESEARCH" },
};

export default function TierLegend() {
  const counts = { T1: 0, T2: 0, T3: 0 };
  MODALITIES.forEach((m) => { counts[m.tierCode]++; });
  return (
    <div className="flex items-center gap-2 flex-wrap mb-2.5">
      <span className="font-display text-muted" style={{ fontSize: 8, letterSpacing: "0.12em" }}>EVIDENCE TIERS:</span>
      {["T1", "T2", "T3"].map((k) => (
        <span
          key={k}
          className="font-mono inline-flex items-center gap-1 rounded-sm"
          style={{ fontSize: 8, color: TIER[k].color, border: `1px solid ${TIER[k].color}`, background: `${TIER[k].color}20`, padding: "2px 6px", letterSpacing: "0.04em" }}
        >
          {k} {TIER[k].label} — {counts[k]}
        </span>
      ))}
    </div>
  );
}