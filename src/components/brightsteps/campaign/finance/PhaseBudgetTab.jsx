import React from "react";
import { PHASE_BUDGET } from "@/data/campaignFinance";

export default function PhaseBudgetTab() {
  return (
    <div>
      <div className="font-display" style={{ fontSize: 12, color: "var(--text-primary)" }}>
        6-Phase Deployment Budget — $31.7M Total
      </div>

      <div className="mt-2.5 space-y-1.5">
        {PHASE_BUDGET.map((p) => (
          <div key={p.id} className="flex items-center gap-2" title={`${p.id} · ${p.timeline} · ${p.deliverable}`}>
            <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-muted)", width: 22 }}>{p.id}</span>
            <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-primary)", width: 52 }}>{p.label}</span>
            <div className="flex-1 rounded-full overflow-hidden" style={{ height: 12, background: "var(--bg-elevated)" }}>
              <div style={{ width: `${p.pct}%`, height: "100%", background: "linear-gradient(90deg,#8A6E2E,#C9A84C)" }} />
            </div>
            <span className="font-mono flex-none text-right" style={{ fontSize: 9, color: "var(--gold, #C9A84C)", width: 40 }}>{p.pct}%</span>
          </div>
        ))}
      </div>

      <div className="mt-3 overflow-x-auto bs-scroll">
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 420 }}>
          <thead>
            <tr>
              {["Phase", "Timeline", "Budget", "Primary Deliverable"].map((h) => (
                <th key={h} className="font-display text-left py-1.5 px-2" style={{ fontSize: 8.5, color: "var(--gold, #C9A84C)", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PHASE_BUDGET.map((p) => (
              <tr key={p.id}>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}>{p.id}</td>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{p.timeline}</td>
                <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)", borderBottom: "1px solid var(--border)" }}>${p.budget.toLocaleString()}</td>
                <td className="font-body py-1.5 px-2" style={{ fontSize: 9.5, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>{p.deliverable}</td>
              </tr>
            ))}
            <tr>
              <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>TOTAL</td>
              <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>104 Weeks</td>
              <td className="font-mono py-1.5 px-2" style={{ fontSize: 9, color: "var(--gold, #C9A84C)" }}>$31,680,000</td>
              <td className="font-body py-1.5 px-2" style={{ fontSize: 9.5, color: "var(--gold, #C9A84C)" }}>Light Timeline</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}