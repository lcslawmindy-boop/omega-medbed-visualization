import React from "react";

export default function CrisisCard({ c }) {
  return (
    <section id={c.id} className="bs-card p-4" style={{ background: "var(--bg-card)", borderLeft: `3px solid ${c.color}` }}>
      <div className="font-display" style={{ fontSize: 9.5, color: c.color, letterSpacing: "0.16em" }}>{c.tag}</div>
      <div className="font-display mt-1" style={{ fontSize: 18, color: "var(--text-primary)" }}>
        <span style={{ marginRight: 8 }}>{c.icon}</span>{c.title}
      </div>
      <p className="font-body" style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.7, margin: "8px 0 0" }}>
        {c.lead}
      </p>
      <div className="grid gap-2 mt-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
        {c.stats.map(([v, l]) => (
          <div key={l} className="rounded-xl p-2.5" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
            <div className="font-display" style={{ fontSize: 17, color: c.color }}>{v}</div>
            <div className="font-body" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}