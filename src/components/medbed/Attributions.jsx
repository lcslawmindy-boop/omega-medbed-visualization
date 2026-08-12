import React, { useState } from "react";

const ATTRIBUTIONS = [
  "Royal Rife — original research (1930s)",
  "Antoine Prioré — French Patent 1,342,772 (1962); ONR Report R-5-78",
  "Tom Bearden — Scalar EM theoretical framework",
  "Wilhelm Reich — Orgone accumulator research",
  "Viktor Schauberger — Repulsine/vortex archives",
  "Dr. Hartmut Müller — Global Scaling Theory (1982)",
  "G-Com® — Oct 27, 2001 demonstration",
  "Vedic nada Brahma — traditional knowledge",
  "Tomatis Method (1950s-90s) — Alfred Tomatis",
  "Grad B. (1965) — Int. J. Biometeorology",
  "Lisitsyn frequency tables",
  "Kaznacheyev cytopathogenic effect research",
  "NASA LED PBM clinical study",
  "Monroe Institute — Hemisync® (registered trademark)",
  "All FDA-cleared device brands referenced (NeuroThera, Vielight, Orthofix, Bemer, Alpha-Stim, Sota, BrainMaster, NeuroField) remain trademarks of their respective owners.",
];

export default function Attributions() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full font-display rounded-sm transition-colors hover:brightness-125"
        style={{ fontSize: 10, padding: "8px 0", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)", letterSpacing: "0.08em" }}
      >
        {open ? "− RESEARCH ATTRIBUTIONS & COPYRIGHT" : "+ RESEARCH ATTRIBUTIONS & COPYRIGHT"}
      </button>
      {open && (
        <div className="mt-2 rounded-sm p-5 fade-in" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="font-display text-gold mb-2" style={{ fontSize: 11, letterSpacing: "0.1em" }}>THIRD-PARTY RESEARCH ATTRIBUTIONS</div>
          <p className="font-body text-muted" style={{ fontSize: 10, lineHeight: 1.6 }}>
            All third-party works referenced in this documentation remain the exclusive copyright of their respective authors, estates, or publishing institutions. ZARP and Aethon Apex IP Holdings LLC make no claim of ownership over any third-party research, patent, or publication referenced herein.
          </p>
          <div className="font-mono text-muted uppercase mt-3 mb-1" style={{ fontSize: 8, letterSpacing: "0.1em" }}>Referenced works include but are not limited to:</div>
          <ul className="font-body space-y-0.5" style={{ fontSize: 9, lineHeight: 1.5, color: "var(--text-muted)" }}>
            {ATTRIBUTIONS.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
          <p className="font-body text-muted mt-3" style={{ fontSize: 10, lineHeight: 1.6 }}>
            ZARP Omega MedBed — Conceptual engineering documentation for research and IP development purposes only. ZARP does not validate or endorse the underlying scientific claims of any modality.
          </p>
          <div className="font-mono mt-2" style={{ fontSize: 9, color: "var(--gold)" }}>
            © 2026 Aethon Apex IP Holdings LLC — Henderson, Nevada 89002 — Zenith Apex Research Division
          </div>
        </div>
      )}
    </div>
  );
}