import React from "react";
import { BS_NAV_SYSTEMS } from "@/data/brightstepsNav";
import { PARENT_NAMES, PARENT_CONTENT } from "@/data/brightstepsProtocols";

const LABELS = [
  ["What your child will experience:", "var(--sky)"],
  ["What we're working toward:", "var(--teal)"],
  ["Safety features:", "var(--green)"],
];

export default function ParentSystemCards({ activeCode, onSelect }) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
      {BS_NAV_SYSTEMS.map((s) => {
        const content = PARENT_CONTENT[s.code] || [];
        return (
          <button
            key={s.code}
            id={`bs-card-${s.code}`}
            onClick={() => onSelect(s.code)}
            className={`bs-card text-left p-4 ${s.code === activeCode ? "active" : ""}`}
            style={{ background: "var(--bg-card)", borderRadius: 16, borderTop: `3px solid ${s.color}` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block rounded-full" style={{ width: 10, height: 10, background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <span className="font-kid font-bold" style={{ fontSize: 14, color: "var(--text-primary)" }}>
                {PARENT_NAMES[s.code]}
              </span>
            </div>
            {content.map((c, i) => (
              <div key={i} className="mb-1.5">
                <div className="font-kid font-bold" style={{ fontSize: 11, color: LABELS[i][1] }}>{LABELS[i][0]}</div>
                <p className="font-body m-0" style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{c}</p>
              </div>
            ))}
          </button>
        );
      })}
    </div>
  );
}