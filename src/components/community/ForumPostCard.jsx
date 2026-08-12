import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

function Avatar({ url, badge }) {
  return url ? (
    <img src={url} alt="" className="flex-none rounded-full" style={{ width: 36, height: 36, objectFit: "cover" }} />
  ) : (
    <div className="font-display flex-none rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: "var(--bg-elevated)", color: "var(--gold)", fontSize: 13 }}>
      {badge || "◇"}
    </div>
  );
}

export default function ForumPostCard({ post, replies, onChanged }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  const reply = async () => {
    if (!name.trim() || !text.trim()) return;
    setBusy(true);
    await base44.entities.ForumReply.create({ post_id: post.id, author_name: name, body: text });
    setText("");
    setBusy(false);
    onChanged();
  };

  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-panel)", borderRadius: 16 }}>
      <div className="flex items-center gap-2.5">
        <Avatar url={post.photo_url} badge={post.badge} />
        <div className="min-w-0">
          <div className="font-body truncate" style={{ fontSize: 11.5, color: "var(--text-primary)" }}>
            {post.badge ? `${post.badge} ` : ""}{post.author_name}
          </div>
          <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
            {new Date(post.created_date).toLocaleString()}
          </div>
        </div>
      </div>
      {post.title && <div className="font-display mt-2" style={{ fontSize: 11.5, color: "var(--gold)", letterSpacing: "0.06em" }}>{post.title}</div>}
      <p className="font-body" style={{ fontSize: 11, color: "var(--text-primary)", lineHeight: 1.7, margin: "6px 0 0" }}>{post.body}</p>

      {replies.length > 0 && (
        <div className="mt-2 space-y-1.5" style={{ borderLeft: "2px solid var(--border)", paddingLeft: 10 }}>
          {replies.map((r) => (
            <div key={r.id}>
              <div className="font-mono" style={{ fontSize: 9, color: "var(--sky)" }}>{r.author_name}</div>
              <div className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.6 }}>{r.body}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <input
          className="font-body rounded-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ fontSize: 10, padding: "8px 10px", minHeight: 36, width: 110, background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
        <input
          className="font-body rounded-full flex-1"
          placeholder="Write a reply…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ fontSize: 10, padding: "8px 10px", minHeight: 36, minWidth: 140, background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
        />
        <button
          onClick={reply}
          disabled={busy}
          className="font-display rounded-full"
          style={{ fontSize: 9, padding: "9px 12px", minHeight: 36, color: "var(--sky)", border: "1px solid var(--sky)", opacity: busy ? 0.6 : 1 }}
        >
          {busy ? "…" : "REPLY"}
        </button>
      </div>
    </div>
  );
}