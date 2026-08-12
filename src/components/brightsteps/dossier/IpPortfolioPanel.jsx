import React from "react";
import { PATENT_CLAIMS, IP_PROTECTIONS } from "@/data/brightstepsDossier";

export default function IpPortfolioPanel() {
  return (
    <div className="space-y-3">
      <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
        <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>ACE ADAPTIVE CONTROL — PATENT CLAIM SET (DRAFT)</div>
        <div className="space-y-2">
          {PATENT_CLAIMS.map((c) => {
            const ind = c.type.startsWith("INDEPENDENT");
            return (
              <div key={c.n} className="p-2.5 rounded-xl" style={{ background: "var(--bg-elevated)", borderLeft: `3px solid ${ind ? "var(--sky)" : "var(--border-bright)"}` }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display" style={{ fontSize: 10, color: "var(--sky)" }}>{c.n}</span>
                  <span className="font-mono rounded" style={{ fontSize: 7.5, padding: "2px 5px", background: ind ? "var(--sky-dim)" : "transparent", color: ind ? "#04121F" : "var(--text-muted)", border: ind ? "none" : "1px solid var(--border)" }}>{c.type}</span>
                  <span className="font-display" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{c.t}</span>
                </div>
                <div className="font-mono mt-1" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.6 }}>{c.d}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--gold)" }}>
        <div className="font-display mb-2" style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em" }}>MUTUAL NDA — IP PROTECTION FRAMEWORK</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IP_PROTECTIONS.map((p) => (
            <div key={p.t} className="p-2 rounded-lg" style={{ background: "var(--bg-elevated)" }}>
              <div className="font-display" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{p.t}</div>
              <div className="font-mono mt-0.5" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.55 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}