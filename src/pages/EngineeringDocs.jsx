import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { MODALITIES } from "@/data/modalities";
import { ENG_DOC_IMAGES, BOM_METRICS, SYSTEM_SPECS, DOC_SECTIONS } from "@/data/engineeringDocs";
import DocLightbox from "@/components/medbed/DocLightbox";
import DocPackagePanel from "@/components/medbed/DocPackagePanel";

export default function EngineeringDocs() {
  const navigate = useNavigate();
  const [section, setSection] = useState("assembly");
  const [lightbox, setLightbox] = useState(null);

  const sectionImages = ENG_DOC_IMAGES.filter((i) => i.section === section);
  const openLightbox = (img) => setLightbox(ENG_DOC_IMAGES.indexOf(img));

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "var(--bg-primary)" }}>
      <header className="flex items-center gap-3 px-4 safe-top no-select flex-none" style={{ height: "calc(56px + env(safe-area-inset-top))", borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
        <button onClick={() => navigate("/")} className="text-gold flex items-center justify-center flex-none" style={{ fontSize: 20, minWidth: 44, minHeight: 44 }} aria-label="Back">←</button>
        <div className="flex flex-col leading-tight flex-1 min-w-0">
          <span className="font-display font-bold text-gold truncate" style={{ fontSize: 13, letterSpacing: "0.04em" }}>ENGINEERING DOCUMENTATION</span>
          <span className="font-mono text-muted truncate" style={{ fontSize: 10 }}>ZA-ENG-MB-OMEGA-A · Rev A · 2026-08-12</span>
        </div>
        <span className="font-display flex-none" style={{ fontSize: 8, color: "var(--red)", border: "1px solid var(--red)", padding: "3px 6px", letterSpacing: "0.08em" }}>CLASS III</span>
      </header>

      <div className="flex gap-2 px-3 py-2 overflow-x-auto scroll-dark no-select flex-none" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
        {BOM_METRICS.map((m) => (
          <div key={m.label} className="flex-none rounded-sm px-3 py-1.5" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
            <div className="font-mono text-muted" style={{ fontSize: 8, letterSpacing: "0.08em" }}>{m.label}</div>
            <div className="font-display text-gold" style={{ fontSize: 13 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 px-3 py-2 overflow-x-auto scroll-dark no-select flex-none" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
        {DOC_SECTIONS.map((s) => {
          const active = s.id === section;
          return (
            <button key={s.id} onClick={() => setSection(s.id)} className="flex-none font-display rounded-sm" style={{ fontSize: 10, padding: "6px 12px", letterSpacing: "0.08em", color: active ? "#000" : "var(--gold)", background: active ? "var(--gold)" : "transparent", border: `1px solid ${active ? "var(--gold)" : "var(--gold-dim)"}`, minHeight: 32 }}>
              {s.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto scroll-dark p-3 space-y-3 select-text">
        {section === "documents" ? (
          <>
            <SectionTitle>ENGINEERING DOCUMENT PACKAGE</SectionTitle>
            <DocPackagePanel />
          </>
        ) : section === "modalities" ? (
          <>
            <SectionTitle>SYSTEM SPECIFICATIONS</SectionTitle>
            <div className="rounded-sm overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--bg-panel)" }}>
              {SYSTEM_SPECS.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-px" style={{ background: "var(--border)" }}>
                  {[0, 2].map((c) => (
                    <div key={c} className="flex items-baseline gap-2 px-2.5 py-1.5" style={{ background: "var(--bg-panel)" }}>
                      <span className="font-mono text-muted" style={{ fontSize: 9 }}>{row[c]}</span>
                      <span className="font-mono text-gold truncate" style={{ fontSize: 10 }}>{row[c + 1]}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <SectionTitle>18 INTEGRATED MODALITIES</SectionTitle>
            <div className="space-y-1">
              {MODALITIES.map((m, i) => (
                <div key={m.code} className="flex items-center gap-2.5 rounded-sm px-2.5 py-2" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
                  <span className="font-mono text-muted flex-none" style={{ fontSize: 9, width: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-block w-2.5 h-2.5 rounded-full flex-none" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                  <span className="font-display flex-none" style={{ fontSize: 10, color: m.color, width: 38, letterSpacing: "0.06em" }}>{m.code}</span>
                  <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{m.name}</span>
                  <span className="font-mono text-muted flex-none hidden sm:block truncate" style={{ fontSize: 8.5, maxWidth: 180 }}>{m.spec}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          sectionImages.map((img) => (
            <figure key={img.url} className="rounded-sm overflow-hidden" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
              <button onClick={() => openLightbox(img)} className="block w-full" style={{ minHeight: 44 }} aria-label={`Zoom ${img.title}`}>
                <Image src={img.url} alt={img.title} fittingType="fit" className="block w-full" style={{ aspectRatio: "4/3" }} />
              </button>
              <figcaption className="px-3 py-2 flex items-center justify-between gap-2" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="min-w-0">
                  <div className="font-display text-gold truncate" style={{ fontSize: 11, letterSpacing: "0.06em" }}>{img.title}</div>
                  <div className="font-mono text-muted truncate" style={{ fontSize: 9 }}>{img.doc} · {img.rev}</div>
                </div>
                <span className="font-mono text-muted flex-none" style={{ fontSize: 8.5, letterSpacing: "0.08em" }}>TAP TO ZOOM</span>
              </figcaption>
            </figure>
          ))
        )}
        <div className="font-mono text-muted text-center py-3" style={{ fontSize: 8, lineHeight: 1.6 }}>
          CONCEPT — MANUFACTURER VALIDATION REQUIRED · NOT APPROVED FOR CLINICAL USE<br />© 2026 Aethon Apex IP Holdings LLC
        </div>
      </div>

      {lightbox !== null && (
        <DocLightbox images={ENG_DOC_IMAGES} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      )}
    </div>
  );
}

function SectionTitle({ children }) {
  return <div className="font-display text-gold pt-1" style={{ fontSize: 10, letterSpacing: "0.14em" }}>{children}</div>;
}