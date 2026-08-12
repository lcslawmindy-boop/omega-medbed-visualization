import React, { useState, useMemo } from "react";
import { BS_SYSTEMS } from "@/data/brightsteps";
import { BS_DETAILS } from "@/data/brightstepsDetails";
import { OUTCOMES_CLINICIAN } from "@/data/brightstepsSpec";

function search(q) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const out = [];

  BS_SYSTEMS.forEach((sys) => {
    const d = BS_DETAILS[sys.code];
    const hay = [sys.name, sys.code, sys.spec, d ? d.params.map((p) => p.join(" ")).join(" ") : ""].join(" ").toLowerCase();
    if (hay.includes(s)) out.push({ kind: "system", code: sys.code, color: sys.color, label: sys.name, sub: sys.spec });
  });

  OUTCOMES_CLINICIAN.forEach((o) => {
    if (o.toLowerCase().includes(s)) out.push({ kind: "outcome", code: "BIO", color: "#2DD4BF", label: o, sub: "Target outcome" });
  });

  Object.entries(BS_DETAILS).forEach(([code, d]) => {
    d.research.forEach((r) => {
      if (r.toLowerCase().includes(s)) out.push({ kind: "research", code, color: "#94A3B8", label: r, sub: `${code} research basis` });
    });
  });

  return out.slice(0, 12);
}

export default function BsSearch({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const results = useMemo(() => search(q), [q]);

  return (
    <div className="relative flex items-center flex-none">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-display rounded-md"
        style={{ fontSize: 12, padding: "7px 9px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 36 }}
        aria-label="Search therapy systems"
      >
        🔍
      </button>
      {open && (
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search therapy systems, frequencies, researchers, outcomes..."
          className="font-body outline-none rounded-md ml-1.5"
          style={{ width: 240, height: 40, fontSize: 11, padding: "0 10px", background: "var(--bg-panel)", border: "1px solid var(--sky)", color: "var(--text-primary)" }}
        />
      )}
      {open && q.trim() && (
        <div
          className="absolute right-0 rounded-md overflow-y-auto bs-scroll z-[210]"
          style={{ top: "100%", marginTop: 6, width: 320, maxHeight: 320, background: "var(--bg-elevated)", border: "1px solid var(--sky)" }}
        >
          {results.length === 0 && (
            <div className="font-body px-3 py-2" style={{ fontSize: 10, color: "var(--text-muted)" }}>No matches</div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.kind}-${r.label}-${i}`}
              onClick={() => { onSelect(r.code); setOpen(false); setQ(""); }}
              className="w-full flex items-start gap-2 px-2.5 py-2 text-left"
              style={{ borderBottom: "1px solid var(--border)", minHeight: 40 }}
            >
              {r.kind === "research" ? (
                <span style={{ fontSize: 10 }}>📖</span>
              ) : (
                <span className="flex-none rounded-full" style={{ width: 8, height: 8, marginTop: 3, background: r.color }} />
              )}
              <span className="flex-1 min-w-0">
                <span className="font-body block truncate" style={{ fontSize: 10.5, color: "var(--text-primary)" }}>{r.label}</span>
                <span className="font-mono block truncate" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{r.sub}</span>
              </span>
              <span className="font-display flex-none" style={{ fontSize: 8.5, color: r.color }}>{r.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}