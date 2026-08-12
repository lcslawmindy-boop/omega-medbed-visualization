import React, { useState } from "react";
import { PRESETS, FREQUENCIES, IMPACT, CRYPTO } from "@/data/campaignDonation";

function impactFor(amount) {
  const n = Number(amount);
  if (!n) return null;
  let match = null;
  IMPACT.forEach((i) => { if (n >= i.min) match = i.text; });
  return match;
}

export default function DonationWidget({ amount, onAmount, freq, onFreq, onFund }) {
  const [crypto, setCrypto] = useState(false);
  const impact = impactFor(amount);

  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-panel)", border: "1px solid rgba(201,168,76,0.4)" }}>
      <div className="font-display" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em" }}>CHOOSE YOUR CONTRIBUTION:</div>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => onAmount(String(p))}
            className="font-display rounded"
            style={{
              fontSize: 10, padding: "8px 12px", minHeight: 38, letterSpacing: "0.06em",
              background: String(p) === String(amount) ? "var(--gold)" : "transparent",
              color: String(p) === String(amount) ? "#1B1405" : "var(--text-primary)",
              border: "1px solid rgba(201,168,76,0.35)",
            }}
          >
            ${p}
          </button>
        ))}
        <div className="flex items-center gap-1.5 rounded px-2" style={{ border: "1px solid var(--border)", minHeight: 38 }}>
          <span className="font-mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>Enter amount: $</span>
          <input
            inputMode="numeric"
            value={amount}
            onChange={(e) => onAmount(e.target.value.replace(/[^\d.]/g, ""))}
            placeholder="____"
            className="font-mono bg-transparent outline-none"
            style={{ fontSize: 11, color: "var(--gold)", width: 72 }}
          />
        </div>
      </div>

      <div className="font-display mt-3" style={{ fontSize: 9.5, color: "var(--text-muted)", letterSpacing: "0.12em" }}>FREQUENCY</div>
      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {FREQUENCIES.map((f) => (
          <button
            key={f}
            onClick={() => onFreq(f)}
            className="font-display rounded"
            style={{
              fontSize: 9.5, padding: "8px 12px", minHeight: 38, letterSpacing: "0.07em",
              background: f === freq ? "rgba(201,168,76,0.18)" : "transparent",
              color: f === freq ? "var(--gold)" : "var(--text-muted)",
              border: `1px solid ${f === freq ? "var(--gold)" : "var(--border)"}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {freq === "MONTHLY" && (
        <div className="font-body mt-1.5" style={{ fontSize: 9.5, color: "var(--teal)" }}>
          Monthly donors receive exclusive Mission Insider status with weekly updates
        </div>
      )}

      <div className="bs-card mt-3 p-2.5" style={{ background: "var(--bg-card)" }}>
        <div className="font-display" style={{ fontSize: 9.5, color: "var(--sky)", letterSpacing: "0.12em" }}>YOUR IMPACT</div>
        <div className="font-body mt-1" style={{ fontSize: 11, color: impact ? "var(--text-primary)" : "var(--text-muted)", lineHeight: 1.55 }}>
          {impact ? `$${Number(amount).toLocaleString()} → ${impact}` : "Enter an amount to see exactly what it funds."}
        </div>
      </div>

      <button
        onClick={onFund}
        className="font-display rounded w-full mt-3"
        style={{
          fontSize: 12, padding: "14px 12px", minHeight: 48, letterSpacing: "0.08em",
          background: "linear-gradient(90deg,#C9A84C,#F2DC9B)", color: "#1B1405",
          boxShadow: "0 0 22px rgba(201,168,76,0.5)",
        }}
      >
        🌟 FUND THE LIGHT TIMELINE NOW
      </button>

      <button
        onClick={() => setCrypto((c) => !c)}
        className="font-display rounded w-full mt-2"
        style={{ fontSize: 9.5, padding: "9px 12px", minHeight: 38, color: "var(--gold)", border: "1px solid rgba(201,168,76,0.35)", letterSpacing: "0.06em" }}
      >
        💛 {crypto ? "HIDE CRYPTO WALLETS" : "DONATE WITH CRYPTO"}
      </button>
      {crypto && (
        <div className="mt-2 space-y-1.5">
          {CRYPTO.map((c) => (
            <div key={c.label} className="bs-card p-2" style={{ background: "var(--bg-card)" }}>
              <div className="font-display" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.1em" }}>{c.label}</div>
              <div className="font-mono select-text break-all" style={{ fontSize: 9, color: "var(--text-muted)" }}>{c.addr}</div>
            </div>
          ))}
          <div className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>
            QR codes available on request — email: invest@aethonapex.com
          </div>
        </div>
      )}
    </div>
  );
}