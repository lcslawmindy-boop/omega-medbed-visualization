import React from "react";

// Floating label that follows the pointer over 3D pod subsections.
export default function BsHoverLabel({ hover }) {
  if (!hover) return null;
  return (
    <div
      className="absolute pointer-events-none z-30 rounded-lg px-2 py-1 fade-in"
      style={{
        left: Math.max(6, hover.x + 12),
        top: Math.max(6, hover.y - 34),
        background: "rgba(7, 11, 20, 0.92)",
        border: "1px solid var(--sky-dim)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
        maxWidth: 220,
      }}
    >
      <div className="font-display" style={{ fontSize: 10, color: "var(--sky)", letterSpacing: "0.06em" }}>
        {hover.label}
      </div>
      {hover.sub && (
        <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
          {hover.sub}
        </div>
      )}
    </div>
  );
}