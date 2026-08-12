import React from "react";
import { AE_RISKS, AE_REPORTING, STOPPING_RULES } from "@/data/brightstepsDossier";

export default function SafetyReportingPanel() {
  return (
    <div className="space-y-3">
      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>ANTICIPATED RISKS & MITIGATION</div>
        <div className="space-y-1.5">
          {AE_RISKS.map((r) => (
            <div key={r.r} className="py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{r.r}</span>
                <span className="font-mono rounded" style={{ fontSize: 7.5, padding: "2px 5px", background: "var(--bg-elevated)", color: "var(--amber)" }}>{r.p}</span>
                <span className="font-mono rounded" style={{ fontSize: 7.5, padding: "2px 5px", background: "var(--bg-elevated)", color: r.g.includes("3") ? "var(--red-alert)" : "var(--green)" }}>{r.g}</span>
              </div>
              <div className="font-mono mt-0.5" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.55 }}>{r.m}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
          <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.1em" }}>AE REPORTING TIMELINES</div>
          {AE_REPORTING.map((a) => (
            <div key={a.e} className="py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex justify-between gap-2">
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-primary)" }}>{a.e}</span>
                <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--amber)" }}>{a.t}</span>
              </div>
              <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{a.to}</div>
            </div>
          ))}
        </div>
        <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--red-alert)" }}>
          <div className="font-display mb-2" style={{ fontSize: 10, color: "var(--red-alert)", letterSpacing: "0.1em" }}>⚠ MANDATORY STUDY STOPPING RULES</div>
          <ul className="space-y-1.5">
            {STOPPING_RULES.map((s) => (
              <li key={s} className="font-mono flex gap-2" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.55 }}>
                <span style={{ color: "var(--red-alert)" }}>■</span> {s}
              </li>
            ))}
          </ul>
          <div className="font-mono mt-2" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>DSMB interim safety review after every 60 enrolled participants.</div>
        </div>
      </div>
    </div>
  );
}