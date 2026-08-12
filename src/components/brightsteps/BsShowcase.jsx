import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { BS_SHOWCASE, SHOWCASE_GROUPS } from "@/data/brightstepsShowcase";
import DocLightbox from "@/components/medbed/DocLightbox";
import { downloadSheetPdf, downloadInvestorPackage } from "@/lib/showcasePdf";
import { usePdfAccess } from "@/lib/usePdfAccess";

export default function BsShowcase() {
  const { allowed: pdfAllowed } = usePdfAccess();
  const [group, setGroup] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [busy, setBusy] = useState(null);
  const list = group === "All" ? BS_SHOWCASE : BS_SHOWCASE.filter((i) => i.group === group);
  const images = list.map((i) => ({ ...i, rev: i.group }));

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <div className="font-display text-sky" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
          ENGINEERING SHOWCASE — {BS_SHOWCASE.length} REFERENCE SHEETS
        </div>
        <div className="flex gap-1.5">
          {SHOWCASE_GROUPS.map((g) => {
            const on = g === group;
            return (
              <button
                key={g}
                onClick={() => { setGroup(g); setLightbox(null); }}
                className="font-display"
                style={{
                  fontSize: 8.5, padding: "5px 9px", minHeight: 30, letterSpacing: "0.08em",
                  color: on ? "#04121F" : "var(--text-muted)",
                  background: on ? "var(--sky)" : "transparent",
                  border: `1px solid ${on ? "var(--sky)" : "var(--border)"}`,
                }}
              >
                {g.toUpperCase()}
              </button>
            );
          })}
        </div>
        {!pdfAllowed && (
          <span className="font-mono ml-auto" style={{ fontSize: 8, color: "var(--red)", border: "1px solid var(--red)", padding: "5px 8px", letterSpacing: "0.1em" }}>
            🔒 PDF EXPORT RESTRICTED — ADMIN / APPROVED INVESTORS
          </span>
        )}
        {pdfAllowed && <button
          onClick={async () => {
            setBusy("pkg");
            try { await downloadInvestorPackage(BS_SHOWCASE, (n, t) => setBusy(`${n}/${t}`)); }
            finally { setBusy(null); }
          }}
          disabled={!!busy}
          className="font-display ml-auto rounded-md"
          style={{ fontSize: 9, padding: "6px 10px", minHeight: 32, letterSpacing: "0.07em", background: "var(--sky)", color: "#04121F", opacity: busy ? 0.6 : 1 }}
        >
          {busy && busy !== "sheet" ? `BUILDING PDF ${busy === "pkg" ? "" : busy}` : "⬇ INVESTOR PDF PACKAGE"}
        </button>}
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {list.map((img, idx) => (
          <figure key={img.url} className="bs-card overflow-hidden" style={{ background: "var(--bg-panel)", margin: 0 }}>
            <button onClick={() => setLightbox(idx)} className="block w-full" aria-label={`Zoom ${img.title}`}>
              <Image src={img.url} alt={img.title} fittingType="fit" className="block w-full" style={{ aspectRatio: "16/10", background: "#0A1628" }} />
            </button>
            <figcaption className="px-2.5 py-1.5" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="font-body truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{img.title}</div>
              <div className="flex items-center gap-2">
                <div className="font-mono truncate flex-1" style={{ fontSize: 8, color: "var(--text-muted)" }}>{img.doc} · {img.group}</div>
                {pdfAllowed && <button
                  onClick={async () => { setBusy("sheet"); try { await downloadSheetPdf(img); } finally { setBusy(null); } }}
                  disabled={!!busy}
                  className="font-display flex-none rounded"
                  style={{ fontSize: 8, padding: "4px 7px", minHeight: 28, color: "var(--sky)", border: "1px solid var(--sky-dim)", opacity: busy ? 0.6 : 1 }}
                >
                  ⬇ PDF
                </button>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <DocLightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}
    </div>
  );
}