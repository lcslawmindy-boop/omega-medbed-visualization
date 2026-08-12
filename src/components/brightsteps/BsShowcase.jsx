import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { BS_SHOWCASE, SHOWCASE_GROUPS } from "@/data/brightstepsShowcase";
import DocLightbox from "@/components/medbed/DocLightbox";

export default function BsShowcase() {
  const [group, setGroup] = useState("All");
  const [lightbox, setLightbox] = useState(null);
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
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {list.map((img, idx) => (
          <figure key={img.url} className="bs-card overflow-hidden" style={{ background: "var(--bg-panel)", margin: 0 }}>
            <button onClick={() => setLightbox(idx)} className="block w-full" aria-label={`Zoom ${img.title}`}>
              <Image src={img.url} alt={img.title} fittingType="fit" className="block w-full" style={{ aspectRatio: "16/10", background: "#0A1628" }} />
            </button>
            <figcaption className="px-2.5 py-1.5" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="font-body truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{img.title}</div>
              <div className="font-mono truncate" style={{ fontSize: 8, color: "var(--text-muted)" }}>{img.doc} · {img.group}</div>
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