import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from "recharts";

// Baseline (pre-therapy) vs live session readings, against the clinical goal baseline.
const METRICS = [
  { key: "hrv", label: "HRV (RMSSD)", unit: "ms", baseline: 34, goal: 55, dir: "up", color: "#38BDF8" },
  { key: "gsr", label: "Skin Conductance", unit: "µS", baseline: 8.4, goal: 4.5, dir: "down", color: "#2DD4BF" },
  { key: "alpha", label: "EEG Alpha Power", unit: "µV²", baseline: 6.2, goal: 11.0, dir: "up", color: "#A78BFA" },
  { key: "hr", label: "Heart Rate", unit: "bpm", baseline: 104, goal: 82, dir: "down", color: "#F59E0B" },
  { key: "resp", label: "Respiration", unit: "br/min", baseline: 24, goal: 16, dir: "down", color: "#34D399" },
];

// Deterministic progression curve across a 20-minute session
const curve = (m) => {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const f = i / 10;
    const ease = 1 - Math.pow(1 - f, 2);
    const delta = (m.goal - m.baseline) * ease * 0.92;
    const jitter = Math.sin(i * 1.7 + m.baseline) * Math.abs(m.goal - m.baseline) * 0.025;
    pts.push({ min: i * 2, value: +(m.baseline + delta + jitter).toFixed(2) });
  }
  return pts;
};

function MetricRow({ m }) {
  const data = curve(m);
  const current = data[data.length - 1].value;
  const improvement = Math.abs((current - m.baseline) / m.baseline) * 100;
  const goalPct = Math.min(100, Math.abs((current - m.baseline) / (m.goal - m.baseline)) * 100);

  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-card)" }}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="font-display" style={{ fontSize: 10, color: "var(--text-primary)", letterSpacing: "0.08em" }}>
          {m.label}
        </span>
        <span className="font-mono" style={{ fontSize: 10, color: m.color }}>
          {current} {m.unit}
          <span style={{ color: "var(--text-muted)" }}> · baseline {m.baseline} · goal {m.goal}</span>
        </span>
      </div>

      <div style={{ height: 92, marginTop: 6 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="#1B2B45" strokeDasharray="2 4" />
            <XAxis dataKey="min" tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} unit="m" />
            <YAxis tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ background: "#0D1117", border: "1px solid #21262D", borderRadius: 10, fontSize: 10 }}
              labelStyle={{ color: "#7D8590" }}
            />
            <ReferenceLine y={m.baseline} stroke="#7D8590" strokeDasharray="4 4" />
            <ReferenceLine y={m.goal} stroke="#34D399" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="value" stroke={m.color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-2 mt-1.5">
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: "#152238" }}>
          <div className="rounded-full" style={{ width: `${goalPct}%`, height: "100%", background: m.color }} />
        </div>
        <span className="font-mono" style={{ fontSize: 9.5, color: "var(--green)" }}>
          ▲ {improvement.toFixed(1)}% vs baseline
        </span>
        <span className="font-mono" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>
          {goalPct.toFixed(0)}% of goal
        </span>
      </div>
    </div>
  );
}

export default function BsBiometrics() {
  const avg =
    METRICS.reduce((s, m) => {
      const d = curve(m);
      return s + Math.abs((d[d.length - 1].value - m.baseline) / m.baseline) * 100;
    }, 0) / METRICS.length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
        <div className="font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
          BIOMETRIC RESPONSE — BASELINE vs GOAL
        </div>
        <div className="font-mono" style={{ fontSize: 9.5, color: "var(--green)" }}>
          COMPOSITE IMPROVEMENT ▲ {avg.toFixed(1)}%
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {METRICS.map((m) => (
          <MetricRow key={m.key} m={m} />
        ))}
      </div>
      <div className="font-mono mt-2" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        Simulated readings — conceptual modelling only, not clinical data.
      </div>
    </div>
  );
}