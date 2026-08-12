import React, { useState } from "react";
import { ENG_DOCUMENTS, PRODUCTS, DOC_KIND_INFO } from "@/data/engineeringPackage";
import { generateEngDocument, generateEngPackage } from "@/lib/docPackageReport";

export default function DocPackagePanel() {
  const [product, setProduct] = useState("omega");
  const docs = ENG_DOCUMENTS.filter((d) => d.product === product);
  const active = PRODUCTS.find((p) => p.id === product);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1 no-select">
        {PRODUCTS.map((p) => {
          const on = p.id === product;
          return (
            <button
              key={p.id}
              onClick={() => setProduct(p.id)}
              className="font-display rounded-sm"
              style={{
                fontSize: 9.5, padding: "7px 12px", letterSpacing: "0.06em", minHeight: 36,
                color: on ? "#000" : "var(--gold)",
                background: on ? "var(--gold)" : "transparent",
                border: `1px solid ${on ? "var(--gold)" : "var(--gold-dim)"}`,
              }}
            >
              {p.designator}
            </button>
          );
        })}
      </div>

      <div className="font-mono text-muted" style={{ fontSize: 9, lineHeight: 1.6 }}>
        {active.name} · {docs.length} controlled documents · Rev A · 2026-08-12
      </div>

      <div className="space-y-1.5">
        {docs.map((d) => {
          const info = DOC_KIND_INFO[d.kind];
          return (
            <div
              key={d.id}
              className="flex items-center gap-3 rounded-sm px-3 py-2.5"
              style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}
            >
              <span
                className="font-display flex-none text-center rounded-sm"
                style={{ fontSize: 10, width: 46, padding: "5px 0", color: "var(--gold)", border: "1px solid var(--gold-dim)", letterSpacing: "0.06em" }}
              >
                {d.kind}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-body truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{info.label}</div>
                <div className="font-mono text-muted truncate" style={{ fontSize: 8.5 }}>{d.code}</div>
                <div className="font-body text-muted truncate hidden sm:block" style={{ fontSize: 9 }}>{info.blurb}</div>
              </div>
              <button
                onClick={() => generateEngDocument(d.id)}
                className="font-display flex-none rounded-sm"
                style={{ fontSize: 9, padding: "8px 10px", minHeight: 36, background: "var(--gold)", color: "#000", letterSpacing: "0.06em" }}
              >
                ⬇ PDF
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={() => generateEngPackage(product)}
          className="font-display rounded-sm flex-1"
          style={{ fontSize: 9.5, padding: "10px 12px", minHeight: 40, background: "var(--gold)", color: "#000", letterSpacing: "0.06em" }}
        >
          ⬇ {active.designator} FULL PACKAGE
        </button>
        <button
          onClick={() => generateEngPackage(null)}
          className="font-display rounded-sm flex-1"
          style={{ fontSize: 9.5, padding: "10px 12px", minHeight: 40, color: "var(--gold)", border: "1px solid var(--gold)", background: "transparent", letterSpacing: "0.06em" }}
        >
          ⬇ BOTH PLATFORMS (12 DOCS)
        </button>
      </div>
    </div>
  );
}