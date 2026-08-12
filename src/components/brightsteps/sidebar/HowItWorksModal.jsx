import React from "react";

const STEPS = [
  { n: "1", t: "Profile the child", d: "Age group and protocol intensity are selected. KIDS-OS scales every modality parameter to pediatric envelopes — adult MedBed values are never used." },
  { n: "2", t: "Baseline capture", d: "Five biometric channels (HRV, SpO₂, EEG, GSR, core temp) establish a resting baseline before any modality energizes." },
  { n: "3", t: "Pod mode selection", d: "The clinician picks a session goal — sensory regulation, sleep induction, focus, and more. Each mode blends a specific set of the 12 systems." },
  { n: "4", t: "Closed-loop adaptation", d: "The ACE adaptive engine re-evaluates coherence every 100ms and modulates intensity in real time as the child settles." },
  { n: "5", t: "Continuous supervision", d: "The BFAC safety engine independently monitors faults, leakage, and thermal limits with a sub-100ms interlock cutoff." },
];

export default function HowItWorksModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-4"
      style={{ background: "rgba(7,11,20,0.82)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl overflow-hidden fade-in"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--sky-dim)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div>
            <div className="font-display text-sky" style={{ fontSize: 12, letterSpacing: "0.1em" }}>HOW BRIGHTSTEPS WORKS</div>
            <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>BS-ATP-Ω · concept overview</div>
          </div>
          <button onClick={onClose} className="text-sky" style={{ fontSize: 18, minWidth: 40, minHeight: 40 }} aria-label="Close">✕</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto bs-scroll px-4 py-3 space-y-3">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-2.5">
              <span
                className="font-display flex-none rounded-full text-center"
                style={{ fontSize: 9, width: 20, height: 20, lineHeight: "20px", color: "#04121F", background: "var(--sky)" }}
              >
                {s.n}
              </span>
              <div>
                <div className="font-body font-semibold" style={{ fontSize: 11, color: "var(--text-primary)" }}>{s.t}</div>
                <div className="font-body" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.55 }}>{s.d}</div>
              </div>
            </div>
          ))}
          <div className="font-mono pt-1" style={{ fontSize: 8, color: "var(--research-red)", lineHeight: 1.6 }}>
            CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE
          </div>
        </div>
      </div>
    </div>
  );
}