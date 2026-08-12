import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { MODALITIES } from "@/data/modalities";
import { POWER_WATTS, MAX_WATTS } from "@/data/powerAllocation";

const DEFAULT_ON = ["PBM", "PEMF", "VAT", "FIT", "MCT", "BIO", "EEG"];

const PRESETS = {
  "Deep Repair": ["PBM", "PEMF", "FIT", "MCT", "SFT", "PRI", "BIO"],
  "Trauma Release": ["VAT", "NAD", "EEG", "PBM", "BIO"],
  "TBI Recovery": ["PBM", "EEG", "PEMF", "NIA", "BIO"],
  "Sleep Induction": ["PEMF", "VAT", "NAD", "CHM", "BIO"],
  "Immune Boost": ["HIT", "OZO", "FIT", "NIA", "PBM", "BIO"],
};

function fmtDur(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function IntensitySlider({ label, value, set, min, max, unit }) {
  return (
    <div>
      <div className="flex justify-between font-mono mb-0.5" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        <span>{label}</span>
        <span style={{ color: "var(--gold)" }}>{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full" style={{ accentColor: "var(--gold)" }} />
    </div>
  );
}

function ModeToggle({ modes, value, set }) {
  return (
    <div className="flex gap-1">
      {modes.map((m) => (
        <button key={m} onClick={() => set(m)} className="font-mono rounded-sm flex-1" style={{ fontSize: 7.5, padding: "2px 0", background: value === m ? "var(--gold)" : "var(--bg-elevated)", color: value === m ? "#000" : "var(--text-muted)", border: "1px solid var(--border)" }}>
          {m}
        </button>
      ))}
    </div>
  );
}

export default function ProtocolBuilder({ open, onClose, onSessionStart }) {
  const [name, setName] = useState("");
  const [dur, setDur] = useState(1200);
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(MODALITIES.map((m) => [m.code, DEFAULT_ON.includes(m.code)]))
  );
  const [pbmI, setPbmI] = useState(100);
  const [fitT, setFitT] = useState(45);
  const [mctI, setMctI] = useState(200);
  const [pemfMode, setPemfMode] = useState("Both");
  const [vatRange, setVatRange] = useState("Full");
  const [bfac, setBfac] = useState(true);
  const [expanded, setExpanded] = useState(null);

  if (!open) return null;

  const activeCodes = MODALITIES.filter((m) => toggles[m.code]).map((m) => m.code);
  const draw = activeCodes.reduce((s, c) => s + (POWER_WATTS[c] || 0), 0);
  const pct = Math.min(100, (draw / MAX_WATTS) * 100);
  const barColor = draw > 3400 ? "var(--red)" : draw > 3000 ? "var(--amber)" : "var(--gold)";

  const toggle = (code) => setToggles((t) => ({ ...t, [code]: !t[code] }));
  const applyPreset = (codes) => setToggles(Object.fromEntries(MODALITIES.map((m) => [m.code, codes.includes(m.code)])));

  const save = () => {
    const data = {
      name: name || "Untitled Protocol",
      duration: dur,
      active: activeCodes,
      bfac,
      intensity: { PBM: pbmI, FIT: fitT, MCT: mctI, PEMF: pemfMode, VAT: vatRange },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("OMEGA MEDBED — Session Protocol", 14, 20);
    doc.setFontSize(11);
    doc.text(`Name: ${name || "Untitled Protocol"}`, 14, 32);
    doc.text(`Duration: ${fmtDur(dur)}`, 14, 40);
    doc.text(`BFAC Adaptation: ${bfac ? "ON" : "OFF (Manual Override)"}`, 14, 48);
    doc.text(`Estimated Draw: ${(draw / 1000).toFixed(2)} kW / 3.5 kW`, 14, 56);
    doc.text("Active Modalities:", 14, 68);
    activeCodes.forEach((c, i) => {
      const m = MODALITIES.find((mm) => mm.code === c);
      doc.text(`  - ${c} — ${m?.name || ""}`, 14, 76 + i * 7);
    });
    doc.save(`${(name || "protocol").replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <aside
      className="fixed z-[120] flex flex-col fade-in"
      style={{ top: 60, bottom: 40, right: 0, width: 320, background: "var(--bg-elevated)", borderLeft: "2px solid var(--gold)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b flex-none" style={{ borderColor: "var(--border)" }}>
        <div className="font-display text-gold" style={{ fontSize: 12, letterSpacing: "0.1em" }}>SESSION PROTOCOL BUILDER</div>
        <button onClick={onClose} className="text-gold hover:text-white transition-colors" style={{ fontSize: 18 }}>✕</button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-dark px-3 py-2 space-y-3">
        {/* Presets */}
        <div>
          <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.1em" }}>PROTOCOL PRESETS</div>
          <div className="flex flex-wrap gap-1">
            {Object.keys(PRESETS).map((p) => (
              <button key={p} onClick={() => applyPreset(PRESETS[p])} className="font-display rounded-sm transition-colors hover:brightness-125" style={{ fontSize: 8, padding: "3px 6px", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)" }}>
                {p}
              </button>
            ))}
            <button onClick={() => applyPreset([])} className="font-display rounded-sm" style={{ fontSize: 8, padding: "3px 6px", background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
              Custom
            </button>
          </div>
        </div>

        {/* Protocol name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Protocol Name..."
          className="w-full rounded-sm outline-none"
          style={{ background: "var(--bg-panel)", border: "1px solid var(--gold-dim)", color: "#fff", fontSize: 11, padding: "6px 8px" }}
        />

        {/* Duration */}
        <div>
          <div className="flex items-center justify-between">
            <div className="font-mono text-muted uppercase" style={{ fontSize: 8, letterSpacing: "0.1em" }}>SESSION DURATION</div>
            <div className="font-display text-gold" style={{ fontSize: 14 }}>{fmtDur(dur)}</div>
          </div>
          <input type="range" min={30} max={2700} step={30} value={dur} onChange={(e) => setDur(Number(e.target.value))} className="w-full" style={{ accentColor: "var(--gold)" }} />
          <div className="flex gap-1 mt-1">
            {[300, 900, 1800, 2700].map((s) => (
              <button key={s} onClick={() => setDur(s)} className="font-display rounded-sm flex-1 transition-colors" style={{ fontSize: 8, padding: "3px 0", background: dur === s ? "var(--gold)" : "var(--bg-panel)", color: dur === s ? "#000" : "var(--text-muted)", border: "1px solid var(--border)" }}>
                {s / 60}min
              </button>
            ))}
          </div>
        </div>

        {/* BFAC adaptation */}
        <div className="rounded-sm p-2" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="font-display text-gold" style={{ fontSize: 9, letterSpacing: "0.08em" }}>CLOSED-LOOP ADAPTATION</span>
            <button onClick={() => setBfac((b) => !b)} className="font-mono rounded-sm transition-colors" style={{ fontSize: 9, padding: "2px 8px", background: bfac ? "var(--green)" : "var(--bg-elevated)", color: bfac ? "#000" : "var(--text-muted)", border: `1px solid ${bfac ? "var(--green)" : "var(--border)"}` }}>
              {bfac ? "ON" : "OFF"}
            </button>
          </div>
          {!bfac && <div className="font-mono mt-1" style={{ fontSize: 8, color: "var(--amber)" }}>⚠ MANUAL OVERRIDE — BFAC disabled</div>}
        </div>

        {/* Modality toggles */}
        <div>
          <div className="font-mono text-muted uppercase mb-1" style={{ fontSize: 8, letterSpacing: "0.1em" }}>MODALITIES (18)</div>
          <div className="space-y-0.5">
            {MODALITIES.map((m) => {
              const on = toggles[m.code];
              const t3 = m.tierRank === 3;
              const hasIntensity = ["PBM", "PEMF", "VAT", "FIT", "MCT"].includes(m.code);
              return (
                <div key={m.code}>
                  <div className="flex items-center gap-2 py-1">
                    <button
                      onClick={() => toggle(m.code)}
                      className="flex-shrink-0 rounded-sm transition-colors"
                      style={{ width: 30, fontSize: 8, padding: "2px 0", background: on ? "var(--green)" : "var(--bg-panel)", color: on ? "#000" : "var(--text-muted)", border: `1px solid ${on ? "var(--green)" : "var(--border)"}` }}
                    >
                      {on ? "ON" : "OFF"}
                    </button>
                    <span className="font-display" style={{ fontSize: 9, width: 34, color: m.color }}>{m.code}</span>
                    <span className="font-body flex-1 truncate" style={{ fontSize: 9, color: on ? "var(--text-primary)" : "var(--text-muted)" }}>{m.name}</span>
                    {hasIntensity && on && (
                      <button onClick={() => setExpanded(expanded === m.code ? null : m.code)} className="font-mono" style={{ fontSize: 8, color: "var(--gold)" }}>
                        {expanded === m.code ? "▲" : "▼"}
                      </button>
                    )}
                  </div>
                  {on && t3 && (
                    <div className="font-mono ml-10" style={{ fontSize: 7.5, color: "var(--amber)" }}>⚠ Tier 3 — Frontier/Research modality enabled</div>
                  )}
                  {expanded === m.code && on && !bfac && (
                    <div className="ml-10 my-1 p-2 rounded-sm space-y-2" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
                      {m.code === "PBM" && <IntensitySlider label="Intensity" value={pbmI} set={setPbmI} min={10} max={120} unit="mW/cm²" />}
                      {m.code === "FIT" && <IntensitySlider label="Temperature" value={fitT} set={setFitT} min={37} max={55} unit="°C" />}
                      {m.code === "MCT" && <IntensitySlider label="Current" value={mctI} set={setMctI} min={1} max={999} unit="μA" />}
                      {m.code === "PEMF" && <ModeToggle modes={["Delta", "Schumann", "Both"]} value={pemfMode} set={setPemfMode} />}
                      {m.code === "VAT" && <ModeToggle modes={["20-40Hz", "40-528Hz", "Full"]} value={vatRange} set={setVatRange} />}
                    </div>
                  )}
                  {expanded === m.code && on && bfac && (
                    <div className="font-mono ml-10 my-1" style={{ fontSize: 8, color: "var(--text-muted)" }}>BFAC controlling — adaptation ON</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Power estimate */}
        <div className="rounded-sm p-2" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-display text-gold" style={{ fontSize: 9, letterSpacing: "0.06em" }}>ESTIMATED DRAW</span>
            <span className="font-mono" style={{ fontSize: 10, color: barColor }}>{(draw / 1000).toFixed(2)} kW / 3.5 kW</span>
          </div>
          <div className="rounded-sm overflow-hidden" style={{ background: "var(--bg-primary)", height: 10 }}>
            <div className="h-full rounded-sm transition-all" style={{ width: `${pct}%`, background: barColor, boxShadow: `0 0 8px ${barColor}` }} />
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-3 py-2 border-t space-y-1.5 flex-none" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => onSessionStart(activeCodes, dur)}
          className="w-full font-display rounded-sm transition-colors hover:brightness-110"
          style={{ fontSize: 11, padding: "8px 0", background: "var(--gold)", color: "#000", letterSpacing: "0.08em" }}
        >
          ▶ START SIMULATION
        </button>
        <div className="flex gap-1.5">
          <button onClick={save} className="flex-1 font-display rounded-sm transition-colors hover:brightness-125" style={{ fontSize: 9, padding: "6px 0", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)" }}>
            💾 Save
          </button>
          <button onClick={exportPdf} className="flex-1 font-display rounded-sm transition-colors hover:brightness-125" style={{ fontSize: 9, padding: "6px 0", background: "var(--bg-panel)", color: "var(--gold)", border: "1px solid var(--gold-dim)" }}>
            📤 Export PDF
          </button>
        </div>
      </div>
    </aside>
  );
}