import React from "react";

/**
 * Blurs and locks proprietary content (patent claims, trade secrets,
 * component configuration) behind a CLASSIFIED seal.
 */
export default function RestrictedSection({ label = "IP RESTRICTED — NDA REQUIRED", note, children }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        aria-hidden="true"
        className="pointer-events-none select-none"
        style={{ filter: "blur(7px)", opacity: 0.5 }}
      >
        {children}
      </div>
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
          {label}
        </div>
        <div className="font-mono mt-2" style={{ fontSize: 9, color: "var(--text-muted)", maxWidth: 320, lineHeight: 1.7 }}>
          {note || "Patent claims, trade secrets and hardware configuration are withheld. Access is limited to credentialed partners under executed NDA."}
        </div>
      </div>
    </div>
  );
}