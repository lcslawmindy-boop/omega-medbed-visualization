import React from "react";

const LEGAL =
  "BRIGHTSTEPS ASD THERAPY POD BS-ATP-Ω — Conceptual engineering documentation for research and IP development purposes only. Not a manufactured product. Not a medical device. Not approved by FDA, FCC, or any regulatory authority for therapeutic, clinical, or consumer use. All therapeutic modalities described are conceptual system integration frameworks. Not medical advice. Not a substitute for professional medical evaluation or treatment. ASD interventions should always involve qualified clinical professionals. © 2026 Aethon Apex IP Holdings LLC — Henderson, Nevada 89002 — Zenith Apex Research Division ·  ";

export default function BsFooter() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[100] flex items-center overflow-hidden safe-bottom no-select"
      style={{
        height: "calc(40px + env(safe-area-inset-bottom))",
        background: "var(--bg-panel)",
        borderTop: "1px solid rgba(204, 34, 0, 0.6)",
      }}
    >
      <div className="marquee-track font-body" style={{ fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
        {LEGAL}
        {LEGAL}
      </div>
    </footer>
  );
}