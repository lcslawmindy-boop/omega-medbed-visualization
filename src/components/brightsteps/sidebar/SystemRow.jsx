import React from "react";

const TIER_COLOR = { T1: "var(--green)", T2: "var(--amber)", T3: "var(--coral)" };

export default function SystemRow({ sys, active, onSelect }) {
  const dot = sys.status === "amber" ? "var(--amber)" : "var(--green)";
  return (
    <button
      data-bscode={sys.code}
      onClick={() => onSelect(sys.code)}
      className="bs-sys-row w-full flex items-center gap-2 text-left"
      style={{
        height: 56,
        padding: "10px 12px",
        borderRadius: "0 6px 6px 0",
        borderLeft: `4px solid ${active ? "var(--gold)" : sys.color}`,
        background: active ? "var(--bg-card)" : "transparent",
        transition: "background 200ms ease, border-color 200ms ease",
      }}
    >
      <span
        className="font-display font-bold flex-none text-center rounded-full"
        style={{
          fontSize: 9,
          width: 38,
          padding: "3px 0",
          color: sys.color,
          background: `${sys.color}33`,
          border: `1px solid ${sys.color}`,
          letterSpacing: "0.04em",
        }}
      >
        {sys.code}
      </span>
      <span className="flex-1 min-w-0 flex flex-col leading-tight">
        <span className="font-body truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{sys.name}</span>
        <span className="font-mono truncate" style={{ fontSize: 9, color: "var(--text-muted)" }}>{sys.param}</span>
        {sys.isMaster && (
          <span className="font-display mt-0.5 rounded-full self-start px-1.5" style={{ fontSize: 7, color: "var(--sky)", border: "1px solid var(--sky-dim)", letterSpacing: "0.08em" }}>
            MASTER CONTROLLER
          </span>
        )}
      </span>
      <span className="flex-none flex flex-col items-end gap-1">
        <span
          className="font-display rounded px-1"
          style={{ fontSize: 7.5, color: TIER_COLOR[sys.tier], border: `1px solid ${TIER_COLOR[sys.tier]}`, letterSpacing: "0.06em" }}
        >
          {sys.tier}
        </span>
        <span className="bs-pulse inline-block rounded-full" style={{ width: 6, height: 6, background: dot }} />
      </span>
    </button>
  );
}