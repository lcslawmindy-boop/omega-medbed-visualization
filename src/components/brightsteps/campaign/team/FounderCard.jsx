import React from "react";
import { FOUNDER, GOLD } from "@/data/campaignTeam";

export default function FounderCard() {
  return (
    <div className="bs-card p-4 flex flex-col md:flex-row gap-4" style={{ background: "var(--bg-panel)", border: `1px solid ${GOLD}` }}>
      <div className="flex-none flex md:block justify-center" style={{ width: 160 }}>
        <div
          className="font-display flex items-center justify-center rounded-full"
          style={{ width: 160, height: 160, border: `4px solid ${GOLD}`, color: GOLD, fontSize: 40, background: "var(--bg-card)" }}
        >
          {FOUNDER.initials}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display font-bold" style={{ fontSize: 22, color: "var(--text-primary)" }}>{FOUNDER.name}</div>
        <div className="font-body" style={{ fontSize: 13, color: GOLD }}>{FOUNDER.title}</div>
        <div className="font-body" style={{ fontSize: 11, color: "var(--text-muted)" }}>{FOUNDER.location}</div>

        <div className="mt-3 space-y-2">
          {FOUNDER.statement.map((p, i) => (
            <p key={i} className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>{p}</p>
          ))}
        </div>

        <div style={{ height: 1, background: GOLD, opacity: 0.5, margin: "14px 0" }} />

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="space-y-1">
          {FOUNDER.credentials.map((c) => (
            <li key={c} className="font-body flex gap-1.5" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.55 }}>
              <span style={{ color: GOLD }}>•</span>{c}
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap gap-3">
          {FOUNDER.emails.map((e) => (
            <a key={e} href={`mailto:${e}`} className="font-mono" style={{ fontSize: 10.5, color: GOLD }}>📧 {e}</a>
          ))}
        </div>
      </div>
    </div>
  );
}