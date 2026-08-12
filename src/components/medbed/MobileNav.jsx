import React from "react";

const TABS = [
  { k: "chamber", label: "Chamber", icon: "◈" },
  { k: "systems", label: "Systems", icon: "☰" },
  { k: "specs", label: "Specs", icon: "▦" },
  { k: "protocol", label: "Protocol", icon: "⚙" },
];

export default function MobileNav({ activeTab, onTab }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] flex lg:hidden no-select safe-bottom"
      style={{ background: "var(--bg-panel)", borderTop: "1px solid var(--gold-dim)" }}
    >
      {TABS.map((t) => {
        const on = activeTab === t.k;
        return (
          <button
            key={t.k}
            onClick={() => onTab(t.k)}
            className="flex-1 relative flex flex-col items-center justify-center gap-0.5 transition-colors"
            style={{ height: 56, color: on ? "var(--gold)" : "var(--text-muted)" }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{t.icon}</span>
            <span className="font-display" style={{ fontSize: 9, letterSpacing: "0.06em" }}>
              {t.label}
            </span>
            <span
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: 0, height: 2, width: 36, background: on ? "var(--gold)" : "transparent", boxShadow: on ? "0 0 8px var(--gold)" : "none" }}
            />
          </button>
        );
      })}
    </nav>
  );
}