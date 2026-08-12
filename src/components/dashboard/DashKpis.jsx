import React from "react";

function Kpi({ label, value, unit, accent, sub }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderTop: `3px solid ${accent}` }}>
      <div className="font-display" style={{ fontSize: 8.5, color: "var(--text-muted)", letterSpacing: "0.12em" }}>{label}</div>
      <div className="font-display mt-1" style={{ fontSize: 22, color: accent }}>
        {value}<span className="font-mono ml-1" style={{ fontSize: 10, color: "var(--text-muted)" }}>{unit}</span>
      </div>
      {sub && <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{sub}</div>}
    </div>
  );
}

export default function DashKpis({ sessions }) {
  const n = sessions.length || 1;
  const avg = (k) => sessions.reduce((s, x) => s + (x[k] || 0), 0) / n;
  const hours = sessions.reduce((s, x) => s + (x.duration_sec || 0), 0) / 3600;
  const completed = sessions.filter((s) => s.status === "completed").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5">
      <Kpi label="TOTAL SESSIONS" value={sessions.length} unit="" accent="var(--gold)" sub={`${completed} completed`} />
      <Kpi label="AVG SCALAR FIELD" value={avg("scalar_field").toFixed(2)} unit="Hz" accent="var(--violet)" sub="coherence index" />
      <Kpi label="AVG POWER STABILITY" value={avg("power_stability").toFixed(1)} unit="%" accent="var(--green)" sub="rail regulation" />
      <Kpi label="AVG HRV" value={avg("hrv").toFixed(1)} unit="ms" accent="var(--blue)" sub={`SpO₂ ${avg("spo2").toFixed(1)}%`} />
      <Kpi label="RUNTIME LOGGED" value={hours.toFixed(1)} unit="h" accent="var(--amber)" sub={`${(avg("total_watts") / 1000).toFixed(2)} kW avg draw`} />
    </div>
  );
}