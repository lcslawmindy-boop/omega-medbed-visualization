import React, { useState } from "react";
import { base44 } from "@/api/base44Client";

export default function PhotoUploadField({ value, onChange, label = "PHOTO" }) {
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setBusy(false);
  };

  return (
    <label className="block">
      <span className="font-display block" style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{label}</span>
      <div className="flex items-center gap-2 mt-1">
        {value && <img src={value} alt="" className="rounded-full" style={{ width: 40, height: 40, objectFit: "cover" }} />}
        <input type="file" accept="image/*" onChange={pick} className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }} />
        {busy && <span className="font-mono" style={{ fontSize: 9, color: "var(--sky)" }}>UPLOADING…</span>}
      </div>
    </label>
  );
}