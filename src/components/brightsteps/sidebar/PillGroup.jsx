import React from "react";

export default function PillGroup({ options, value, onChange, activeColor }) {
  return (
    <div className="flex flex-wrap gap-1">
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className="font-display rounded-full transition-colors"
            style={{
              fontSize: 8.5,
              padding: "4px 8px",
              minHeight: 26,
              letterSpacing: "0.05em",
              color: on ? "#04121F" : "var(--text-muted)",
              background: on ? activeColor : "transparent",
              border: `1px solid ${on ? activeColor : "var(--border)"}`,
            }}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}