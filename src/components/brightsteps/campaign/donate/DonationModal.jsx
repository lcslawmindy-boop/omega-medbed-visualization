import React, { useState } from "react";
import { LEGAL_NOTE } from "@/data/campaignDonation";
import { CONTACT_EMAIL } from "@/data/contact";
import { base44 } from "@/api/base44Client";

export default function DonationModal({ open, amount, freq, onClose }) {
  const [value, setValue] = useState(amount || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  if (!open) return null;

  const checkout = async () => {
    const n = Number(value);
    if (!n || n < 1) {
      setError("Enter an amount of $1 or more.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await base44.functions.invoke("create-checkout", { productId: "donation", amount: n });
      const url = res.data?.redirectUrl;
      if (url) {
        window.location.href = url;
        return;
      }
      setError(res.data?.error || "Could not start checkout.");
    } catch (e) {
      setError("Could not start checkout. Please try again.");
    }
    setBusy(false);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3"
      style={{ background: "rgba(3,7,14,0.8)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bs-card w-full overflow-y-auto bs-scroll"
        style={{ maxWidth: 460, maxHeight: "88vh", background: "var(--bg-panel)", border: "1px solid rgba(201,168,76,0.45)", padding: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="font-display" style={{ fontSize: 13, color: "var(--gold)", letterSpacing: "0.12em" }}>SECURE CONTRIBUTION</div>
          <button onClick={onClose} className="font-display" style={{ fontSize: 14, color: "var(--text-muted)", minHeight: 36, minWidth: 36 }}>✕</button>
        </div>
        <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{freq} · USD · Secure card payment</div>

        <label className="block mt-3">
          <span className="font-display block" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>AMOUNT (USD)</span>
          <input
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ""))}
            className="w-full bg-transparent rounded font-mono outline-none mt-1"
            style={{ fontSize: 13, color: "var(--gold)", border: "1px solid var(--border)", padding: "10px", minHeight: 42 }}
          />
        </label>

        <p className="font-body" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>
          Your name, email and card details are entered on the secure payment page. When the payment
          clears, your donor badge is issued automatically and you can add your picture and comment
          to the Supporter Wall.
        </p>

        {error && <div className="font-mono mt-2" style={{ fontSize: 9.5, color: "var(--red)" }}>{error}</div>}

        <button
          onClick={checkout}
          disabled={busy}
          className="font-display rounded w-full mt-3"
          style={{ fontSize: 11, padding: "13px 12px", minHeight: 46, letterSpacing: "0.08em", background: "linear-gradient(90deg,#C9A84C,#F2DC9B)", color: "#1B1405", opacity: busy ? 0.6 : 1 }}
        >
          {busy ? "OPENING SECURE CHECKOUT…" : `CONTRIBUTE $${Number(value || 0).toLocaleString()}`}
        </button>

        <p className="font-body" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.65, margin: "12px 0 0" }}>
          {LEGAL_NOTE} Contact: {CONTACT_EMAIL}
        </p>
      </div>
    </div>
  );
}