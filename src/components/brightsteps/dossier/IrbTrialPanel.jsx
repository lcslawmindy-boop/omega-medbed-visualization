import React from "react";
import { IRB_DESIGN, IRB_ENDPOINTS, IRB_VISITS, IRB_EXCLUSIONS } from "@/data/brightstepsDossier";

const TIER_COLOR = { PRIMARY: "var(--sky)", SECONDARY: "var(--teal)", EXPLORATORY: "var(--violet)" };

export default function IrbTrialPanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
          <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>STUDY DESIGN</div>
          {IRB_DESIGN.map((d) => (
            <div key={d.k} className="flex justify-between gap-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-muted)" }}>{d.k}</span>
              <span className="font-mono text-right" style={{ fontSize: 9, color: "var(--text-primary)" }}>{d.v}</span>
            </div>
          ))}
        </div>
        <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
          <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>OUTCOME MEASURES</div>
          <div className="space-y-1.5">
            {IRB_ENDPOINTS.map((e) => (
              <div key={e.name} className="flex gap-2 items-start">
                <span className="font-display flex-none rounded" style={{ fontSize: 7.5, padding: "2px 4px", color: TIER_COLOR[e.tier], border: `1px solid ${TIER_COLOR[e.tier]}`, width: 74, textAlign: "center" }}>{e.tier}</span>
                <div className="min-w-0">
                  <div className="font-mono" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{e.name} <span style={{ color: "var(--text-muted)" }}>· {e.unit}</span></div>
                  <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{e.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>VISIT SCHEDULE — 24 SESSIONS OVER 8 WEEKS</div>
        <div className="space-y-1.5">
          {IRB_VISITS.map((v) => (
            <div key={v.v} className="flex gap-2 items-start py-1" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="font-display flex-none" style={{ fontSize: 9, color: "var(--sky)", width: 118 }}>{v.v}</span>
              <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--amber)", width: 74 }}>{v.w}</span>
              <span className="font-mono flex-1" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.5 }}>{v.k}</span>
              <span className="font-mono flex-none hidden sm:inline" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{v.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--red-alert)" }}>
        <div className="font-display mb-2" style={{ fontSize: 10, color: "var(--red-alert)", letterSpacing: "0.1em" }}>⚠ EXCLUSION CRITERIA</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IRB_EXCLUSIONS.map((e) => (
            <div key={e.t} className="p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <div className="font-display flex items-center gap-1.5" style={{ fontSize: 9.5, color: e.abs ? "var(--red-alert)" : "var(--text-primary)" }}>
                {e.abs && <span className="font-mono rounded" style={{ fontSize: 7, padding: "1px 4px", background: "var(--red-alert)", color: "#1A0505" }}>ABSOLUTE</span>}
                {e.t}
              </div>
              <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{e.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}