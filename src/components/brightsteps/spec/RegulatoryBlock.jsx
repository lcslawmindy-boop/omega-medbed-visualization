import React from "react";

const LINES = [
  ["FDA Classification", "Class IIb/III Concept (Pediatric therapeutic device — combination product architecture)"],
  ["Reference", "21 CFR Part 880"],
  ["Status", "Research Prototype Only"],
  ["Pediatric Use", "Additional regulatory requirements apply (21 CFR Part 50 subpart D)"],
  ["IRB Approval", "Required — pediatric research"],
  ["Parental Consent", "Required for any study"],
];

export default function RegulatoryBlock() {
  return (
    <div className="m-3 rounded-lg p-3" style={{ border: "1px solid var(--coral)", background: "rgba(120, 20, 20, 0.22)" }}>
      <div className="font-display mb-2" style={{ fontSize: 9, color: "var(--coral)", letterSpacing: "0.1em" }}>
        ⚠ REGULATORY CLASSIFICATION
      </div>
      {LINES.map(([k, v]) => (
        <div key={k} className="font-body mb-1.5" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.5 }}>
          <span style={{ color: "var(--text-primary)" }}>{k}:</span> {v}
        </div>
      ))}
      <div className="font-display font-bold text-center mt-2.5" style={{ fontSize: 11, color: "var(--coral)", letterSpacing: "0.08em" }}>
        NOT MEDICAL ADVICE
      </div>
    </div>
  );
}