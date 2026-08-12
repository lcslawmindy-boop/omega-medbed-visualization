import React from "react";
import { BS_SYSTEMS } from "@/data/brightsteps";

export default function BsSystemCards({ mode, activeCode, onSelect }) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))" }}>
      {BS_SYSTEMS.map((s) => {
        const on = s.code === activeCode;
        const body = mode === "parent" ? s.parent : mode === "technical" ? s.technical : s.clinician;
        return (
          <button
            key={s.code}
            id={`bs-card-${s.code}`}
            onClick={() => onSelect(s.code)}
            className={`bs-card text-left p-3 ${on ? "active" : ""}`}
            style={{ background: "var(--bg-card)", borderTop: `3px solid ${s.color}` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
              <span className="font-display" style={{ fontSize: 10, color: s.color, letterSpacing: "0.06em" }}>{s.code}</span>
              <span className={`flex-1 truncate ${mode === "parent" ? "font-kid font-bold" : "font-body font-semibold"}`} style={{ fontSize: 12, color: "var(--text-primary)" }}>
                {s.name}
              </span>
              {s.isMaster && <span style={{ fontSize: 10, color: "var(--green)" }}>★</span>}
            </div>
            {mode !== "parent" && (
              <div className="font-mono mb-1.5" style={{ fontSize: 8.5, color: "var(--sky)" }}>{s.spec}</div>
            )}
            <p className={mode === "parent" ? "font-kid" : "font-body"} style={{ fontSize: mode === "parent" ? 11 : 10, color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
              {body}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {s.mechanism.map((m) => (
                <span key={m} className="font-display rounded-md px-1.5 py-0.5" style={{ fontSize: 7.5, color: s.color, border: `1px solid ${s.color}44`, letterSpacing: "0.06em" }}>
                  {m.toUpperCase()}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}