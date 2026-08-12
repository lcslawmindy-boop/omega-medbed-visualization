import React, { useState } from "react";

export default function T3WarningBanner({ visible }) {
  const [dismissed, setDismissed] = useState(false);
  if (!visible || dismissed) return null;
  return (
    <div
      className="flex items-center justify-between gap-2 px-3 flex-none"
      style={{ height: 32, background: "rgba(245,158,11,0.12)", borderBottom: "1px solid var(--amber)" }}
    >
      <span className="font-body truncate" style={{ fontSize: 9, color: "var(--amber)" }}>
        ⚠ One or more Tier 3 frontier/research modalities are visible. ZARP does not validate these claims. Research and IP purposes only.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="font-mono flex-none"
        style={{ fontSize: 9, color: "var(--amber)", border: "1px solid var(--amber)", padding: "1px 8px", borderRadius: 3 }}
      >
        ✕ Dismiss
      </button>
    </div>
  );
}