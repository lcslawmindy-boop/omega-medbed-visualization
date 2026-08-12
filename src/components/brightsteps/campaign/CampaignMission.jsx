import React from "react";
import { POPULATIONS, MISSION_STATEMENT } from "@/data/campaignDevices";

export default function CampaignMission({ onJoin }) {
  return (
    <section
      className="rounded-2xl p-3"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, rgba(201,168,76,0.10), transparent 55%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.07), transparent 50%), var(--bg-primary, #000408)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="text-center">
        <div className="font-display" style={{ fontSize: 10, color: "var(--gold, #C9A84C)", letterSpacing: "0.16em" }}>
          WHO WE ARE FIGHTING FOR
        </div>
        <h2 className="font-display" style={{ fontSize: 23, color: "#fff", lineHeight: 1.25, margin: "6px 0 0" }}>
          Every human being alive.<br />Every child not yet born.
        </h2>
      </div>

      <div className="grid gap-2.5 mt-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {POPULATIONS.map((p) => (
          <div
            key={p.title}
            className="bs-card bs-fade-up p-3 flex flex-col"
            style={{ background: "var(--bg-panel)", borderTop: `3px solid ${p.color}`, gridColumn: p.wide ? "span 2" : "auto" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="rounded-full flex items-center justify-center flex-none"
                style={{ width: 34, height: 34, fontSize: 17, background: `${p.color}1F`, border: `1px solid ${p.color}66` }}
              >
                {p.icon}
              </span>
              <div className="font-display" style={{ fontSize: 11, color: p.color, letterSpacing: "0.08em" }}>{p.title}</div>
            </div>
            <p className="font-body flex-1" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.7, margin: "8px 0 0" }}>
              {p.body}
            </p>
            <div className="font-mono mt-2" style={{ fontSize: 9, color: "var(--text-primary)", lineHeight: 1.5 }}>{p.stat}</div>
            {p.link && (
              <span className="font-display mt-2" style={{ fontSize: 9, color: p.color, letterSpacing: "0.07em" }}>{p.link}</span>
            )}
          </div>
        ))}
      </div>

      <div
        className="rounded-2xl mt-4 text-center"
        style={{ padding: 28, background: "#080B12", border: "1px solid var(--gold, #C9A84C)" }}
      >
        {MISSION_STATEMENT.map((line) => (
          <p key={line} className="font-body" style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.9, margin: "0 0 10px" }}>
            {line}
          </p>
        ))}
        <button
          onClick={onJoin}
          className="font-display rounded-lg mt-2"
          style={{ fontSize: 11, padding: "14px 26px", minHeight: 48, background: "var(--gold, #C9A84C)", color: "#0B0B0B", letterSpacing: "0.12em" }}
        >
          JOIN THE MISSION
        </button>
      </div>
    </section>
  );
}