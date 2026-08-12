import React from "react";
import Chip from "./Chip";
import { ageGroupFor } from "@/lib/kidsProfile";

const AVATARS = ["🦊", "🐨", "🐢", "🦁", "🐳", "🦋", "🐰", "🌟"];
const COMMUNICATION = ["Uses words", "Some words", "No words / AAC", "Uses PECS", "Uses sign", "Other"];
const SENSITIVITIES = ["Loud sounds", "Bright lights", "Crowds", "Strong smells", "Textures", "Change", "Fast movement", "Other", "None known"];

const toggle = (list, v) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function ChildProfileStep({ profile, set }) {
  return (
    <div>
      <h2 className="k-t-xl font-bold">Child profile</h2>
      <label className="k-t-md block mt-3">Child's name</label>
      <input
        value={profile.name}
        onChange={(e) => set({ name: e.target.value })}
        placeholder="First name"
        className="k-t-lg w-full mt-1 px-3"
        style={{ minHeight: 54, borderRadius: 14, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)" }}
      />
      <label className="k-t-md block mt-3">Pick an avatar</label>
      <div className="flex gap-2 flex-wrap mt-1">
        {AVATARS.map((a) => (
          <Chip key={a} on={profile.avatar === a} onClick={() => set({ avatar: a })}>
            <span className="k-emoji">{a}</span>
          </Chip>
        ))}
      </div>
      <label className="k-t-md block mt-3">Birthday</label>
      <input
        type="date"
        value={profile.birthday}
        onChange={(e) => set({ birthday: e.target.value, ageGroup: ageGroupFor(e.target.value) })}
        className="k-t-md w-full mt-1 px-3"
        style={{ minHeight: 54, borderRadius: 14, background: "#0A1826", color: "var(--k-ink)", border: "1px solid var(--k-border)" }}
      />
      <p className="k-t-sm mt-2" style={{ color: "var(--k-muted)" }}>Age group: {profile.ageGroup}</p>
    </div>
  );
}

export function CommunicationStep({ profile, set }) {
  const who = profile.name || "your child";
  return (
    <div>
      <h2 className="k-t-xl font-bold">How does {who} communicate?</h2>
      <p className="k-t-sm mt-1" style={{ color: "var(--k-muted)" }}>This sets the default card library and content level.</p>
      <div className="flex gap-2 flex-wrap mt-3">
        {COMMUNICATION.map((c) => (
          <Chip key={c} on={profile.communication.includes(c)} onClick={() => set({ communication: toggle(profile.communication, c) })}>{c}</Chip>
        ))}
      </div>
    </div>
  );
}

export function SensitivitiesStep({ profile, set }) {
  const who = profile.name || "your child";
  return (
    <div>
      <h2 className="k-t-xl font-bold">Does {who} have any sensitivities?</h2>
      <p className="k-t-sm mt-1" style={{ color: "var(--k-muted)" }}>Tap all that apply.</p>
      <div className="flex gap-2 flex-wrap mt-3">
        {SENSITIVITIES.map((s) => (
          <Chip key={s} on={profile.sensitivities.includes(s)} onClick={() => set({ sensitivities: toggle(profile.sensitivities, s) })}>{s}</Chip>
        ))}
      </div>
    </div>
  );
}