import React from "react";

export default function Chip({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="kids-tap k-t-md px-4"
      style={{
        minHeight: 52, borderRadius: 999,
        border: on ? "2px solid var(--k-sky)" : "1px solid var(--k-border)",
        background: on ? "var(--k-sky)" : "transparent",
        color: on ? "#04121F" : "var(--k-ink)",
      }}
    >
      {children}
    </button>
  );
}