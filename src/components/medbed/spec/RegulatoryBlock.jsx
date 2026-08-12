import React from "react";

const LINES = [
  "FDA Classification: Class III Medical Device Concept",
  "Reference: 21 CFR Part 880",
  "Status: Research Prototype Only",
  "IRB Approval: Required for any patient use",
  "510(k) Clearance: Required prior to clinical use",
  "EM Safety: IEEE C95.1-2019 compliant (design intent)",
  "Electrical Safety: IEC 60601-1 (design intent)",
  "Software Safety: IEC 62304 Class B (design intent)",
];

export default function RegulatoryBlock() {
  return (
    <div className="px-4 py-3">
      <div
        className="rounded-sm p-3"
        style={{ background: "rgba(204,34,0,0.08)", border: "1px solid var(--red)" }}
      >
        <div className="font-display uppercase mb-2" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--red)" }}>
          ⚠ Regulatory Classification
        </div>
        <div className="space-y-1">
          {LINES.map((l) => (
            <div key={l} className="font-body text-muted" style={{ fontSize: 9, lineHeight: 1.5 }}>
              {l}
            </div>
          ))}
        </div>
        <div
          className="font-display text-center font-bold mt-3 pt-2 border-t"
          style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--red)", borderColor: "rgba(239,68,68,0.3)" }}
        >
          NOT MEDICAL ADVICE
        </div>
      </div>
    </div>
  );
}