import React, { useState } from "react";
import { LEGAL_NOTE } from "@/data/campaignDonation";

export default function DonationModal({ open, amount, freq, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", amount: amount || "", card: "" });
  const [sent, setSent] = useState(false);
  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

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
        <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>{freq} · USD</div>

        {sent ? (
          <div className="font-body mt-4" style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.65 }}>
            Thank you. Payment processing is not connected yet — your details were not submitted and no card was charged. Contact invest@aethonapex.com to arrange a contribution before launch.
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            {[
              ["Full name", "name", "text"],
              ["Email", "email", "email"],
              ["Amount (USD)", "amount", "text"],
              ["Card number", "card", "text"],
            ].map(([label, key, type]) => (
              <label key={key} className="block">
                <span className="font-display block" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{label.toUpperCase()}</span>
                <input
                  type={type}
                  value={form[key]}
                  onChange={set(key)}
                  className="w-full bg-transparent rounded font-mono outline-none mt-1"
                  style={{ fontSize: 11, color: "var(--text-primary)", border: "1px solid var(--border)", padding: "10px 10px", minHeight: 40 }}
                />
              </label>
            ))}
            <button
              onClick={() => setSent(true)}
              className="font-display rounded w-full"
              style={{ fontSize: 11, padding: "13px 12px", minHeight: 46, letterSpacing: "0.08em", background: "linear-gradient(90deg,#C9A84C,#F2DC9B)", color: "#1B1405" }}
            >
              CONTRIBUTE ${Number(form.amount || 0).toLocaleString()}
            </button>
          </div>
        )}

        <p className="font-body" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.65, margin: "12px 0 0" }}>
          {LEGAL_NOTE}
        </p>
      </div>
    </div>
  );
}