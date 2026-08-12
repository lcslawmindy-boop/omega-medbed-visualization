import React from "react";

export default function SectionCard({ title, note, accent = "var(--sky, #38BDF8)", children }) {
  return (
    <section className="bs-card p-3" style={{ background: "var(--bg-card)", borderLeft: `3px solid ${accent}` }}>
      {title && (
        <div className="font-display" style={{ fontSize: 10, color: accent, letterSpacing: "0.14em" }}>{title}</div>
      )}
      {note && <div className="font-mono mt-1" style={{ fontSize: 9, color: "var(--text-muted)" }}>{note}</div>}
      <div className="mt-2">{children}</div>
    </section>
  );
}