import React, { useState } from "react";
import { LEGAL_TEXT } from "@/data/kidsos";

export default function LegalOverlay({ onAccept }) {
  const [ok, setOk] = useState(false);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3" style={{ background: "#050C16" }}>
      <div className="kids-card p-4 w-full" style={{ maxWidth: 620, maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
        <h2 className="k-t-xl font-bold">IMPORTANT — PLEASE READ</h2>
        <div className="k-t-md mt-2 overflow-y-auto" style={{ color: "var(--k-muted)", whiteSpace: "pre-line", lineHeight: 1.6 }}>
          {LEGAL_TEXT}
        </div>
        <label className="flex items-start gap-2 mt-4 kids-tap p-2" style={{ minHeight: 48 }}>
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} style={{ width: 22, height: 22, marginTop: 2 }} />
          <span className="k-t-md">I understand and agree</span>
        </label>
        <button
          type="button"
          disabled={!ok}
          onClick={onAccept}
          className="kids-tap kids-solid k-t-md font-bold w-full mt-2"
          style={{ background: ok ? "var(--k-sky)" : "#1B2C42", color: ok ? "#04121F" : "var(--k-muted)", minHeight: 54 }}
        >
          Continue Setup →
        </button>
      </div>
    </div>
  );
}