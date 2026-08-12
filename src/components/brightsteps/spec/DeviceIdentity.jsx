import React from "react";

function BsMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.2" opacity="0.7" />
      <circle cx="11" cy="7.5" r="2.2" fill="#38BDF8" />
      <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" opacity="0.85" />
    </svg>
  );
}

const BADGES = [
  { label: "CONCEPT", color: "var(--amber)" },
  { label: "12 SYSTEMS", color: "var(--sky)" },
  { label: "KIDS-OS ONLINE", color: "var(--green)" },
];

export default function DeviceIdentity() {
  return (
    <div className="p-4" style={{ borderTop: "3px solid var(--sky)" }}>
      <BsMark />
      <div className="font-display font-bold text-sky mt-1" style={{ fontSize: 22, letterSpacing: "0.03em", lineHeight: 1.1 }}>
        BRIGHTSTEPS
      </div>
      <div className="font-display" style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.08em" }}>
        ASD THERAPY POD
      </div>
      <div className="font-mono" style={{ fontSize: 14, color: "var(--gold)" }}>BS-ATP-Ω</div>

      <div className="flex flex-wrap gap-1 mt-2.5">
        {BADGES.map((b) => (
          <span
            key={b.label}
            className="font-display rounded-full px-2 py-0.5 flex items-center gap-1"
            style={{ fontSize: 8, color: b.color, border: `1px solid ${b.color}`, letterSpacing: "0.06em" }}
          >
            <span className="bs-pulse inline-block rounded-full" style={{ width: 5, height: 5, background: b.color }} />
            {b.label}
          </span>
        ))}
      </div>

      <div className="font-mono mt-2.5" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.6 }}>
        BS-ENG-ATP-OMEGA-A-PRD<br />Rev A · 2026-08-12
      </div>
    </div>
  );
}