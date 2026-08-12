import React, { useState, useEffect, useRef } from "react";
import Starr from "./Starr";

/** Dims after `dimMin` of inactivity, locks after `lockMin`. Unlock needs the parent PIN. */
export default function SessionGuard({ dimMin = 15, lockMin = 30, pin, mascotName }) {
  const [state, setState] = useState("active");
  const [entry, setEntry] = useState("");
  const last = useRef(Date.now());

  useEffect(() => {
    const touch = () => { last.current = Date.now(); setState((s) => (s === "locked" ? s : "active")); };
    ["pointerdown", "keydown"].forEach((e) => window.addEventListener(e, touch));
    const timer = setInterval(() => {
      const mins = (Date.now() - last.current) / 60000;
      setState((s) => (s === "locked" ? s : mins >= lockMin ? "locked" : mins >= dimMin ? "dim" : "active"));
    }, 5000);
    return () => {
      clearInterval(timer);
      ["pointerdown", "keydown"].forEach((e) => window.removeEventListener(e, touch));
    };
  }, [dimMin, lockMin]);

  if (state === "active") return null;

  if (state === "dim") {
    return <div className="fixed inset-0 z-[160]" style={{ background: "rgba(0,0,0,0.8)", pointerEvents: "none" }} />;
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-4" style={{ background: "#050C16" }}>
      <div className="kids-card p-5 text-center" style={{ maxWidth: 380, width: "100%" }}>
        <Starr size={64} name={mascotName} />
        <p className="k-t-lg font-bold mt-2">Screen locked</p>
        <p className="k-t-sm mt-1" style={{ color: "var(--k-muted)" }}>A grown-up can unlock with the PIN.</p>
        <input
          type="password"
          inputMode="numeric"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="••••"
          className="k-t-lg w-full mt-3 px-3 text-center"
          style={{ minHeight: 54, borderRadius: 14, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)", letterSpacing: "0.4em" }}
        />
        <button
          type="button"
          onClick={() => { if (entry === pin) { last.current = Date.now(); setEntry(""); setState("active"); } }}
          className="kids-tap kids-solid k-t-md font-bold w-full mt-3"
          style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 52 }}
        >
          Unlock
        </button>
      </div>
    </div>
  );
}