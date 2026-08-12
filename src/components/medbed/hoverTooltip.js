import { MEDBED_COMPONENTS } from "@/data/medbedComponents";
import { MODALITY_BY_CODE } from "@/data/modalities";

// Builds the tooltip markup for a hovered chamber component / subsystem.
export function componentTooltipHtml(key) {
  const c = MEDBED_COMPONENTS[key];
  if (!c) return null;
  const mods = (c.mods || [])
    .map((code) => MODALITY_BY_CODE[code])
    .filter(Boolean)
    .map(
      (m) => `<span style="display:inline-flex;align-items:center;gap:4px;margin-right:8px;white-space:nowrap;">
        <span style="width:6px;height:6px;border-radius:50%;background:${m.color};box-shadow:0 0 6px ${m.color};"></span>
        <span style="font-family:var(--font-display);font-size:9px;color:${m.color};letter-spacing:0.06em;">${m.code}</span>
        <span style="font-family:var(--font-body);font-size:9px;color:var(--text-muted);">${m.name}</span>
      </span>`
    )
    .join("");

  return `
    <div style="font-family:var(--font-display);font-size:10px;color:var(--gold);letter-spacing:0.08em;white-space:nowrap;">${c.label}</div>
    <div style="font-family:var(--font-mono);font-size:8.5px;color:var(--text-muted);margin-top:2px;">${c.spec}</div>
    ${mods ? `<div style="margin-top:4px;padding-top:4px;border-top:1px solid var(--border);">${mods}</div>` : ""}
  `;
}