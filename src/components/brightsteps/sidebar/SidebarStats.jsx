import React from "react";
import { SIDEBAR_STATS } from "@/data/brightstepsNav";

export default function SidebarStats({ onHowItWorks }) {
  return (
    <div className="p-2.5" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--sky)" }}>
      <div className="grid grid-cols-3 gap-1.5">
        {SIDEBAR_STATS.map((s) => (
          <div key={s.label} className="flex flex-col leading-tight">
            <span className="font-display" style={{ fontSize: 7.5, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{s.label}</span>
            <span className="font-mono" style={{ fontSize: 12, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>
      <p className="font-body italic mt-2 mb-0" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.5 }}>
        KIDS-OS auto-scales all parameters by selected age group. Adult Omega MedBed parameters are NOT used in this device.
      </p>
      <button
        onClick={onHowItWorks}
        className="font-body mt-2 hover:underline"
        style={{ fontSize: 9.5, color: "var(--sky)", minHeight: 32 }}
      >
        ? How BrightSteps Works
      </button>
    </div>
  );
}