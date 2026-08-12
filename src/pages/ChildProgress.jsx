import React from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";
import TrendChart from "@/components/insights/TrendChart";
import { CHILD_TRENDS, SESSION_TRENDS, METRIC_SPECS } from "@/data/progressTrends";

const WINS = [
  "🌟 12 sessions completed — every single one finished calmly",
  "💙 Independent step completion is up 62% since the first session",
  "🕊️ Calm Corner visits are getting shorter — self-regulation is growing",
  "✋ Fewer help requests needed, and asking for help is still always okay",
];

export default function ChildProgress() {
  const first = CHILD_TRENDS[0];
  const last = CHILD_TRENDS[CHILD_TRENDS.length - 1];

  return (
    <PageShell title="CHILD PROGRESS" subtitle="Celebrating growth across sessions" accent="var(--teal, #2DD4BF)">
      <SectionCard title="LOOK HOW FAR THEY'VE COME 💙" accent="var(--teal, #2DD4BF)">
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["Independence", `${first.independence}% → ${last.independence}%`],
            ["Calm minutes / session", `${first.calmMinutes} → ${last.calmMinutes}`],
            ["Stars earned", `${first.starsEarned} → ${last.starsEarned}`],
          ].map(([k, v]) => (
            <div key={k} className="bs-card p-3" style={{ background: "var(--bg-panel)" }}>
              <div className="font-kid" style={{ fontSize: 11, color: "var(--text-muted)" }}>{k}</div>
              <div className="font-display mt-1" style={{ fontSize: 14, color: "var(--teal, #2DD4BF)" }}>{v}</div>
            </div>
          ))}
        </div>
        <ul className="mt-2 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {WINS.map((w) => (
            <li key={w} className="font-kid" style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.7 }}>{w}</li>
          ))}
        </ul>
      </SectionCard>

      <TrendChart
        title="INDEPENDENCE & CALM — SESSION BY SESSION"
        data={CHILD_TRENDS}
        series={[
          { key: "independence", name: "Independent steps (%)", color: "#2DD4BF" },
          { key: "calmMinutes", name: "Calm minutes", color: "#38BDF8" },
          { key: "helpRequests", name: "Help requests", color: "#F59E0B", dashed: true },
        ]}
      />

      {METRIC_SPECS.slice(0, 2).map((m) => (
        <TrendChart
          key={m.key}
          title={`${m.name.toUpperCase()} — IMPROVEMENT FROM BASELINE`}
          data={SESSION_TRENDS}
          series={[
            { key: m.key, name: "Session result", color: m.color },
            { key: `${m.key}_baseline`, name: "Starting baseline", color: "#7D8590", dashed: true },
          ]}
        />
      ))}

      <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        Simulated modelling data — conceptual only. Progress is never a test, and every child's pace is their own.
      </div>
    </PageShell>
  );
}