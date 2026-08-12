import React from "react";

export default function ResearchCard({ src }) {
  return (
    <div className="bs-card p-3 flex flex-col" style={{ background: "var(--bg-panel)", border: `1px solid ${src.color}` }}>
      <div className="font-display" style={{ fontSize: 10.5, color: src.color, letterSpacing: "0.08em", lineHeight: 1.4 }}>{src.title}</div>
      <div className="font-mono mt-1" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
        {src.type} · {src.date}{src.country ? ` · ${src.country}` : ""}
      </div>
      <p className="font-body flex-1" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>{src.body}</p>
      <div className="font-mono mt-2 pt-2" style={{ fontSize: 8.5, color: "var(--text-muted)", borderTop: "1px solid var(--border)", opacity: 0.85 }}>
        {src.citation}
      </div>
    </div>
  );
}