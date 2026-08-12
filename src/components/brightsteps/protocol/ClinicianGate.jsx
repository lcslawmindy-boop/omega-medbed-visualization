import React, { useState, useRef } from "react";

const CODE = "482913";

export default function ClinicianGate({ onCancel, onAuthorized, onLog }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(null);
  const [lockedUntil, setLockedUntil] = useState(null);
  const refs = useRef([]);

  const locked = lockedUntil && Date.now() < lockedUntil;

  const setDigit = (i, v) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((arr) => arr.map((x, j) => (j === i ? d : x)));
    if (d && refs.current[i + 1]) refs.current[i + 1].focus();
  };

  const authorize = () => {
    const entered = digits.join("");
    if (entered === CODE) {
      onLog({ result: "authorized", at: new Date().toISOString() });
      onAuthorized();
      return;
    }
    const n = attempts + 1;
    setAttempts(n);
    onLog({ result: "failed", attempt: n, at: new Date().toISOString() });
    setDigits(["", "", "", "", "", ""]);
    if (n >= 3) {
      setLockedUntil(Date.now() + 5 * 60 * 1000);
      setError("3 failed attempts — authorization locked for 5 minutes.");
    } else {
      setError(`Invalid authorization code — ${3 - n} attempt${3 - n === 1 ? "" : "s"} remaining.`);
    }
  };

  return (
    <div className="fixed inset-0 z-[260] flex items-center justify-center p-4" style={{ background: "rgba(7,11,20,0.85)" }}>
      <div className="w-full" style={{ maxWidth: 400, background: "var(--bg-card)", border: "1px solid var(--sky)", borderRadius: 14, padding: 22 }}>
        <div className="font-display text-sky" style={{ fontSize: 13, letterSpacing: "0.07em" }}>CLINICIAN AUTHORIZATION REQUIRED</div>
        <p className="font-body" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.65, marginTop: 10 }}>
          Manual parameter override disables KIDS-OS automatic pediatric safety scaling.
        </p>
        <p className="font-body" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.65, marginTop: 8 }}>
          This mode is intended for use by qualified clinical professionals only.
        </p>
        <p className="font-body" style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.65, marginTop: 8 }}>
          By entering the authorization code you confirm you are a licensed clinical professional and accept full responsibility for parameter selection.
        </p>

        <div className="flex justify-between gap-1.5 mt-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              disabled={locked}
              onChange={(e) => setDigit(i, e.target.value)}
              inputMode="numeric"
              aria-label={`Digit ${i + 1}`}
              className="font-mono text-center rounded-md outline-none"
              style={{ width: "15%", height: 46, fontSize: 18, background: "var(--bg-panel)", border: "1px solid var(--sky)", color: "var(--text-primary)" }}
            />
          ))}
        </div>
        <div className="font-body mt-1.5" style={{ fontSize: 9, color: "var(--text-muted)" }}>
          Authorization code provided by supervising clinician
        </div>
        {error && (
          <div className="font-body mt-2" style={{ fontSize: 10, color: "var(--red-alert)" }}>{error}</div>
        )}

        <div className="flex gap-2 mt-4">
          <button onClick={onCancel} className="font-display flex-1 rounded-md" style={{ fontSize: 10, padding: "11px 0", color: "var(--text-muted)", border: "1px solid var(--border)", minHeight: 44 }}>
            Cancel
          </button>
          <button
            onClick={authorize}
            disabled={locked || digits.some((d) => !d)}
            className="font-display flex-1 rounded-md"
            style={{
              fontSize: 10, padding: "11px 0", minHeight: 44, letterSpacing: "0.06em",
              background: locked || digits.some((d) => !d) ? "var(--bg-elevated)" : "var(--sky)",
              color: locked || digits.some((d) => !d) ? "var(--text-muted)" : "#04121F",
            }}
          >
            Authorize
          </button>
        </div>
      </div>
    </div>
  );
}