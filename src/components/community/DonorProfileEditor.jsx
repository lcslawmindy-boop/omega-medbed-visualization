import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import PhotoUploadField from "./PhotoUploadField";

const input = {
  fontSize: 11, padding: "9px 10px", minHeight: 38, width: "100%",
  background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 10,
};

export default function DonorProfileEditor({ donor, onSaved }) {
  const [form, setForm] = useState({
    display_name: donor.display_name || "",
    location: donor.location || "",
    comment: donor.comment || "",
    photo_url: donor.photo_url || "",
    is_public: donor.is_public !== false,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await base44.entities.Donor.update(donor.id, form);
    setSaving(false);
    onSaved();
  };

  return (
    <div className="bs-card p-3 space-y-2" style={{ background: "var(--bg-panel)", borderRadius: 16, border: "1px solid rgba(201,168,76,0.4)" }}>
      <div className="font-display" style={{ fontSize: 10.5, color: "var(--gold)", letterSpacing: "0.12em" }}>
        {donor.badge} YOUR SUPPORTER PROFILE — {donor.tier}
      </div>
      <input style={input} className="font-body" placeholder="Display name" value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} />
      <input style={input} className="font-body" placeholder="City · Country (optional)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <textarea style={{ ...input, minHeight: 72 }} className="font-body" placeholder="Your comment (optional)" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
      <PhotoUploadField label="YOUR FACE PICTURE (OPTIONAL)" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} />
      <label className="font-mono flex items-center gap-2" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>
        <input type="checkbox" checked={form.is_public} onChange={(e) => setForm({ ...form, is_public: e.target.checked })} />
        SHOW ME ON THE PUBLIC SUPPORTER WALL
      </label>
      <button
        onClick={save}
        disabled={saving}
        className="font-display rounded-full w-full"
        style={{ fontSize: 10, padding: "11px", minHeight: 42, background: "var(--gold)", color: "#1B1405", letterSpacing: "0.08em", opacity: saving ? 0.6 : 1 }}
      >
        {saving ? "SAVING…" : "SAVE PROFILE"}
      </button>
    </div>
  );
}