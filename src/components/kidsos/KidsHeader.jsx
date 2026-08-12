import React, { useState } from "react";
import Starr from "./Starr";

export default function KidsHeader({ profile, stars, online, queued, onParent }) {
  const [note, setNote] = useState(false);
  return (
    <header className="flex items-center gap-3 px-4 py-3 kids-gap relative">
      <Starr size={48} name={profile.mascotName} />
      <div className="flex-1 min-w-0">
        <div className="k-t-lg font-bold truncate">Hi {profile.name || "friend"}! {profile.avatar} 👋</div>
        <div className="k-t-sm" style={{ color: "var(--k-muted)" }}>Your day starts here 🌟</div>
      </div>

      <div className="k-t-md kids-card kids-solid px-3 py-2 flex items-center gap-1" style={{ borderRadius: 999 }}>
        <span aria-hidden="true">⭐</span>
        <span className="font-bold">{stars}</span>
      </div>

      {!online && (
        <button
          type="button"
          onClick={() => setNote((n) => !n)}
          className="kids-tap px-3"
          aria-label="You are offline"
          style={{ minHeight: 44, color: "var(--k-sky)", border: "1px solid var(--k-border)" }}
        >
          <span className="k-t-md">📶</span>
        </button>
      )}

      <button
        type="button"
        onClick={onParent}
        className="kids-tap px-3"
        aria-label="Grown-up settings"
        style={{ minHeight: 44, color: "var(--k-muted)", border: "1px solid var(--k-border)" }}
      >
        <span className="k-t-md">⚙</span>
      </button>

      {note && (
        <div className="kids-card absolute right-4 top-20 z-30 p-3 k-t-md" style={{ maxWidth: 260 }}>
          You're offline — everything still works! 💙
          <div className="k-t-sm mt-1" style={{ color: "var(--k-muted)" }}>{queued} things saved to send later.</div>
        </div>
      )}
    </header>
  );
}