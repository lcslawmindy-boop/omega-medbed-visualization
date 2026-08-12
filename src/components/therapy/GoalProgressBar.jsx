import React from "react";
import { goalProgress } from "@/data/healingGoals";

export default function GoalProgressBar({ m, value }) {
  const pct = goalProgress(value, m);
  return (
    <div className="rounded-xl p-2.5" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-display" style={{ fontSize: 9.5, color: "var(--text-primary)", letterSpacing: "0.06em" }}>{m.label}</span>
        <span className="font-mono" style={{ fontSize: 9.5, color: m.color }}>
          {value == null ? "—" : value} {m.unit}
        </span>
      </div>
      <div className="rounded-full overflow-hidden mt-1.5" style={{ height: 5, background: "#152238" }}>
        <div className="rounded-full" style={{ width: `${pct}%`, height: "100%", background: m.color, transition: "width 400ms ease" }} />
      </div>
      <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
        baseline {m.baseline} → goal {m.goal} {m.unit} · {pct.toFixed(0)}% of goal
      </div>
    </div>
  );
}