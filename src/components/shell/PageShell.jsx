import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/brightsteps.css";

export default function PageShell({ title, subtitle, accent = "var(--sky, #38BDF8)", children }) {
  const navigate = useNavigate();
  return (
    <div className="bs-root fixed inset-0 overflow-y-auto bs-scroll" style={{ background: "var(--bg-primary, #070B14)" }}>
      <header
        className="sticky top-0 z-10 flex items-center gap-3 px-3 safe-top"
        style={{ height: "calc(60px + env(safe-area-inset-top))", background: "var(--bg-panel)", borderBottom: "1px solid var(--border)" }}
      >
        <button onClick={() => navigate(-1)} aria-label="Back" style={{ fontSize: 18, color: accent, minWidth: 40, minHeight: 44 }}>←</button>
        <div className="min-w-0 flex-1">
          <div className="font-display truncate" style={{ fontSize: 13, color: accent, letterSpacing: "0.1em" }}>{title}</div>
          {subtitle && <div className="font-mono truncate" style={{ fontSize: 9, color: "var(--text-muted)" }}>{subtitle}</div>}
        </div>
      </header>
      <div className="p-3 space-y-3 pb-14">{children}</div>
      <div className="font-mono text-center pb-6" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.6 }}>
        CONCEPT — NOT A MEDICAL DEVICE · NOT FOR MANUFACTURE<br />© 2026 Aethon Apex IP Holdings LLC
      </div>
    </div>
  );
}