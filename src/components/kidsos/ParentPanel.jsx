import React, { useState } from "react";
import { flushQueue } from "@/lib/kidsLog";

function Row({ label, children }) {
  return (
    <div className="flex items-center gap-3 py-2 flex-wrap">
      <span className="k-t-md flex-1 min-w-0">{label}</span>
      <div className="flex gap-2 flex-wrap">{children}</div>
    </div>
  );
}

function Pill({ on, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="kids-tap k-t-sm px-3"
      style={{ minHeight: 44, borderRadius: 999, border: "1px solid var(--k-border)", background: on ? "var(--k-sky)" : "transparent", color: on ? "#04121F" : "var(--k-ink)" }}
    >
      {children}
    </button>
  );
}

export default function ParentPanel({ settings, onChange, online, queued, onClose }) {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const set = (patch) => onChange({ ...settings, ...patch });

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3" style={{ background: "rgba(2, 10, 20, 0.9)" }}>
      <div className="kids-card w-full p-4" style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
        <div className="flex items-center gap-2">
          <h2 className="k-t-lg font-bold flex-1">Grown-up settings</h2>
          <button type="button" onClick={onClose} className="kids-tap px-3 k-t-md" style={{ minHeight: 44, color: "var(--k-muted)" }}>✕</button>
        </div>

        {!unlocked ? (
          <div className="mt-3">
            <p className="k-t-md" style={{ color: "var(--k-muted)" }}>Enter the parent PIN to change settings.</p>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              className="k-t-lg w-full mt-2 px-3"
              style={{ minHeight: 54, borderRadius: 14, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)", letterSpacing: "0.4em" }}
            />
            <button
              type="button"
              onClick={() => setUnlocked(pin === settings.pin)}
              className="kids-tap kids-solid k-t-md font-bold w-full mt-2"
              style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 52 }}
            >
              Unlock
            </button>
            {pin.length >= 4 && pin !== settings.pin && (
              <p className="k-t-sm mt-2" style={{ color: "var(--k-warn)" }}>That PIN doesn't match.</p>
            )}
          </div>
        ) : (
          <div className="mt-2">
            <div className="k-t-sm font-bold mt-2" style={{ color: "var(--k-sky)" }}>ACCESSIBILITY</div>
            <Row label="Text size">
              {["default", "large", "xlarge"].map((s) => (
                <Pill key={s} on={settings.textSize === s} onClick={() => set({ textSize: s })}>
                  {s === "default" ? "Default" : s === "large" ? "Large +20%" : "Extra +40%"}
                </Pill>
              ))}
            </Row>
            <Row label="High contrast">
              <Pill on={settings.highContrast} onClick={() => set({ highContrast: !settings.highContrast })}>
                {settings.highContrast ? "On" : "Off"}
              </Pill>
            </Row>
            <Row label="Low stimulation">
              <Pill on={settings.lowStim} onClick={() => set({ lowStim: !settings.lowStim })}>
                {settings.lowStim ? "On" : "Off"}
              </Pill>
            </Row>
            <Row label="Sounds">
              <Pill on={settings.sound} onClick={() => set({ sound: !settings.sound })}>
                {settings.sound ? "On" : "Off"}
              </Pill>
            </Row>
            <Row label="Touch hold time">
              {[100, 300, 500, 1000].map((ms) => (
                <Pill key={ms} on={settings.touchHoldMs === ms} onClick={() => set({ touchHoldMs: ms })}>{ms}ms</Pill>
              ))}
            </Row>

            <div className="k-t-sm font-bold mt-3" style={{ color: "var(--k-sky)" }}>DATA & SYNC</div>
            <Row label={online ? (queued ? `${queued} events waiting to upload` : "Synced ✓ — all events uploaded") : `Offline — ${queued} events saved on this device`}>
              <Pill on={false} onClick={flushQueue}>Sync now</Pill>
            </Row>
            <Row label="Daily summary time">
              <input
                type="time"
                value={settings.summaryTime}
                onChange={(e) => set({ summaryTime: e.target.value })}
                className="k-t-md px-2"
                style={{ minHeight: 44, borderRadius: 12, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)" }}
              />
            </Row>

            <p className="k-t-sm mt-4" style={{ color: "var(--k-muted)", lineHeight: 1.6 }}>
              BrightSteps is a support platform. Not a medical device. Not a diagnostic tool. Not a substitute for clinical care.<br />© 2026 Aethon Apex IP Holdings LLC
            </p>
          </div>
        )}
      </div>
    </div>
  );
}