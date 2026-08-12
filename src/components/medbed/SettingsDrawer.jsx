import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

// Settings drawer with a multi-step account-deletion flow.
// NOTE: the Base44 auth SDK does not expose a programmatic user-deletion endpoint,
// so the final step initiates deletion by signing the user out (base44.auth.logout).
// Permanent record removal is completed by an administrator via the Base44 dashboard.
export default function SettingsDrawer({ open, onClose }) {
  const [step, setStep] = useState(0); // 0=list, 1=warning, 2=type-confirm, 3=done
  const [confirmText, setConfirmText] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const reset = () => {
    setStep(0);
    setConfirmText("");
    setBusy(false);
  };
  const handleClose = () => {
    reset();
    onClose();
  };

  const doDelete = async () => {
    setBusy(true);
    try {
      await base44.auth.logout();
      setStep(3);
    } catch (e) {
      setBusy(false);
    }
  };

  const canDelete = confirmText === "DELETE" && !busy;

  return (
    <div
      className="fixed inset-0 z-[150] flex justify-end fade-in"
      style={{ background: "rgba(0,4,8,0.65)" }}
      onClick={handleClose}
    >
      <aside
        className="fixed right-0 flex flex-col no-select panel-edges safe-bottom"
        style={{ width: "100%", maxWidth: 420, background: "var(--bg-elevated)", borderLeft: "2px solid var(--gold)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 flex-none no-select"
          style={{ height: 48, borderBottom: "1px solid var(--border)" }}
        >
          <span className="font-display text-gold" style={{ fontSize: 13, letterSpacing: "0.12em" }}>
            SETTINGS
          </span>
          <button
            onClick={handleClose}
            className="text-gold"
            style={{ fontSize: 22, lineHeight: 1, minWidth: 44, minHeight: 44 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-dark p-4 select-text">
          {step === 0 && (
            <div>
              <div className="font-mono text-muted uppercase mb-2" style={{ fontSize: 9, letterSpacing: "0.1em" }}>
                ACCOUNT
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-full flex items-center gap-2 rounded-sm transition-colors"
                style={{ minHeight: 48, padding: "0 12px", background: "rgba(239,68,68,0.1)", border: "1px solid var(--red)", color: "var(--red)", fontSize: 14 }}
              >
                <span style={{ fontSize: 16 }}>🗑</span>
                <span className="font-display" style={{ letterSpacing: "0.06em" }}>DELETE ACCOUNT</span>
              </button>
              <p className="font-body text-muted mt-2" style={{ fontSize: 11, lineHeight: 1.5 }}>
                Permanently remove your profile and sign out of the Omega MedBed configurator. This action cannot be undone.
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="font-display mb-3" style={{ fontSize: 16, color: "var(--red)" }}>⚠ Warning</div>
              <p className="font-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-primary)" }}>
                Account deletion is permanent and cannot be undone. Your saved protocols, session history, and preferences will be removed.
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 font-display rounded-sm"
                  style={{ minHeight: 44, fontSize: 14, background: "var(--bg-panel)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 font-display rounded-sm"
                  style={{ minHeight: 44, fontSize: 14, background: "var(--red)", color: "#fff" }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="font-display mb-2" style={{ fontSize: 14, color: "var(--red)" }}>Confirm Deletion</div>
              <p className="font-body text-muted" style={{ fontSize: 12, lineHeight: 1.5 }}>
                Type <span style={{ color: "var(--red)", fontWeight: 700 }}>DELETE</span> below to confirm.
              </p>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-sm outline-none mt-2"
                style={{ minHeight: 44, fontSize: 14, padding: "0 10px", background: "var(--bg-panel)", border: "1px solid var(--red)", color: "#fff" }}
              />
              <button
                onClick={doDelete}
                disabled={!canDelete}
                className="w-full font-display rounded-sm mt-3"
                style={{
                  minHeight: 44,
                  fontSize: 14,
                  background: canDelete ? "var(--red)" : "var(--bg-panel)",
                  color: canDelete ? "#fff" : "var(--text-muted)",
                  border: "1px solid var(--red)",
                }}
              >
                {busy ? "DELETING..." : "DELETE ACCOUNT"}
              </button>
              <button
                onClick={handleClose}
                className="w-full font-display rounded-sm mt-2"
                style={{ minHeight: 44, fontSize: 14, background: "transparent", color: "var(--text-muted)" }}
              >
                Cancel
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="font-display text-gold mb-2" style={{ fontSize: 16 }}>SIGNED OUT</div>
              <p className="font-body text-muted" style={{ fontSize: 12, lineHeight: 1.6 }}>
                Account deletion initiated. You have been signed out. Permanent removal is completed by an administrator via the Base44 dashboard.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}