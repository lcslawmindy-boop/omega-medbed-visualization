import React from "react";

export default function ClassifiedOverlay() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10"
      style={{ background: "rgba(4,8,14,0.55)" }}
    >
      <div
        className="font-display rounded"
        style={{
          fontSize: 11,
          letterSpacing: "0.2em",
          padding: "10px 16px",
          color: "#FFD9D6",
          background: "rgba(255,59,48,0.16)",
          border: "1px solid #FF3B30",
          boxShadow: "0 0 26px rgba(255,59,48,0.35)",
        }}
      >
        CLASSIFIED — RESTRICTED
      </div>
      <div className="font-mono mt-2" style={{ fontSize: 9, color: "var(--text-muted)", maxWidth: 300, lineHeight: 1.7 }}>
        Technical detail for this program is withheld. Access is limited to
        credentialed partners under executed NDA.
      </div>
    </div>
  );
}