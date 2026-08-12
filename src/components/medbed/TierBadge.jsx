import React from "react";

const TIER = {
  T1: { color: "#10B981", label: "T1", tip: "Tier 1: FDA-cleared device pathway or strong peer-reviewed clinical evidence exists for this modality type. Integration into the Omega MedBed is conceptual — not an FDA clearance of this device." },
  T2: { color: "#F59E0B", label: "T2", tip: "Tier 2: Clinical trials, observational studies, or regulatory-approved use in other countries. Not FDA-cleared in this context. Research and IP development purposes only." },
  T3: { color: "#EF4444", label: "T3", tip: "Tier 3: Frontier, suppressed, or theoretical research basis. Primary sources include historical patents, declassified documents, and non-mainstream scientific literature. ZARP does not validate or endorse the underlying scientific claims. Research and IP development purposes only." },
};

export default function TierBadge({ tierCode, size = "sm" }) {
  const t = TIER[tierCode] || TIER.T3;
  const fontSize = size === "lg" ? 12 : size === "md" ? 10 : 8;
  const padding = size === "lg" ? "3px 10px" : size === "md" ? "2px 8px" : "1px 6px";
  const radius = size === "sm" ? 999 : 3;
  return (
    <span className="relative group inline-flex items-center" style={{ position: "relative" }}>
      <span
        className="font-display font-bold inline-block"
        style={{ fontSize, letterSpacing: "0.06em", color: t.color, border: `1px solid ${t.color}`, background: `${t.color}20`, padding, borderRadius: radius }}
      >
        {t.label}
      </span>
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-64 opacity-0 group-hover:opacity-100 transition-opacity z-50 font-body"
        style={{ fontSize: 9, color: "var(--text-primary)", background: "var(--bg-elevated)", border: `1px solid ${t.color}`, borderRadius: 4, padding: 8, lineHeight: 1.5, letterSpacing: 0, textTransform: "none" }}
      >
        {t.tip}
      </span>
    </span>
  );
}