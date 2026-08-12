import React from "react";
import PageShell from "@/components/shell/PageShell";
import { BRAND_LOGOS, COPYRIGHT_NOTICE } from "@/data/brandLogos";
import { Image } from "@/components/ui/image";

export default function BrandMarks() {
  return (
    <PageShell
      title="AETHON APEX BRAND MARKS"
      subtitle="Five official logo variations — all marks are protected intellectual property"
      accent="var(--gold)"
    >
      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {BRAND_LOGOS.map((l, i) => (
          <div key={l.id} className="bs-card p-3" style={{ background: "var(--bg-panel)", borderRadius: 16 }}>
            <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>VARIATION 0{i + 1}</div>
            <div className="rounded-lg overflow-hidden mt-1.5" style={{ background: "#04060B", aspectRatio: "1 / 1" }}>
              <Image src={l.url} alt={l.name} className="w-full h-full" fittingType="fit" />
            </div>
            <div className="font-display mt-2" style={{ fontSize: 10.5, color: "var(--gold)", letterSpacing: "0.1em" }}>{l.name}</div>
            <div className="font-body" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 4 }}>{l.use}</div>
          </div>
        ))}
      </div>
      <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
        {COPYRIGHT_NOTICE} · All marks, renderings and documents on this platform are watermarked and may not be
        copied, downloaded or redistributed without written authorization.
      </div>
    </PageShell>
  );
}