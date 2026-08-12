import React from "react";
import { BS_SESSIONS } from "@/data/brightsteps";

export default function BsSessionLogModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" style={{ background: "rgba(7,11,20,0.8)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-xl overflow-hidden fade-in"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--sky-dim)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="font-display text-sky" style={{ fontSize: 12, letterSpacing: "0.1em" }}>SESSION LOG</div>
            <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>Concept demonstration data — simulated</div>
          </div>
          <button onClick={onClose} className="text-sky" style={{ fontSize: 18, minWidth: 40, minHeight: 40 }} aria-label="Close">✕</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto bs-scroll">
          {BS_SESSIONS.map((s, i) => (
            <div key={i} className="px-4 py-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between">
                <span className="font-display" style={{ fontSize: 10, color: "var(--sky)", letterSpacing: "0.05em" }}>{s.mode.toUpperCase()}</span>
                <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{s.date}</span>
              </div>
              <div className="flex gap-3 mt-1 font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>
                <span>⏱ {s.dur}</span>
                <span style={{ color: "var(--green)" }}>◎ {s.coherence}</span>
                <span style={{ color: "var(--coral)" }}>♥ {s.hrv}</span>
              </div>
              <div className="font-body mt-1" style={{ fontSize: 9.5, color: "var(--text-primary)" }}>{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}