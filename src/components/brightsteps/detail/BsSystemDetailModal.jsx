import React from "react";
import { BS_NAV_SYSTEMS } from "@/data/brightstepsNav";
import { BS_DETAILS } from "@/data/brightstepsDetails";
import { AGE_GROUPS } from "@/data/brightstepsNav";
import DetailBlock from "./DetailBlock";
import KidsOsFlow from "./KidsOsFlow";

const TIER_COLOR = { T1: "var(--green)", T2: "var(--amber)", T3: "var(--coral)" };

function Badge({ children, color }) {
  return (
    <span className="font-display rounded-full px-2 py-0.5 flex items-center gap-1" style={{ fontSize: 8, color, border: `1px solid ${color}`, letterSpacing: "0.06em" }}>
      {children}
    </span>
  );
}

export default function BsSystemDetailModal({ code, onClose, onCycle }) {
  const sys = BS_NAV_SYSTEMS.find((s) => s.code === code);
  const d = BS_DETAILS[code];
  if (!sys || !d) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3"
      style={{ background: "rgba(7, 11, 20, 0.95)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bs-scroll w-full overflow-y-auto"
        style={{ maxWidth: 820, maxHeight: "92vh", background: "var(--bg-card)", border: "1px solid var(--sky)", borderTop: "3px solid var(--sky)", borderRadius: 12, padding: 24 }}
      >
        {/* HEADER */}
        <div className="flex items-start gap-3">
          <span
            className="font-display font-bold flex-none flex items-center justify-center rounded-lg"
            style={{ height: 52, minWidth: 72, fontSize: 16, color: sys.color, background: `${sys.color}22`, border: `1px solid ${sys.color}` }}
          >
            {sys.code}
          </span>
          <div className="min-w-0">
            <div className="font-display" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.14em" }}>
              THERAPY SYSTEM TECHNICAL RECORD
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 22 22" aria-hidden="true" className="flex-none">
                <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.6" />
                <circle cx="11" cy="7.5" r="2.4" fill="#38BDF8" />
                <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" />
              </svg>
              <h2 className="font-display font-bold m-0" style={{ fontSize: 26, color: "var(--text-primary)", lineHeight: 1.2 }}>{sys.name}</h2>
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              <Badge color={sys.color}>{d.domain.toUpperCase()}</Badge>
              <Badge color={TIER_COLOR[sys.tier]}>TIER {sys.tier.slice(1)}</Badge>
              <Badge color="var(--teal)">● PEDIATRIC SCALED</Badge>
              <Badge color="var(--green)">● ACTIVE</Badge>
            </div>
          </div>
        </div>
        <div className="my-4" style={{ height: 1, background: "var(--sky)", opacity: 0.5 }} />

        {/* BLOCK 1 */}
        <DetailBlock title="PARAMETERS">
          {d.params.map(([k, v], i) => (
            <div key={k} className="flex items-start gap-3 px-2 py-1" style={{ background: i % 2 ? "var(--bg-elevated)" : "transparent" }}>
              <span className="font-mono flex-none" style={{ fontSize: 10, color: "var(--text-muted)", width: 180 }}>{k}</span>
              <span className={`font-mono flex-1 ${k === "Pediatric Intensity" ? "font-bold" : ""}`} style={{ fontSize: 10, color: k === "Pediatric Intensity" ? "var(--sky)" : "var(--text-primary)" }}>{v}</span>
            </div>
          ))}
          <div className="flex items-start gap-3 px-2 py-1">
            <span className="font-mono flex-none" style={{ fontSize: 10, color: "var(--text-muted)", width: 180 }}>Adult Omega Intensity</span>
            <span className="flex-1">
              <span className="font-mono" style={{ fontSize: 10, color: "var(--coral)", textDecoration: "line-through" }}>{d.adult}</span>
              <span className="font-body block" style={{ fontSize: 8.5, color: "var(--coral)" }}>↑ Adult limit locked in KIDS-OS</span>
            </span>
          </div>
          <div className="flex items-center gap-3 px-2 py-1" style={{ background: "var(--bg-elevated)" }}>
            <span className="font-mono flex-none" style={{ fontSize: 10, color: "var(--text-muted)", width: 180 }}>Age Group Scaling</span>
            <span className="flex gap-1">
              {AGE_GROUPS.map((a) => (
                <span key={a} className="font-mono rounded px-1.5" style={{ fontSize: 9, color: "var(--sky)", border: "1px solid var(--sky-dim)" }}>{a}</span>
              ))}
            </span>
          </div>
        </DetailBlock>

        {/* BLOCK 2 */}
        <DetailBlock title="MECHANISM">
          <p className="font-body m-0" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.65 }}>{d.mechanism}</p>
          <div className="bs-card mt-2 p-3" style={{ borderColor: "var(--sky)", background: "rgba(56,189,248,0.06)" }}>
            <div className="font-display mb-1" style={{ fontSize: 9, color: "var(--sky)", letterSpacing: "0.1em" }}>ASD-SPECIFIC MECHANISM</div>
            <p className="font-body m-0" style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.65 }}>{d.asd}</p>
          </div>
        </DetailBlock>

        {/* BLOCK 3 */}
        <DetailBlock title="RESEARCH BASIS">
          <span className="font-display inline-block rounded px-2.5 py-1 mb-2" style={{ fontSize: 12, color: TIER_COLOR[sys.tier], border: `1px solid ${TIER_COLOR[sys.tier]}`, letterSpacing: "0.08em" }}>
            TIER {sys.tier.slice(1)}
          </span>
          <ul className="m-0 pl-4">
            {d.research.map((r) => (
              <li key={r} className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.7 }}>{r}</li>
            ))}
          </ul>
        </DetailBlock>

        {/* BLOCK 4 */}
        <DetailBlock title="PEDIATRIC DEVICE INTEGRATION">
          <ul className="m-0 pl-4">
            {d.integration.map((r) => (
              <li key={r} className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.7 }}>{r}</li>
            ))}
          </ul>
          <KidsOsFlow code={sys.code} color={sys.color} />
        </DetailBlock>

        {/* FOOTER */}
        <div className="rounded-lg p-2.5" style={{ border: "1px solid var(--amber)", background: "rgba(251,191,36,0.08)" }}>
          <p className="font-body m-0" style={{ fontSize: 9, color: "var(--amber)", lineHeight: 1.6 }}>
            ⚠ RESEARCH CONCEPT — NOT MEDICAL ADVICE — TIER {sys.tier.slice(1)} — PEDIATRIC PARAMETER SCALING ACTIVE — Subject to manufacturer validation and pediatric regulatory review
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <button onClick={() => onCycle(-1)} className="font-display rounded-md" style={{ fontSize: 9, padding: "8px 10px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 40 }}>← Previous System</button>
          <button onClick={onClose} className="font-display rounded-md" style={{ fontSize: 10, padding: "8px 18px", background: "var(--sky)", color: "#04121F", minHeight: 40 }}>✕ Close</button>
          <button onClick={() => onCycle(1)} className="font-display rounded-md" style={{ fontSize: 9, padding: "8px 10px", color: "var(--sky)", border: "1px solid var(--sky-dim)", minHeight: 40 }}>Next System →</button>
        </div>
      </div>
    </div>
  );
}