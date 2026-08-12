import React from "react";

// Slide-up drawer sheet for mobile views (Systems List, Specs & Terminals).
// Sits below the TopHeader and above the MobileNav; the 3D scene stays mounted
// underneath so the WebGL context is never torn down on tab switches.
export default function MobileSheet({ open, title, onClose, children }) {
  return (
    <div
      className={`fixed z-[110] flex flex-col lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{
        top: "calc(60px + env(safe-area-inset-top))",
        bottom: "calc(56px + env(safe-area-inset-bottom))",
        left: 0,
        right: 0,
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--gold)",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform 280ms ease",
        visibility: open ? "visible" : "hidden",
      }}
    >
      <div
        className="flex items-center justify-between px-4 flex-none no-select"
        style={{ height: 44, background: "var(--bg-panel)", borderBottom: "1px solid var(--border)" }}
      >
        <span className="font-display text-gold" style={{ fontSize: 12, letterSpacing: "0.12em" }}>
          {title}
        </span>
        <button
          onClick={onClose}
          className="text-gold"
          style={{ fontSize: 22, lineHeight: 1, minWidth: 44, minHeight: 44 }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}