import React from "react";
import { MODALITY_BY_CODE } from "@/data/modalities";
import { MODALITY_DETAILS } from "@/data/modalityDetails";

const TIER_COLORS = { T1: "#10B981", T2: "#F59E0B", T3: "#EF4444" };

export default function ModalityDetailModal({ code, onClose, onPrev, onNext }) {
  const mod = MODALITY_BY_CODE[code];
  const d = MODALITY_DETAILS[code] || {};
  if (!mod) return null;
  const tierColor = TIER_COLORS[mod.tierCode];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center fade-in"
      style={{ background: "rgba(0,4,8,0.95)" }}
      onClick={onClose}
    >
      <div
        className="relative overflow-y-auto scroll-dark"
        style={{ maxWidth: 800, width: "92%", maxHeight: "90vh", background: "var(--bg-card)", border: "1px solid var(--gold)", borderRadius: 6, padding: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gold hover:text-white transition-colors"
          style={{ fontSize: 24, lineHeight: 1 }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pr-8">
          <span
            className="font-display font-bold flex items-center justify-center flex-shrink-0"
            style={{ height: 48, minWidth: 64, fontSize: 16, color: mod.color, border: `1px solid ${mod.color}`, background: `${mod.color}20`, borderRadius: 4, letterSpacing: "0.06em" }}
          >
            {mod.code}
          </span>
          <div>
            <div className="font-display text-muted uppercase" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
              MODALITY FULL TECHNICAL RECORD
            </div>
            <div className="font-display font-bold text-white" style={{ fontSize: 24, letterSpacing: "0.02em" }}>
              {mod.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="font-body" style={{ fontSize: 10, color: mod.color, border: `1px solid ${mod.color}`, background: `${mod.color}1a`, padding: "2px 8px", borderRadius: 3 }}>
            {mod.category}
          </span>
          <span className="font-display" style={{ fontSize: 10, color: tierColor, border: `1px solid ${tierColor}`, background: `${tierColor}1a`, padding: "2px 8px", borderRadius: 3 }}>
            {mod.tier}
          </span>
          <span className="font-mono" style={{ fontSize: 10, color: "var(--green)" }}>● ACTIVE</span>
          {mod.isMaster && (
            <span className="font-display" style={{ fontSize: 9, color: "var(--gold)", border: "1px solid var(--gold)", padding: "2px 8px", borderRadius: 3 }}>
              ★ MASTER CONTROLLER
            </span>
          )}
        </div>

        <div className="my-4" style={{ height: 1, background: "linear-gradient(90deg, var(--gold), transparent)" }} />

        {/* Body — 4 data blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Block 1 — Parameters */}
          <div>
            <div className="font-display text-gold mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>PARAMETERS</div>
            <table className="w-full">
              <tbody>
                {[
                  ["Frequency / Wavelength", d.parameters?.frequency],
                  ["Delivery Method", d.parameters?.delivery],
                  ["Power / Intensity", d.parameters?.power],
                  ["Safety Limit", d.parameters?.safety],
                  ["Operating Range", d.parameters?.range],
                  ["Precision", d.parameters?.precision],
                ].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="font-mono text-muted py-1 align-top" style={{ fontSize: 9, width: "45%" }}>{k}</td>
                    <td className="font-mono py-1" style={{ fontSize: 9, color: "var(--text-primary)" }}>{v || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Block 2 — Mechanism */}
          <div>
            <div className="font-display text-gold mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>MECHANISM</div>
            <p className="font-body text-muted" style={{ fontSize: 10, lineHeight: 1.6 }}>
              {d.mechanismFull || mod.description}
            </p>
          </div>

          {/* Block 3 — Research Basis */}
          <div>
            <div className="font-display text-gold mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>RESEARCH BASIS</div>
            <div className="mb-2">
              <span className="font-display" style={{ fontSize: 12, color: tierColor, border: `1px solid ${tierColor}`, background: `${tierColor}1a`, padding: "3px 10px", borderRadius: 3 }}>
                {mod.tier}
              </span>
            </div>
            <ul className="space-y-1.5">
              {(d.citations || []).map((c, i) => (
                <li key={i} className="font-body flex items-start gap-1.5" style={{ fontSize: 9, lineHeight: 1.4, color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--gold)" }}>•</span>
                  <span>
                    {c.ref}{" "}
                    <span style={{ color: "var(--gold)", border: "1px solid var(--gold-dim)", padding: "0 4px", borderRadius: 2, fontSize: 8 }}>{c.class}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 4 — Device Integration */}
          <div>
            <div className="font-display text-gold mb-2" style={{ fontSize: 10, letterSpacing: "0.12em" }}>DEVICE INTEGRATION</div>
            <ul className="space-y-1 font-body" style={{ fontSize: 9, lineHeight: 1.5, color: "var(--text-muted)" }}>
              <li>• Zone: <span style={{ color: "var(--text-primary)" }}>{d.integration?.zone}</span></li>
              <li>• BFAC+ACE: <span style={{ color: "var(--text-primary)" }}>{d.integration?.bfac}</span></li>
              <li>• Interactions: <span style={{ color: "var(--text-primary)" }}>{d.integration?.interactions}</span></li>
              <li>• Interlocks: <span style={{ color: "var(--text-primary)" }}>{d.integration?.interlocks}</span></li>
            </ul>
          </div>
        </div>

        {/* BFAC integration diagram */}
        <div className="mt-4 rounded-sm p-3" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
          <div className="font-mono text-muted uppercase mb-2" style={{ fontSize: 8, letterSpacing: "0.1em" }}>
            BFAC INTEGRATION · 100ms CYCLE
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex flex-col items-center gap-1">
              {(d.bfacSensors || []).map((s) => (
                <span key={s} className="font-mono rounded-sm" style={{ fontSize: 8, padding: "2px 6px", background: "var(--bg-elevated)", color: "var(--green)", border: "1px solid var(--green)" }}>
                  {s}
                </span>
              ))}
            </div>
            <span style={{ color: "var(--gold)", fontSize: 18 }}>→</span>
            <span className="font-display rounded-sm px-3 py-2" style={{ fontSize: 11, color: "var(--gold)", border: "1px solid var(--gold)", background: "rgba(201,168,76,0.1)" }}>
              BFAC
            </span>
            <span style={{ color: "var(--gold)", fontSize: 18 }}>→</span>
            <span className="font-display rounded-sm px-3 py-2" style={{ fontSize: 11, color: mod.color, border: `1px solid ${mod.color}`, background: `${mod.color}1a` }}>
              {mod.code}
            </span>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="mt-4 rounded-sm p-2 text-center font-mono" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid var(--amber)", color: "var(--amber)", fontSize: 9, letterSpacing: "0.06em" }}>
          ⚠ RESEARCH PROTOTYPE — NOT MEDICAL ADVICE — {mod.tier.toUpperCase()} — SUBJECT TO MANUFACTURER VALIDATION
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={onPrev} className="font-display rounded-sm transition-colors hover:brightness-125" style={{ fontSize: 10, padding: "6px 12px", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)" }}>
            ← Previous
          </button>
          <button onClick={onClose} className="font-display rounded-sm transition-colors hover:brightness-110" style={{ fontSize: 10, padding: "6px 18px", background: "var(--gold)", color: "#000" }}>
            ✕ Close
          </button>
          <button onClick={onNext} className="font-display rounded-sm transition-colors hover:brightness-125" style={{ fontSize: 10, padding: "6px 12px", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)" }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}