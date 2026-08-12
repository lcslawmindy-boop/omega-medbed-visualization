import React from "react";
import { DOC_KIND_INFO } from "@/data/engineeringPackage";
import { BS_DOCUMENTS } from "@/data/brightstepsPackage";
import { generateEngDocument, generateEngPackage } from "@/lib/docPackageReport";

export default function BsDocPackagePanel() {
  return (
    <div>
      <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        ENGINEERING DOCUMENT PACKAGE — {BS_DOCUMENTS.length} CONTROLLED DOCUMENTS
      </div>
      <div className="font-mono mb-2" style={{ fontSize: 9, color: "var(--text-muted)" }}>
        BrightSteps BS-ATP-Ω · Rev A · 2026-08-12 · PRD / PDR / BOM / SOW / EVT / DVT
      </div>

      <div className="space-y-1.5">
        {BS_DOCUMENTS.map((d) => {
          const info = DOC_KIND_INFO[d.kind];
          return (
            <div key={d.id} className="bs-card flex items-center gap-3 px-3 py-2.5" style={{ background: "var(--bg-panel)" }}>
              <span
                className="font-display flex-none text-center rounded"
                style={{ fontSize: 10, width: 48, padding: "5px 0", color: "var(--sky)", border: "1px solid var(--sky-dim)", letterSpacing: "0.06em" }}
              >
                {d.kind}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-body truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{info.label}</div>
                <div className="font-mono truncate" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{d.code}</div>
                <div className="font-body truncate hidden sm:block" style={{ fontSize: 9, color: "var(--text-muted)" }}>{info.blurb}</div>
              </div>
              <button
                onClick={() => generateEngDocument(d.id)}
                className="font-display flex-none rounded"
                style={{ fontSize: 9, padding: "8px 10px", minHeight: 36, background: "var(--sky)", color: "#04121F", letterSpacing: "0.06em" }}
              >
                ⬇ PDF
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => generateEngPackage("brightsteps")}
        className="font-display rounded w-full mt-2"
        style={{ fontSize: 9.5, padding: "11px 12px", minHeight: 42, background: "var(--sky)", color: "#04121F", letterSpacing: "0.07em" }}
      >
        ⬇ DOWNLOAD FULL BS-ATP-Ω ENGINEERING PACKAGE (6 DOCS)
      </button>
    </div>
  );
}