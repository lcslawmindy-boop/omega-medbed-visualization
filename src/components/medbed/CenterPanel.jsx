import React, { useState } from "react";
import { MODALITIES } from "@/data/modalities";
import ModalityCard from "@/components/medbed/ModalityCard";

const FILTERS = [
  { k: "ALL", label: "ALL" },
  { k: "T1", label: "T1" },
  { k: "T2", label: "T2" },
  { k: "T3", label: "T3" },
];

export default function CenterPanel({ activeCode, onSelect }) {
  const [filter, setFilter] = useState("ALL");
  const [view, setView] = useState("grid");

  const filtered = MODALITIES.filter((m) => filter === "ALL" || m.tierCode === filter);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Divider bar */}
      <div
        className="flex items-center gap-3 px-3 flex-none"
        style={{ height: 36, background: "var(--bg-panel)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="font-display text-gold" style={{ fontSize: 11, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          MODALITY TECHNICAL DATA — 18 SYSTEMS
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mx-auto">
          {FILTERS.map((f) => {
            const on = filter === f.k;
            return (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className="font-display rounded-sm transition-colors"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  padding: "3px 9px",
                  background: on ? "var(--gold)" : "transparent",
                  color: on ? "#000" : "var(--text-muted)",
                  border: `1px solid ${on ? "var(--gold)" : "var(--border)"}`,
                }}
              >
                {f.label}
              </button>
            );
          })}
          <span className="font-mono text-muted ml-2" style={{ fontSize: 9 }}>
            {filtered.length}/18
          </span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1">
          {[
            { k: "grid", icon: "⊞", label: "Grid" },
            { k: "list", icon: "☰", label: "List" },
          ].map((v) => {
            const on = view === v.k;
            return (
              <button
                key={v.k}
                onClick={() => setView(v.k)}
                title={v.label}
                className="font-display rounded-sm transition-colors"
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  background: on ? "var(--bg-elevated)" : "transparent",
                  color: on ? "var(--gold)" : "var(--text-muted)",
                  border: `1px solid ${on ? "var(--gold)" : "var(--border)"}`,
                }}
              >
                {v.icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card grid */}
      <div className="flex-1 overflow-y-auto scroll-dark p-3" style={{ background: "var(--bg-primary)" }}>
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3 2xl:grid-cols-3">
            {filtered.map((m) => (
              <ModalityCard key={m.code} mod={m} active={m.code === activeCode} onClick={() => onSelect(m.code)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((m) => (
              <ModalityCard key={m.code} mod={m} active={m.code === activeCode} onClick={() => onSelect(m.code)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}