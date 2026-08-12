import React from "react";

export default function IdentityHeader() {
  return (
    <div className="px-4 pt-4 pb-3" style={{ borderTop: "3px solid var(--gold)" }}>
      <div className="font-display font-bold text-white" style={{ fontSize: 20, letterSpacing: "0.04em" }}>
        OMEGA MEDBED
      </div>
      <div className="font-display text-gold" style={{ fontSize: 14, letterSpacing: "0.08em" }}>
        ZA-MB-Ω
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {[
          { l: "CONCEPT", c: "var(--amber)" },
          { l: "18 MODALITIES", c: "var(--gold)" },
          { l: "BFAC ONLINE", c: "var(--green)" },
        ].map((b) => (
          <span
            key={b.l}
            className="font-mono rounded-sm border"
            style={{
              fontSize: 8,
              padding: "2px 6px",
              letterSpacing: "0.06em",
              color: b.c,
              borderColor: b.c,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            ● {b.l}
          </span>
        ))}
      </div>

      <div className="my-3 h-px" style={{ background: "var(--border)" }} />

      <div className="font-mono text-muted" style={{ fontSize: 9, lineHeight: 1.5 }}>
        <div>ZA-ENG-MB-OMEGA-A-PRD</div>
        <div>Rev A · 2026-08-12</div>
      </div>
    </div>
  );
}