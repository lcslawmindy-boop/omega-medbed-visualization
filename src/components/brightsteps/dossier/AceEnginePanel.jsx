import React from "react";
import { ACE_INPUTS, ACE_FLOW, BFAC_STAGES, ACE_PERFORMANCE } from "@/data/brightstepsDossier";

export default function AceEnginePanel() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {ACE_INPUTS.map((g) => (
          <div key={g.group} className="bs-card p-3" style={{ background: "var(--bg-card)", borderTop: `2px solid var(--${g.color})` }}>
            <div className="font-display" style={{ fontSize: 9.5, color: `var(--${g.color})`, letterSpacing: "0.1em" }}>{g.group.toUpperCase()} INPUTS</div>
            <ul className="mt-2 space-y-1">
              {g.items.map((i) => (
                <li key={i} className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.5 }}>· {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>ACE CLOSED-LOOP ALGORITHMIC FLOW</div>
        <div className="space-y-2">
          {ACE_FLOW.map((s) => (
            <div key={s.n} className="flex gap-2.5 items-start">
              <span className="flex-none flex items-center justify-center font-mono rounded-full" style={{ width: 20, height: 20, fontSize: 9, background: "var(--sky-dim)", color: "#04121F" }}>{s.n}</span>
              <div className="min-w-0">
                <div className="font-display" style={{ fontSize: 10, color: "var(--text-primary)" }}>{s.t}</div>
                <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.55 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--red-alert)" }}>
          <div className="font-display mb-2" style={{ fontSize: 10, color: "var(--red-alert)", letterSpacing: "0.1em" }}>BFAC STAGED OVERRIDE</div>
          {BFAC_STAGES.map((s) => (
            <div key={s.stage} className="flex items-center gap-2 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="font-display flex-none" style={{ fontSize: 9, color: "var(--amber)", letterSpacing: "0.08em", width: 62 }}>{s.stage}</span>
              <span className="font-mono" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>{s.action}</span>
            </div>
          ))}
          <div className="font-mono mt-2" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>BFAC override always wins over ACE modulation.</div>
        </div>
        <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
          <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.1em" }}>PERFORMANCE REQUIREMENTS</div>
          {ACE_PERFORMANCE.map((p) => (
            <div key={p.k} className="flex justify-between gap-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{p.k}</span>
              <span className="font-mono text-right" style={{ fontSize: 9, color: "var(--text-primary)" }}>{p.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}