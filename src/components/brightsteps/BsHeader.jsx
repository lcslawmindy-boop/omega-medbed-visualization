import React from "react";
import { useNavigate } from "react-router-dom";
import { BS_MODES } from "@/data/brightsteps";

function BsMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill="none" stroke="#38BDF8" strokeWidth="1.2" opacity="0.7" />
      <circle cx="11" cy="7.5" r="2.2" fill="#38BDF8" />
      <path d="M7 16.5c0-2.6 1.8-4.2 4-4.2s4 1.6 4 4.2" fill="#38BDF8" opacity="0.85" />
    </svg>
  );
}

export default function BsHeader({ mode, onMode, onSessionLog, onExport, onProtocol, session, remaining }) {
  const clock = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  const navigate = useNavigate();
  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] flex items-center px-3 gap-3 safe-top no-select"
      style={{ height: "calc(64px + env(safe-area-inset-top))", background: "var(--bg-panel)", borderBottom: "1px solid var(--border)" }}
    >
      <button onClick={() => navigate("/")} className="text-sky flex-none flex items-center justify-center" style={{ fontSize: 18, minWidth: 40, minHeight: 44 }} aria-label="Back to Omega MedBed">←</button>
      <BsMark />
      <div className="flex flex-col leading-tight min-w-0">
        <span className="font-display font-bold text-sky truncate" style={{ fontSize: 16, letterSpacing: "0.04em" }}>BRIGHTSTEPS</span>
        <span className="font-display truncate" style={{ fontSize: 10, color: "var(--text-muted)" }}>ASD Therapy Pod — BS-ATP-Ω</span>
      </div>
      <span className="font-body uppercase hidden xl:inline" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.12em" }}>
        Aethon Apex IP Holdings LLC
      </span>

      {/* Mode tabs */}
      <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto bs-scroll">
        {BS_MODES.map((m) => {
          const on = m.id === mode;
          return (
            <button
              key={m.id}
              onClick={() => onMode(m.id)}
              className="font-display flex-none transition-colors"
              style={{
                fontSize: 10, padding: "8px 10px", letterSpacing: "0.07em", minHeight: 44,
                color: on ? "var(--sky)" : "var(--text-muted)",
                borderBottom: `2px solid ${on ? "var(--sky)" : "transparent"}`,
              }}
            >
              <span className="mr-1">{m.icon}</span>
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 flex-none">
        {session && (
          <span className="font-display rounded-md flex items-center gap-1.5 px-2 py-1" style={{ fontSize: 9.5, background: "var(--sky)", color: "#04121F", letterSpacing: "0.06em" }}>
            <span className="bs-pulse inline-block rounded-full" style={{ width: 6, height: 6, background: "#04121F" }} />
            SESSION ACTIVE — {clock}
          </span>
        )}
        <button
          onClick={onProtocol}
          className="font-display rounded-md transition-colors"
          style={{ fontSize: 9.5, padding: "7px 10px", color: "var(--sky)", border: "1px solid var(--sky-dim)", letterSpacing: "0.06em", minHeight: 36 }}
        >
          ⚙ PROTOCOL BUILDER
        </button>
        <button
          onClick={onSessionLog}
          className="font-display rounded-md transition-colors hidden md:inline-flex"
          style={{ fontSize: 9.5, padding: "7px 10px", color: "var(--sky)", border: "1px solid var(--sky-dim)", letterSpacing: "0.06em", minHeight: 36 }}
        >
          📋 SESSION LOG
        </button>
        <button
          onClick={onExport}
          className="font-display rounded-md transition-colors hover:brightness-110"
          style={{ fontSize: 9.5, padding: "7px 10px", background: "var(--sky)", color: "#04121F", letterSpacing: "0.06em", minHeight: 36 }}
        >
          ⬇ EXPORT
        </button>
        <div className="hidden lg:flex flex-col gap-0.5">
          <span className="flex items-center gap-1 font-mono" style={{ fontSize: 9, color: "var(--green)" }}>
            <span className="bs-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} /> KIDS-OS ONLINE
          </span>
          <span className="flex items-center gap-1 font-mono" style={{ fontSize: 9, color: "var(--green)" }}>
            <span className="bs-pulse inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} /> BFAC ACTIVE
          </span>
        </div>
      </div>
    </header>
  );
}