import React from "react";

/** Starr — the BrightSteps mascot. mood: "idle" | "cheer" */
export default function Starr({ size = 56, mood = "idle", name = "Starr" }) {
  return (
    <span
      className={mood === "cheer" ? "kids-cheer" : "kids-bounce"}
      style={{ display: "inline-block", lineHeight: 0 }}
      role="img"
      aria-label={name}
    >
      <svg width={size} height={size} viewBox="0 0 64 64">
        <g stroke="#F6C453" strokeWidth="4" strokeLinecap="round">
          <line x1="12" y1="36" x2={mood === "cheer" ? 4 : 6} y2={mood === "cheer" ? 22 : 44} />
          <line x1="52" y1="36" x2={mood === "cheer" ? 60 : 58} y2={mood === "cheer" ? 22 : 44} />
        </g>
        <path
          d="M32 4 L39.5 23 L60 24.5 L44 37.5 L49 57 L32 46 L15 57 L20 37.5 L4 24.5 L24.5 23 Z"
          fill="#FDE68A"
          stroke="#F6C453"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="30" r="3" fill="#1F2937" />
        <circle cx="38" cy="30" r="3" fill="#1F2937" />
        <path d="M26 38 q6 6 12 0" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="37" r="2.5" fill="#FCA5A5" opacity="0.6" />
        <circle cx="44" cy="37" r="2.5" fill="#FCA5A5" opacity="0.6" />
      </svg>
    </span>
  );
}