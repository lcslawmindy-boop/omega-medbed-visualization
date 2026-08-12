import React, { useState } from "react";

const ACKS = [
  "I understand this is a research and IP development concept only",
  "I understand this is not medical advice and not a substitute for clinical care",
  "I understand Tier 3 systems are frontier research — not validated by ZARP",
];

const ALERT_LINES = [
  "All therapy systems shown are conceptual multi-system integration frameworks",
  "Pediatric parameter values are conservative planning estimates only",
  "Tier 3 modalities are frontier/research basis — not validated by ZARP or Aethon",
  "No child should use any device based on this documentation without appropriate regulatory clearance and clinical oversight",
  "All third-party research remains copyright of respective authors and estates",
];

export default function BsFirstVisitGate({ onAccept }) {
  const [checked, setChecked] = useState([false, false, false]);
  const [leaving, setLeaving] = useState(false);
  const ready = checked.every(Boolean);

  const accept = () => {
    setLeaving(true);
    localStorage.setItem("bs_gate_acknowledged", "true");
    setTimeout(onAccept, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 overflow-y-auto bs-scroll"
      style={{ background: "rgba(7,11,20,0.96)", opacity: leaving ? 0 : 1, transition: "opacity 300ms ease" }}
    >
      <div
        className="w-full my-auto"
        style={{ maxWidth: 560, background: "var(--bg-card)", border: "2px solid var(--sky)", borderRadius: 16, padding: 28 }}
      >
        <div className="flex justify-center">
          <svg width="40" height="40" viewBox="0 0 22 22" aria-hidden="true">
            <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.2" />
            <circle cx="11" cy="7.5" r="2.2" fill="#38BDF8" />
            <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" />
          </svg>
        </div>
        <div className="font-display font-bold text-sky text-center mt-2" style={{ fontSize: 18, letterSpacing: "0.05em" }}>
          BRIGHTSTEPS RESEARCH ACCESS
        </div>
        <div className="font-display text-center" style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
          BS-ATP-Ω — ASD Therapy Pod
        </div>
        <div style={{ height: 1, background: "var(--sky)", opacity: 0.5, margin: "14px 0" }} />

        <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
          The BrightSteps ASD Therapy Pod BS-ATP-Ω is a conceptual engineering framework developed for research and IP development purposes only.
        </p>
        <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, marginTop: 10 }}>
          It is not a manufactured product. It is not a medical device. It has not been approved by the FDA, FCC, or any regulatory authority for therapeutic, clinical, or consumer use with children or any other population.
        </p>
        <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, marginTop: 10 }}>
          ASD interventions should always involve qualified clinical professionals. This documentation is not a substitute for professional medical evaluation, diagnosis, or treatment.
        </p>

        <div className="rounded-lg p-3 mt-3" style={{ background: "var(--bg-card)", border: "1px solid var(--coral)" }}>
          <div className="font-display" style={{ fontSize: 10, color: "var(--coral)", letterSpacing: "0.08em" }}>
            IMPORTANT — PEDIATRIC RESEARCH CONCEPT
          </div>
          <ul className="mt-1.5 pl-4" style={{ margin: 0 }}>
            {ALERT_LINES.map((l) => (
              <li key={l} className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{l}</li>
            ))}
          </ul>
        </div>

        <div className="mt-3 space-y-1">
          {ACKS.map((a, i) => (
            <button
              key={a}
              onClick={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              className="w-full flex items-start gap-2 text-left py-1.5"
              style={{ minHeight: 40 }}
            >
              <span
                className="flex-none rounded"
                style={{ width: 16, height: 16, marginTop: 1, border: "1px solid var(--sky)", background: checked[i] ? "var(--sky)" : "transparent", color: "#04121F", fontSize: 11, lineHeight: "15px", textAlign: "center" }}
              >
                {checked[i] ? "✓" : ""}
              </span>
              <span className="font-body" style={{ fontSize: 11.5, color: "var(--text-primary)", lineHeight: 1.5 }}>{a}</span>
            </button>
          ))}
        </div>

        <button
          disabled={!ready}
          onClick={accept}
          className="font-display w-full mt-3 transition-all"
          style={{
            fontSize: 14, padding: "15px 0", borderRadius: 12, letterSpacing: "0.06em", minHeight: 52,
            background: ready ? "var(--sky)" : "var(--bg-elevated)",
            color: ready ? "#04121F" : "var(--text-muted)",
            boxShadow: ready ? "0 0 16px rgba(56,189,248,0.35)" : "none",
          }}
        >
          ACKNOWLEDGE &amp; ACCESS BRIGHTSTEPS
        </button>
      </div>
    </div>
  );
}