import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";
import TrendChart from "@/components/insights/TrendChart";
import { SESSION_TRENDS, METRIC_SPECS } from "@/data/progressTrends";

export default function DataInsights() {
  const last = SESSION_TRENDS[SESSION_TRENDS.length - 1];

  return (
    <PageShell title="DATA INSIGHTS" subtitle="Baseline vs session improvement · progress trends over time">
      <SectionCard title="IMPROVEMENT VS BASELINE — 12 SESSIONS">
        <div className="grid gap-2 sm:grid-cols-2">
          {METRIC_SPECS.map((m) => {
            const change = ((last[m.key] - m.baseline) / m.baseline) * 100;
            return (
              <div key={m.key} className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
                <div className="font-body" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{m.name}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display" style={{ fontSize: 17, color: m.color }}>{last[m.key]}</span>
                  <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>baseline {m.baseline} · goal {m.goal}</span>
                  <span className="font-mono ml-auto" style={{ fontSize: 10, color: "var(--green, #34D399)" }}>
                    {change > 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {METRIC_SPECS.map((m) => (
        <TrendChart
          key={m.key}
          title={`${m.name.toUpperCase()} — SESSION TREND vs BASELINE`}
          data={SESSION_TRENDS}
          series={[
            { key: m.key, name: "Session result", color: m.color },
            { key: `${m.key}_baseline`, name: "Pre-therapy baseline", color: "#7D8590", dashed: true },
          ]}
        />
      ))}

      <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        Simulated modelling data — conceptual only, not clinical evidence.
      </div>
    </PageShell>
  );
}