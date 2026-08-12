import React from "react";
import SessionHistory from "@/components/medbed/SessionHistory";

// Responsive session-history viewer: full-screen on mobile, centered modal on desktop.
export default function SessionHistoryModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[180] flex items-center justify-center fade-in no-select"
      style={{ background: "rgba(0,4,8,0.95)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col safe-top safe-bottom h-full w-full lg:h-[90vh] lg:max-w-[1000px] lg:rounded-md"
        style={{ background: "var(--bg-card)", border: "1px solid var(--gold)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 flex-none"
          style={{ height: 48, borderBottom: "1px solid var(--border)" }}
        >
          <span className="font-display text-gold" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
            SESSION HISTORY
          </span>
          <button
            onClick={onClose}
            className="text-gold flex items-center justify-center"
            style={{ fontSize: 22, minWidth: 44, minHeight: 44 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scroll-dark">
          <SessionHistory />
        </div>
      </div>
    </div>
  );
}