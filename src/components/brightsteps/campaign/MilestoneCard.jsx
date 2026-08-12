import React from "react";

export default function MilestoneCard({ m }) {
  const active = m.status === "in_progress";
  const pct = m.funded ? Math.round((m.funded / m.budget) * 100) : 0;
  return (
    <div className="relative pl-8 pb-4">
      {/* node on the timeline */}
      <span
        className={`absolute rounded-full ${active ? "bs-pulse" : ""}`}
        style={{
          left: 6, top: 6, width: 13, height: 13,
          background: active ? "var(--gold, #C9A84C)" : "var(--bg-panel)",
          border: `2px solid ${active ? "var(--gold, #C9A84C)" : "var(--border)"}`,
          boxShadow: active ? "0 0 12px rgba(201,168,76,0.7)" : "none",
        }}
      />
      <div className="bs-card p-3" style={{ background: "var(--bg-panel)", borderLeft: `3px solid ${active ? "var(--gold, #C9A84C)" : "var(--border)"}` }}>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="font-display" style={{ fontSize: 9.5, color: "var(--gold, #C9A84C)", letterSpacing: "0.12em" }}>{m.window}</span>
          <span className="font-mono" style={{ fontSize: 8.5, color: active ? "#FBBF24" : "var(--text-muted)" }}>
            {active ? "🟡 IN PROGRESS" : "⚪ PENDING"}
          </span>
        </div>
        <div className="font-display mt-1" style={{ fontSize: 13, color: "var(--text-primary)" }}>{m.title}</div>
        <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>
          Phase budget: ${m.budget.toLocaleString()}
        </div>

        <ul className="mt-2 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {m.items.map((i) => (
            <li key={i} className="font-body flex gap-1.5" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.55 }}>
              <span style={{ color: "var(--gold, #C9A84C)" }}>☐</span>{i}
            </li>
          ))}
        </ul>

        {m.funded !== undefined && (
          <div className="mt-2.5">
            <div className="flex justify-between font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
              <span>Funding needed: ${m.budget.toLocaleString()}</span>
              <span style={{ color: "var(--gold, #C9A84C)" }}>${m.funded.toLocaleString()} · {pct}%</span>
            </div>
            <div className="rounded-full mt-1 overflow-hidden" style={{ height: 6, background: "var(--bg-elevated)" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg,#8A6E2E,#C9A84C)" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}