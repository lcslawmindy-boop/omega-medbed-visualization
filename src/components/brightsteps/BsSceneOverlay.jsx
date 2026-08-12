import React from "react";
import { BS_SYSTEMS, POD_MODES } from "@/data/brightsteps";

export default function BsSceneOverlay({ activeCode, onHighlight, onView, podModeIdx, onPodMode }) {
  const mode = POD_MODES[podModeIdx];
  return (
    <>
      {/* Top-left badge */}
      <div
        className="absolute top-2 left-2 z-20 px-2.5 py-1.5 rounded-md no-select"
        style={{ background: "rgba(14,21,37,0.85)", border: "1px solid var(--border)", backdropFilter: "blur(4px)" }}
      >
        <span className="font-display" style={{ fontSize: 9, color: "var(--sky)", letterSpacing: "0.08em" }}>
          BS-ATP-Ω | 12 THERAPY SYSTEMS | KIDS-OS <span style={{ color: "var(--green)" }}>● ONLINE</span>
        </span>
      </div>

      {/* Highlight buttons top-right */}
      <div className="absolute top-2 right-2 z-20 no-select hidden sm:block" style={{ maxWidth: 190 }}>
        <div className="font-display text-right mb-1" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>HIGHLIGHT SYSTEM:</div>
        <div className="flex flex-wrap gap-1 justify-end">
          {BS_SYSTEMS.map((s) => {
            const on = s.code === activeCode;
            return (
              <button
                key={s.code}
                onClick={() => onHighlight(s.code)}
                className="font-display rounded-md transition-all"
                style={{
                  fontSize: 8, padding: "4px 6px", letterSpacing: "0.04em",
                  color: on ? "#04121F" : s.color,
                  background: on ? s.color : "rgba(14,21,37,0.85)",
                  border: `1px solid ${s.color}`,
                  minHeight: 24,
                }}
              >
                {s.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pod mode selector bottom-center */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 no-select"
        style={{ background: "rgba(14,21,37,0.88)", border: "1px solid var(--border)", borderRadius: 20, backdropFilter: "blur(4px)", maxWidth: "94%" }}
      >
        <button onClick={() => onPodMode((podModeIdx - 1 + POD_MODES.length) % POD_MODES.length)} className="text-sky flex-none" style={{ fontSize: 14, minWidth: 32, minHeight: 32 }} aria-label="Previous mode">◀</button>
        <div className="flex flex-col items-center leading-tight min-w-0">
          <span className="font-display truncate" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>POD MODE</span>
          <span className="font-display truncate" style={{ fontSize: 11, color: mode.color, letterSpacing: "0.06em" }}>{mode.name.toUpperCase()}</span>
        </div>
        <button onClick={() => onPodMode((podModeIdx + 1) % POD_MODES.length)} className="text-sky flex-none" style={{ fontSize: 14, minWidth: 32, minHeight: 32 }} aria-label="Next mode">▶</button>
      </div>

      {/* View controls bottom-left */}
      <div
        className="absolute bottom-2 left-2 z-20 flex gap-1 px-2 py-1 no-select"
        style={{ background: "rgba(14,21,37,0.88)", border: "1px solid var(--border)", borderRadius: 20 }}
      >
        {[["reset", "⟲ Reset"], ["front", "Front"], ["side", "Side"], ["top", "Top"]].map(([k, label]) => (
          <button
            key={k}
            onClick={() => onView(k)}
            className="font-display rounded-full transition-colors hover:text-sky"
            style={{ fontSize: 9, padding: "5px 9px", color: "var(--text-muted)", minHeight: 30 }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Classification badge bottom-right */}
      <div className="absolute bottom-24 sm:bottom-2 right-2 z-20 px-2 py-1 rounded-md no-select" style={{ border: "1px solid var(--research-red)", background: "rgba(14,21,37,0.85)" }}>
        <span className="font-display" style={{ fontSize: 7.5, color: "var(--research-red)", letterSpacing: "0.08em" }}>CONCEPT — NOT A MEDICAL DEVICE</span>
      </div>
    </>
  );
}