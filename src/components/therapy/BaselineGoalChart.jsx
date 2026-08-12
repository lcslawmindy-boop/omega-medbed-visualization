import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { GOAL_METRICS, goalProgress } from "@/data/healingGoals";
import GoalProgressBar from "./GoalProgressBar";

// Interactive baseline-vs-goal tracker driven by the user's real session logs.
export default function BaselineGoalChart({ sessions }) {
  const [metricKey, setMetricKey] = useState("hrv");
  const [range, setRange] = useState(10);
  const m = GOAL_METRICS.find((x) => x.key === metricKey);

  const data = useMemo(() => {
    const asc = [...sessions].reverse().filter((s) => s[metricKey] != null);
    return asc.slice(-range).map((s, i) => ({
      value: s[metricKey],
      label: s.started_at ? format(new Date(s.started_at), "MMM d") : `#${i + 1}`,
    }));
  }, [sessions, metricKey, range]);

  const latest = data.length ? data[data.length - 1].value : null;
  const first = data.length ? data[0].value : null;
  const pct = goalProgress(latest, m);
  const change = latest != null && first ? ((latest - first) / Math.abs(first)) * 100 : 0;
  const improving = m.dir === "up" ? change > 0 : change < 0;

  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: `3px solid ${m.color}` }}>
      <div className="font-display" style={{ fontSize: 10, color: m.color, letterSpacing: "0.14em" }}>
        BIOMETRIC PROGRESS — BASELINE vs HEALING GOAL
      </div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {GOAL_METRICS.map((x) => {
          const on = x.key === metricKey;
          return (
            <button
              key={x.key}
              onClick={() => setMetricKey(x.key)}
              className="font-display rounded-full"
              style={{
                fontSize: 8.5, padding: "7px 11px", minHeight: 34, letterSpacing: "0.06em",
                color: on ? "#04121F" : "var(--text-muted)",
                background: on ? x.color : "transparent",
                border: `1px solid ${on ? x.color : "var(--border)"}`,
              }}
            >
              {x.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {[5, 10, 25].map((r) => {
          const on = r === range;
          return (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="font-mono rounded"
              style={{
                fontSize: 8.5, padding: "6px 10px", minHeight: 32,
                color: on ? "var(--text-primary)" : "var(--text-muted)",
                background: on ? "var(--bg-elevated)" : "transparent",
                border: "1px solid var(--border)",
              }}
            >
              LAST {r}
            </button>
          );
        })}
      </div>

      {data.length === 0 ? (
        <div className="font-mono py-8 text-center" style={{ fontSize: 10, color: "var(--text-muted)" }}>
          No {m.label} readings recorded yet.
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-3 flex-wrap mt-2">
            <span className="font-display" style={{ fontSize: 20, color: m.color }}>
              {latest} <span style={{ fontSize: 10 }}>{m.unit}</span>
            </span>
            <span className="font-mono" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>
              baseline {m.baseline} · goal {m.goal} {m.unit}
            </span>
            <span className="font-mono" style={{ fontSize: 9.5, color: improving ? "var(--green)" : "var(--amber)" }}>
              {improving ? "▲" : "▼"} {Math.abs(change).toFixed(1)}% across shown sessions
            </span>
            <span className="font-mono" style={{ fontSize: 9.5, color: m.color }}>{pct.toFixed(0)}% of goal</span>
          </div>

          <div style={{ height: 200, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -14 }}>
                <CartesianGrid stroke="#1B2B45" strokeDasharray="2 4" />
                <XAxis dataKey="label" tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#7D8590", fontSize: 8 }} tickLine={false} axisLine={false} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ background: "#0E1525", border: "1px solid #1E3A5F", borderRadius: 10, fontSize: 10 }}
                  labelStyle={{ color: "#94A3B8" }}
                  formatter={(v) => [`${v} ${m.unit}`, m.label]}
                />
                <ReferenceLine y={m.baseline} stroke="#7D8590" strokeDasharray="4 4"
                  label={{ value: "BASELINE", fill: "#7D8590", fontSize: 8, position: "insideTopLeft" }} />
                <ReferenceLine y={m.goal} stroke="#34D399" strokeDasharray="4 4"
                  label={{ value: "GOAL", fill: "#34D399", fontSize: 8, position: "insideTopRight" }} />
                <Line type="monotone" dataKey="value" stroke={m.color} strokeWidth={2} dot={{ r: 3, fill: m.color }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <div className="grid gap-2 mt-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
        {GOAL_METRICS.map((x) => {
          const last = sessions.find((s) => s[x.key] != null);
          return <GoalProgressBar key={x.key} m={x} value={last ? last[x.key] : null} />;
        })}
      </div>

      <div className="font-mono mt-2" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        Baselines and goals are conceptual reference targets — not clinical thresholds.
      </div>
    </div>
  );
}