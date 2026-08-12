import React from "react";
import { SOLUTION } from "@/data/crisisData";

export default function SolutionSection() {
  return (
    <section id="solution" className="bs-card p-4" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--teal)" }}>
      <div className="font-display" style={{ fontSize: 9.5, color: "var(--teal)", letterSpacing: "0.16em" }}>05 — THE SOLUTION</div>
      <div className="font-display mt-1" style={{ fontSize: 19, color: "var(--text-primary)", lineHeight: 1.3 }}>{SOLUTION.headline}</div>
      <p className="font-body" style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.7, margin: "8px 0 0" }}>{SOLUTION.body}</p>
      <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {SOLUTION.pillars.map(([t, d]) => (
          <div key={t} className="rounded-xl p-3" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
            <div className="font-display" style={{ fontSize: 10, color: "var(--sky)", letterSpacing: "0.1em" }}>{t}</div>
            <div className="font-body mt-1" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.6 }}>{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}