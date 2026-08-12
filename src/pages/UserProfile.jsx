import React, { useEffect, useState } from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";

const KEY = "aa_user_profile";
const DEFAULTS = {
  name: "", role: "clinician", email: "", org: "",
  pin: "", alertsSessionStart: true, alertsSessionEnd: true, alertsSafety: true, alertsWeekly: false,
};

const field = {
  width: "100%", padding: "11px 12px", minHeight: 44, fontSize: 12,
  background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 8,
};

export default function UserProfile() {
  const [p, setP] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setP({ ...DEFAULTS, ...JSON.parse(raw) });
  }, []);

  const set = (k, v) => { setP((s) => ({ ...s, [k]: v })); setSaved(false); };
  const save = () => { localStorage.setItem(KEY, JSON.stringify(p)); setSaved(true); };

  const toggles = [
    ["alertsSessionStart", "Session start alerts"],
    ["alertsSessionEnd", "Session complete summary"],
    ["alertsSafety", "Safety / BFAC cutoff alerts"],
    ["alertsWeekly", "Weekly progress digest"],
  ];

  return (
    <PageShell title="USER PROFILE" subtitle="Account · security PIN · session alert preferences">
      <SectionCard title="ACCOUNT INFORMATION">
        <div className="grid gap-2 sm:grid-cols-2">
          <input style={field} className="font-body" placeholder="Full name" value={p.name} onChange={(e) => set("name", e.target.value)} />
          <input style={field} className="font-body" placeholder="Email" value={p.email} onChange={(e) => set("email", e.target.value)} />
          <input style={field} className="font-body" placeholder="Clinic / household" value={p.org} onChange={(e) => set("org", e.target.value)} />
          <select style={field} className="font-body" value={p.role} onChange={(e) => set("role", e.target.value)}>
            <option value="clinician">Clinician</option>
            <option value="parent">Parent / caregiver</option>
            <option value="engineer">Engineer</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard title="SECURITY PIN" accent="var(--amber, #F59E0B)" note="4–6 digits · gates parent settings and clinician overrides. Stored on this device only.">
        <input
          style={{ ...field, maxWidth: 200, letterSpacing: "0.4em" }}
          className="font-mono"
          inputMode="numeric"
          maxLength={6}
          placeholder="••••"
          value={p.pin}
          onChange={(e) => set("pin", e.target.value.replace(/\D/g, ""))}
        />
      </SectionCard>

      <SectionCard title="NOTIFICATION PREFERENCES" accent="var(--teal, #2DD4BF)">
        <div className="space-y-1.5">
          {toggles.map(([k, label]) => (
            <button
              key={k}
              onClick={() => set(k, !p[k])}
              className="bs-card flex items-center gap-3 w-full px-3 py-2 text-left"
              style={{ background: "var(--bg-panel)", minHeight: 44 }}
            >
              <span className="font-body flex-1" style={{ fontSize: 11, color: "var(--text-primary)" }}>{label}</span>
              <span
                className="rounded-full flex-none"
                style={{ width: 38, height: 20, padding: 2, background: p[k] ? "var(--teal, #2DD4BF)" : "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <span className="block rounded-full" style={{ width: 16, height: 16, background: "#04121F", transform: `translateX(${p[k] ? 18 : 0}px)`, transition: "transform 200ms ease" }} />
              </span>
            </button>
          ))}
        </div>
      </SectionCard>

      <button
        onClick={save}
        className="font-display rounded w-full"
        style={{ fontSize: 10, padding: "13px 12px", minHeight: 46, background: "var(--sky)", color: "#04121F", letterSpacing: "0.08em" }}
      >
        {saved ? "✓ PREFERENCES SAVED" : "SAVE PROFILE"}
      </button>
    </PageShell>
  );
}