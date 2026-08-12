import React from "react";
import { Image } from "@/components/ui/image";
import { tierColor } from "@/lib/donorTier";

export default function DonorCard({ donor }) {
  const color = tierColor(donor.tier);
  return (
    <div className="bs-card p-3" style={{ background: "var(--bg-card)", borderRadius: 16, border: `1px solid ${color}` }}>
      <div className="flex items-center gap-2.5">
        {donor.photo_url ? (
          <Image
            src={donor.photo_url}
            alt={donor.display_name}
            className="flex-none rounded-full"
            style={{ width: 48, height: 48 }}
          />
        ) : (
          <div
            className="font-display flex-none rounded-full flex items-center justify-center"
            style={{ width: 48, height: 48, background: "var(--bg-elevated)", color, fontSize: 15 }}
          >
            {donor.badge || "•"}
          </div>
        )}
        <div className="min-w-0">
          <div className="font-body truncate" style={{ fontSize: 11.5, color: "var(--text-primary)" }}>{donor.display_name}</div>
          <div className="font-mono truncate" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>{donor.location || "—"}</div>
          <span className="font-display inline-block mt-1 rounded-full" style={{ fontSize: 8, padding: "3px 8px", color, border: `1px solid ${color}` }}>
            {donor.badge} {donor.tier}
          </span>
        </div>
      </div>
      {donor.comment && (
        <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "9px 0 0" }}>
          “{donor.comment}”
        </p>
      )}
    </div>
  );
}