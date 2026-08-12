import React from "react";

const LEGAL =
  "ZARP OMEGA MEDBED ZA-MB-Ω — Conceptual engineering documentation for research and IP development purposes only. ZARP does not validate or endorse the underlying scientific claims of any modality. Not medical advice. All third-party works remain the exclusive copyright of their respective authors or estates. No device described herein has been approved by the FDA, FCC, or any regulatory body for medical, therapeutic, commercial, or consumer use. Classified as Class III medical device concept under FDA 21 CFR Part 880 — research prototype only. Subject to IRB approval and 510(k) clearance prior to any patient use. © 2026 Aethon Apex IP Holdings LLC — Henderson, Nevada 89002 · Zenith Apex Research Division · ";

export default function LegalFooter() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-[100] flex flex-col bg-panel"
      style={{ height: 40, borderTop: "1px solid var(--red-dark)" }}
    >
      <div className="overflow-hidden flex items-center" style={{ height: 26 }}>
        <div className="marquee-track font-body" style={{ fontSize: 8, color: "var(--text-muted)", padding: "3px 0", letterSpacing: "0.04em" }}>
          {LEGAL}
          {LEGAL}
        </div>
      </div>
      <div className="text-center font-body" style={{ fontSize: 8, color: "var(--text-muted)", padding: "1px 0", letterSpacing: "0.02em" }}>
        All third-party works referenced remain the exclusive copyright of their respective authors or estates. © 2026 Aethon Apex IP Holdings LLC.
      </div>
    </footer>
  );
}