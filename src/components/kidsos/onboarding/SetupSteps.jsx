import React, { useState } from "react";
import Chip from "./Chip";

const inputStyle = { minHeight: 52, borderRadius: 14, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)" };

export function TrustedAdultsStep({ profile, set }) {
  const [name, setName] = useState("");
  const [rel, setRel] = useState("");
  const who = profile.name || "your child";
  const add = () => {
    if (!name.trim() || profile.trustedAdults.length >= 6) return;
    set({ trustedAdults: [...profile.trustedAdults, { name: name.trim(), relationship: rel.trim() || "Grown-up" }] });
    setName(""); setRel("");
  };
  return (
    <div>
      <h2 className="k-t-xl font-bold">Who are {who}'s trusted grown-ups?</h2>
      <p className="k-t-sm mt-1" style={{ color: "var(--k-muted)" }}>These appear in {who}'s I Need Help. Add up to 6.</p>
      <div className="flex gap-2 flex-wrap mt-3">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="k-t-md px-3 flex-1" style={{ ...inputStyle, minWidth: 130 }} />
        <input value={rel} onChange={(e) => setRel(e.target.value)} placeholder="Relationship" className="k-t-md px-3 flex-1" style={{ ...inputStyle, minWidth: 130 }} />
        <button type="button" onClick={add} className="kids-tap kids-solid k-t-md font-bold px-4" style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 52 }}>Add</button>
      </div>
      <ul className="mt-3 space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {profile.trustedAdults.map((a, i) => (
          <li key={`${a.name}-${i}`} className="kids-card p-3 flex items-center gap-2">
            <span className="k-emoji" aria-hidden="true">🧡</span>
            <span className="k-t-md flex-1">{a.name} <span style={{ color: "var(--k-muted)" }}>· {a.relationship}{i === 0 ? " · primary" : ""}</span></span>
            <button type="button" onClick={() => set({ trustedAdults: profile.trustedAdults.filter((_, j) => j !== i) })} className="kids-tap px-3 k-t-md" style={{ color: "var(--k-muted)", minHeight: 44 }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LoginMethodStep({ profile, set, settings, setSettings }) {
  return (
    <div>
      <h2 className="k-t-xl font-bold">How should {profile.name || "your child"} sign in?</h2>
      <div className="flex gap-2 flex-wrap mt-3">
        {["PIN", "Parent tap", "Face recognition"].map((m) => (
          <Chip key={m} on={profile.loginMethod === m} onClick={() => set({ loginMethod: m })}>{m}</Chip>
        ))}
      </div>
      <label className="k-t-md block mt-4">Parent PIN (also unlocks settings)</label>
      <input
        value={settings.pin}
        onChange={(e) => setSettings({ ...settings, pin: e.target.value.slice(0, 4) })}
        inputMode="numeric"
        className="k-t-lg w-full mt-1 px-3"
        style={{ ...inputStyle, minHeight: 54, letterSpacing: "0.4em" }}
      />
    </div>
  );
}

export function NotificationsStep({ profile, set, settings, setSettings }) {
  const rows = [
    ["notifyHelp", "I Need Help alerts — immediate", true],
    ["notifyHighEmotion", "Strong feelings (4–5 intensity)", false],
    ["notifyDaily", "Daily summary ready", false],
  ];
  return (
    <div>
      <h2 className="k-t-xl font-bold">Notifications</h2>
      {rows.map(([key, label, locked]) => (
        <div key={key} className="flex items-center gap-3 py-2 flex-wrap">
          <span className="k-t-md flex-1 min-w-0">{label}</span>
          <Chip on={locked ? true : profile[key]} onClick={() => !locked && set({ [key]: !profile[key] })}>
            {locked ? "Always on" : profile[key] ? "On" : "Off"}
          </Chip>
        </div>
      ))}
      <label className="k-t-md block mt-3">Daily summary time</label>
      <input
        type="time"
        value={settings.summaryTime}
        onChange={(e) => setSettings({ ...settings, summaryTime: e.target.value })}
        className="k-t-md mt-1 px-3"
        style={inputStyle}
      />
    </div>
  );
}