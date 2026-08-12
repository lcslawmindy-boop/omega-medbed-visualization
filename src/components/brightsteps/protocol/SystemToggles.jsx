import React from "react";
import { BS_NAV_SYSTEMS } from "@/data/brightstepsNav";
import { T3_CODES } from "@/data/brightstepsProtocols";

export default function SystemToggles({ on, onToggle }) {
  const t3On = T3_CODES.some((c) => on[c]);
  return (
    <div>
      <div className="rounded-md p-2 mb-2" style={{ border: "1px solid var(--amber)", background: "rgba(251,191,36,0.08)" }}>
        <p className="font-body m-0" style={{ fontSize: 8.5, color: "var(--amber)", lineHeight: 1.55 }}>
          Custom protocols should be supervised by a qualified clinical professional.
        </p>
      </div>
      {BS_NAV_SYSTEMS.map((s) => (
        <button
          key={s.code}
          onClick={() => onToggle(s.code)}
          className="w-full flex items-center gap-2 py-1.5 text-left"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span
            className="flex-none rounded-full flex items-center px-0.5"
            style={{ width: 26, height: 14, background: on[s.code] ? s.color : "var(--bg-elevated)", border: `1px solid ${on[s.code] ? s.color : "var(--border)"}`, justifyContent: on[s.code] ? "flex-end" : "flex-start" }}
          >
            <span className="rounded-full" style={{ width: 10, height: 10, background: on[s.code] ? "#04121F" : "var(--text-muted)" }} />
          </span>
          <span className="font-display flex-none" style={{ fontSize: 9, color: s.color, width: 34 }}>{s.code}</span>
          <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{s.name}</span>
        </button>
      ))}
      {t3On && (
        <div className="rounded-md p-2 mt-2" style={{ border: "1px solid var(--amber)", background: "rgba(251,191,36,0.1)" }}>
          <p className="font-body m-0" style={{ fontSize: 9, color: "var(--amber)" }}>⚠ Tier 3 frontier/research system enabled</p>
        </div>
      )}
    </div>
  );
}