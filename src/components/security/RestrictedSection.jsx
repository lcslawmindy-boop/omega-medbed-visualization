import React from "react";
import { usePdfAccess } from "@/lib/usePdfAccess";

/**
 * Tiered IP protection for proprietary content (patent claims, trade secrets,
 * component configuration):
 *  - PUBLIC — content is blurred and locked behind a CLASSIFIED seal
 *  - INVESTOR (approved NDA request or qualifying donation) — full view
 *  - MASTER ADMIN — full view
 */
export default function RestrictedSection({ label = "IP RESTRICTED — NDA REQUIRED", note, children }) {
  const { loading, allowed, user } = usePdfAccess();

  if (!loading && allowed) {
    return (
      <div className="relative">
        <div
          className="font-mono inline-block rounded mb-1.5"
          style={{
            fontSize: 8, letterSpacing: "0.16em", padding: "3px 8px",
            color: "#86EFAC", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.4)",
          }}
        >
          {user?.role === "admin" ? "MASTER ADMIN CLEARANCE" : "INVESTOR NDA CLEARANCE"} — UNLOCKED
        </div>
        {children}
      </div>
    );
  }

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
        <div className="font-mono mt-2" style={{ fontSize: 9, color: "var(--text-muted)", maxWidth: 340, lineHeight: 1.7 }}>
          {note || "Patent claims, trade secrets and hardware configuration are withheld from public view."}
          {" "}Investors: request NDA access via the Engineering Docs access request, or contact aethonapexip@gmail.com.
        </div>
      </div>
    </div>
  );
}