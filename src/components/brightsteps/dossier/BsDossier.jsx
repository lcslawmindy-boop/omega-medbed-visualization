import React, { useState } from "react";
import AceEnginePanel from "./AceEnginePanel";
import EvtMatrixPanel from "./EvtMatrixPanel";
import IrbTrialPanel from "./IrbTrialPanel";
import SafetyReportingPanel from "./SafetyReportingPanel";
import IpPortfolioPanel from "./IpPortfolioPanel";

const TABS = [
  { id: "ace", label: "ACE ENGINE", sub: "Closed-loop intelligence", C: AceEnginePanel },
  { id: "evt", label: "EVT VALIDATION", sub: "Acceptance criteria", C: EvtMatrixPanel },
  { id: "irb", label: "CLINICAL TRIAL", sub: "IRB protocol", C: IrbTrialPanel },
  { id: "safety", label: "RISK & AE", sub: "Safety reporting", C: SafetyReportingPanel },
  { id: "ip", label: "IP PORTFOLIO", sub: "Patents & NDA", C: IpPortfolioPanel },
];

export default function BsDossier() {
  const [tab, setTab] = useState("ace");
  const Active = TABS.find((t) => t.id === tab).C;
  return (
    <div>
      <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>ENGINEERING & CLINICAL DOSSIER</div>
      <div className="flex gap-1.5 overflow-x-auto bs-scroll pb-1 mb-2">
        {TABS.map((t) => {
          const on = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-none text-left px-3 py-2 transition-colors"
              style={{
                minHeight: 44,
                background: on ? "var(--bg-elevated)" : "transparent",
                border: `1px solid ${on ? "var(--sky)" : "var(--border)"}`,
                borderRadius: 12,
              }}
            >
              <div className="font-display" style={{ fontSize: 9.5, letterSpacing: "0.08em", color: on ? "var(--sky)" : "var(--text-muted)" }}>{t.label}</div>
              <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)" }}>{t.sub}</div>
            </button>
          );
        })}
      </div>
      <Active />
    </div>
  );
}