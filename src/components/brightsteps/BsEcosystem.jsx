import React, { useState } from "react";
import { Image } from "@/components/ui/image";
import { BS_ECOSYSTEM } from "@/data/brightsteps";
import DocLightbox from "@/components/medbed/DocLightbox";

export default function BsEcosystem() {
  const [lightbox, setLightbox] = useState(null);
  const images = BS_ECOSYSTEM.map((i) => ({ ...i, rev: i.doc }));
  return (
    <div>
      <div className="font-display text-sky mb-2" style={{ fontSize: 10, letterSpacing: "0.14em" }}>
        BRIGHTSTEPS ECOSYSTEM — 9-DEVICE PRODUCT LINE
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        {BS_ECOSYSTEM.map((img, idx) => (
          <figure key={img.url} className="bs-card overflow-hidden" style={{ background: "var(--bg-panel)", margin: 0 }}>
            <button onClick={() => setLightbox(idx)} className="block w-full" aria-label={`Zoom ${img.title}`}>
              <Image src={img.url} alt={img.title} fittingType="fit" className="block w-full" style={{ aspectRatio: "4/3", background: "#0A1628" }} />
            </button>
            <figcaption className="px-2.5 py-1.5" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="font-body truncate" style={{ fontSize: 10, color: "var(--text-primary)" }}>{img.title}</div>
              <div className="font-mono truncate" style={{ fontSize: 8, color: "var(--text-muted)" }}>{img.doc}</div>
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