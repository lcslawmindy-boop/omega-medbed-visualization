import React from "react";
import { FOOTER_COLUMNS, FOOTER_EMAILS, GOLD } from "@/data/campaignTeam";

export default function CampaignFooter() {
  return (
    <div className="pt-4" style={{ borderTop: `2px solid ${GOLD}` }}>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <div>
          <div style={{ fontSize: 30, color: GOLD, lineHeight: 1 }}>◈</div>
          <div className="font-display mt-1.5" style={{ fontSize: 11, color: GOLD, letterSpacing: "0.1em" }}>AETHON APEX IP HOLDINGS LLC</div>
          <div className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)" }}>Zenith Apex Research Division</div>
          <div className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", opacity: 0.8 }}>Henderson, Nevada 89002</div>
          <div className="font-mono mt-1" style={{ fontSize: 9, color: "var(--text-muted)", opacity: 0.8 }}>Document: ZA-INV-MASTER-001 · Rev A</div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <div className="font-display" style={{ fontSize: 9.5, color: GOLD, letterSpacing: "0.12em" }}>{col.title}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "7px 0 0" }} className="space-y-1.5">
              {col.links.map((l) => (
                <li key={l} className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)" }}>{l}</li>
              ))}
            </ul>
            {col.title === "GET INVOLVED" && (
              <div className="mt-2 space-y-1">
                {FOOTER_EMAILS.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="font-mono block" style={{ fontSize: 9.5, color: GOLD }}>📧 {e}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-between gap-2 mt-4 p-3 rounded"
        style={{ background: "var(--bg-card)" }}
      >
        <span className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>© 2026 Aethon Apex IP Holdings LLC. All Rights Reserved.</span>
        <span className="font-body flex flex-wrap justify-center gap-2" style={{ fontSize: 9, color: "var(--text-muted)" }}>
          <span>[Privacy Policy]</span><span>[Terms of Use]</span><span>[Research Disclaimer]</span><span>[IP Notice]</span>
        </span>
        <span className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>ZA-INV-MASTER-001 · Rev A · Not for Public Distribution</span>
      </div>
    </div>
  );
}