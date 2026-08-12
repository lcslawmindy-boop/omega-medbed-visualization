import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import PhotoUploadField from "./PhotoUploadField";

const input = {
  fontSize: 11, padding: "9px 10px", minHeight: 38, width: "100%",
  background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 10,
};

export default function ForumComposer({ defaultName = "", badge = "", onPosted }) {
  const [form, setForm] = useState({ author_name: defaultName, title: "", body: "", photo_url: "" });
  const [busy, setBusy] = useState(false);

  const post = async () => {
    if (!form.author_name.trim() || !form.body.trim()) return;
    setBusy(true);
    await base44.entities.ForumPost.create({ ...form, badge });
    setForm({ author_name: form.author_name, title: "", body: "", photo_url: "" });
    setBusy(false);
    onPosted();
  };

  return (
    <div className="bs-card p-3 space-y-2" style={{ background: "var(--bg-panel)", borderRadius: 16, border: "1px solid var(--border)" }}>
      <div className="font-display" style={{ fontSize: 10.5, color: "var(--sky)", letterSpacing: "0.12em" }}>START A DISCUSSION</div>
      <input style={input} className="font-body" placeholder="Your name" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
      <input style={input} className="font-body" placeholder="Topic (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea style={{ ...input, minHeight: 84 }} className="font-body" placeholder="Share your thoughts with the community" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      <PhotoUploadField label="YOUR PICTURE (OPTIONAL)" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} />
      <button
        onClick={post}
        disabled={busy}
        className="font-display rounded-full w-full"
        style={{ fontSize: 10, padding: "11px", minHeight: 42, background: "var(--sky)", color: "#04121F", letterSpacing: "0.08em", opacity: busy ? 0.6 : 1 }}
      >
        {busy ? "POSTING…" : "POST TO THE FORUM"}
      </button>
    </div>
  );
}