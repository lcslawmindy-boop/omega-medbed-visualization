import React from "react";

const TIER_COLORS = { T1: "#10B981", T2: "#F59E0B", T3: "#EF4444" };

export default function ModalityCard({ mod, active, onClick, onOpenDetail }) {
  const tierColor = TIER_COLORS[mod.tierCode];
  const accent = mod.isMaster ? "var(--gold)" : mod.color;

  return (
    <div
      className={`mod-card ${active ? "active" : ""}`}
      style={{ "--card-accent": accent, background: "var(--bg-card)", borderRadius: 6, padding: 14, cursor: "pointer" }}
      onClick={onClick}
    >
      {/* Header row */}
      <div className="flex items-center gap-2">
        <span
          className="font-display font-bold"
          style={{
            fontSize: 10,
            letterSpacing: "0.06em",
            color: mod.color,
            border: `1px solid ${mod.color}`,
            background: `${mod.color}20`,
            padding: "2px 6px",
            borderRadius: 3,
          }}
        >
          {mod.code}
        </span>
        <span className="font-body text-muted uppercase flex-1" style={{ fontSize: 9, letterSpacing: "0.08em" }}>
          {mod.category}
        </span>
        {mod.isMaster && (
          <span
            className="font-display"
            style={{ fontSize: 7.5, letterSpacing: "0.08em", color: "var(--gold)", border: "1px solid var(--gold)", background: "rgba(201,168,76,0.15)", padding: "1px 5px", borderRadius: 3 }}
          >
            ★ MASTER
          </span>
        )}
        <span
          className="font-display"
          style={{
            fontSize: 8,
            letterSpacing: "0.06em",
            color: tierColor,
            border: `1px solid ${tierColor}`,
            background: `${tierColor}20`,
            padding: "1px 6px",
            borderRadius: 999,
          }}
        >
          {mod.tierCode}
        </span>
      </div>

      {/* Name */}
      <div className="font-display font-bold text-white" style={{ fontSize: 14, margin: "8px 0 4px 0", letterSpacing: "0.02em" }}>
        {mod.name}
      </div>

      {/* Params */}
      <div className="font-mono text-gold" style={{ fontSize: 10, lineHeight: 1.4 }}>
        {mod.spec}
      </div>

      {/* Description */}
      <p className="font-body text-muted mt-1.5" style={{ fontSize: 10, lineHeight: 1.5 }}>
        {mod.description}
      </p>

      {/* Mechanism pills */}
      <div className="flex flex-wrap gap-1 mt-2">
        {mod.mechanism.map((mech) => (
          <span
            key={mech}
            className="font-body"
            style={{ fontSize: 9, color: mod.color, background: `${mod.color}1a`, border: `1px solid ${mod.color}40`, padding: "1px 6px", borderRadius: 3 }}
          >
            ● {mech}
          </span>
        ))}
      </div>

      {/* Research basis */}
      <p className="font-body text-muted italic mt-2" style={{ fontSize: 9, lineHeight: 1.4 }}>
        {mod.tier} — {mod.source}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 mt-2.5 border-t border-soft" style={{ borderColor: "var(--border)" }}>
        <span className="font-mono" style={{ fontSize: 9, color: "var(--green)" }}>● ACTIVE</span>
        <button
          onClick={(e) => { e.stopPropagation(); onOpenDetail && onOpenDetail(mod.code); }}
          className="font-mono hover:text-gold transition-colors"
          style={{ fontSize: 9, color: "var(--text-muted)", border: "1px solid var(--border)", padding: "1px 6px", borderRadius: 3 }}
        >
          ⓘ Full Detail
        </button>
      </div>
    </div>
  );
}