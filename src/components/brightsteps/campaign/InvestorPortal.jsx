import React from "react";
import { PARTNER_TYPES, INVESTOR_CONTACT } from "@/data/campaignDonation";

export default function InvestorPortal() {
  return (
    <div id="bs-investor-portal" className="bs-card p-4" style={{ background: "linear-gradient(180deg,#05080F 0%, var(--bg-panel) 100%)", border: "1px solid rgba(201,168,76,0.3)" }}>
      <div className="font-display" style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.16em" }}>SERIOUS CAPITAL. SERIOUS MISSION.</div>
      <div className="font-display mt-1" style={{ fontSize: 22, color: "var(--text-primary)", lineHeight: 1.25 }}>
        Investor &amp; Strategic Partner Portal
      </div>
      <p className="font-body" style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.7, margin: "10px 0 0", maxWidth: 720 }}>
        The Aethon Apex IP portfolio represents 4 core devices, 10 patent claims, 6 protected trade secrets, and a $31.7M, 5-year roadmap to civilizational impact. This is not a retail investment product. This is an invitation to be part of the most consequential technology mission in human history.
      </p>

      <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {PARTNER_TYPES.map((p) => (
          <div key={p.id} className="bs-card p-3 flex flex-col" style={{ background: "var(--bg-card)", border: `1px solid ${p.color}` }}>
            <div className="font-display" style={{ fontSize: 9, color: p.color, letterSpacing: "0.1em" }}>{p.kicker}</div>
            <div className="font-display mt-1" style={{ fontSize: 13, color: "var(--text-primary)", letterSpacing: "0.06em" }}>{p.title}</div>
            <p className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>{p.body}</p>
            <div className="font-mono mt-2" style={{ fontSize: 9.5, color: p.color }}>{p.minimum}</div>
            <div className="font-display mt-2" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>WHAT YOU GET</div>
            <ul className="mt-1 flex-1 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {p.gets.map((g) => (
                <li key={g} className="font-body flex gap-1.5" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
                  <span style={{ color: p.color }}>›</span>{g}
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${INVESTOR_CONTACT}?subject=${encodeURIComponent(p.title + " — Aethon Apex inquiry")}`}
              className="font-display rounded mt-3 w-full text-center"
              style={{ fontSize: 9, padding: "11px 10px", minHeight: 40, letterSpacing: "0.07em", color: p.color, border: `1px solid ${p.color}`, display: "block" }}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="bs-card p-3 mt-3" style={{ background: "var(--bg-card)", borderLeft: "3px solid var(--gold)" }}>
        <div className="font-display" style={{ fontSize: 9.5, color: "var(--gold)", letterSpacing: "0.1em" }}>DIRECT LINE</div>
        <div className="font-mono select-text mt-1" style={{ fontSize: 11, color: "var(--text-primary)" }}>{INVESTOR_CONTACT}</div>
        <p className="font-body" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>
          Aethon Apex IP Holdings LLC is a private company. Nothing on this page is an offer to sell or a solicitation to buy securities. Any investment discussion is conducted separately under applicable securities law with accredited parties only.
        </p>
      </div>
    </div>
  );
}