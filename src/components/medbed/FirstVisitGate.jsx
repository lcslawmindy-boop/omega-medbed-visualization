import React, { useState, useEffect } from "react";

const STORAGE_KEY = "zarp_omega_acknowledged";

export default function FirstVisitGate() {
  const [open, setOpen] = useState(false);
  const [checks, setChecks] = useState([false, false, false]);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const allChecked = checks.every(Boolean);
  const acknowledge = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setOpen(false);
  };

  if (!open) return null;

  const confirmTexts = [
    "I understand this is a research concept only",
    "I understand this is not medical advice",
    "I understand Tier 3 modalities are frontier/theoretical research",
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center fade-in" style={{ background: "rgba(0,4,8,0.92)" }}>
      <div
        className="overflow-y-auto scroll-dark"
        style={{ maxWidth: 560, width: "92%", maxHeight: "88vh", background: "var(--bg-card)", border: "1px solid var(--gold)", borderRadius: 6, padding: 28 }}
      >
        <div className="font-display text-white text-center" style={{ fontSize: 18, letterSpacing: "0.08em" }}>
          RESEARCH DOCUMENTATION ACCESS
        </div>
        <p className="font-body text-muted text-center mt-2" style={{ fontSize: 11, lineHeight: 1.6 }}>
          The Omega MedBed ZA-MB-Ω is a conceptual engineering framework developed for research and IP development purposes only.
        </p>

        <div className="rounded-sm p-3 mt-4" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid var(--red)" }}>
          <div className="font-display mb-1.5" style={{ fontSize: 10, color: "var(--red)", letterSpacing: "0.08em" }}>IMPORTANT NOTICE</div>
          <ul className="font-body space-y-1" style={{ fontSize: 10, lineHeight: 1.5, color: "var(--text-primary)" }}>
            <li>• This is not a manufactured product.</li>
            <li>• This is not a medical device.</li>
            <li>• This is not medical advice.</li>
            <li>• No device described has been approved by the FDA, FCC, or any regulatory authority.</li>
            <li>• All modalities are documented for research and IP development only.</li>
            <li>• Tier 3 modalities represent frontier and theoretical research — ZARP does not validate or endorse underlying scientific claims.</li>
          </ul>
        </div>

        <div className="mt-4">
          <div className="font-mono text-muted uppercase mb-2" style={{ fontSize: 8, letterSpacing: "0.1em" }}>By accessing this documentation you confirm:</div>
          {confirmTexts.map((text, i) => (
            <label key={i} className="flex items-center gap-2 py-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={checks[i]}
                onChange={(e) => setChecks((c) => c.map((v, j) => (j === i ? e.target.checked : v)))}
                style={{ accentColor: "var(--gold)", width: 16, height: 16 }}
              />
              <span className="font-body" style={{ fontSize: 11, color: "var(--text-primary)" }}>{text}</span>
            </label>
          ))}
        </div>

        <button
          onClick={acknowledge}
          disabled={!allChecked}
          className="w-full font-display rounded-sm mt-4 transition-colors"
          style={{
            fontSize: 12,
            padding: "10px 0",
            background: allChecked ? "var(--gold)" : "var(--bg-elevated)",
            color: allChecked ? "#000" : "var(--text-muted)",
            border: "1px solid var(--gold)",
            letterSpacing: "0.08em",
            cursor: allChecked ? "pointer" : "not-allowed",
          }}
        >
          ACKNOWLEDGE & ENTER
        </button>
      </div>
    </div>
  );
}