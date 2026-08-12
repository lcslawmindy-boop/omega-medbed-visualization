import React from "react";

/* Lightweight animated SVG stand-ins for each device rendering. */
export default function DeviceVisual({ device }) {
  const box = { width: "100%", height: 200, display: "block" };
  if (device === "priore") {
    return (
      <svg viewBox="0 0 320 200" style={box} aria-label="Multichannel EM device">
        <defs>
          <radialGradient id="pv-beam"><stop offset="0%" stopColor="#fff" stopOpacity="0.95" /><stop offset="100%" stopColor="#fff" stopOpacity="0" /></radialGradient>
        </defs>
        <rect x="46" y="66" width="150" height="68" rx="34" fill="#10121C" stroke="#2A3350" />
        <rect x="70" y="84" width="102" height="32" rx="16" fill="#1A0F2E" stroke="#9B30FF" opacity="0.9" />
        <ellipse cx="121" cy="100" rx="40" ry="12" fill="#9B30FF" opacity="0.35">
          <animate attributeName="rx" values="40;30;40" dur="3s" repeatCount="indefinite" />
        </ellipse>
        {[["#C9A84C", 0], ["#1D6FA4", 1], ["#9B30FF", 2]].map(([c, i]) => (
          <path key={c} d={`M46 ${86 + i * 14} q 24 -14 48 0 t 48 0 t 48 0`} fill="none" stroke={c} strokeWidth="1.6" opacity="0.85">
            <animateTransform attributeName="transform" type="translate" values="0 0;24 0;0 0" dur={`${2 + i * 0.6}s`} repeatCount="indefinite" />
          </path>
        ))}
        <line x1="196" y1="100" x2="300" y2="100" stroke="#fff" strokeWidth="3" opacity="0.85" />
        <circle cx="300" cy="100" r="26" fill="url(#pv-beam)" />
        <text x="16" y="90" fill="#C9A84C" fontSize="8" fontFamily="monospace">F1</text>
        <text x="16" y="104" fill="#1D6FA4" fontSize="8" fontFamily="monospace">F2</text>
        <text x="16" y="118" fill="#9B30FF" fontSize="8" fontFamily="monospace">F3</text>
        <text x="248" y="90" fill="#E6EDF3" fontSize="8" fontFamily="monospace">Fz</text>
      </svg>
    );
  }
  if (device === "helmet") {
    return (
      <svg viewBox="0 0 320 200" style={box} aria-label="Cranial scalar healing helmet">
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx="160" cy={54 - i * 12} rx={60 - i * 12} ry={12 - i * 2} fill="none" stroke="#9B30FF" strokeWidth="1.2" opacity="0.55">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${2.4 + i * 0.5}s`} repeatCount="indefinite" />
          </ellipse>
        ))}
        <path d="M70 150 a90 88 0 0 1 180 0" fill="#10141F" stroke="#2A3350" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = Math.PI + (i / 7) * Math.PI;
          return <ellipse key={i} cx={160 + Math.cos(a) * 78} cy={150 + Math.sin(a) * 74} rx="11" ry="5" fill="none" stroke="#C9A84C" strokeWidth="1.6" opacity="0.9" />;
        })}
        {Array.from({ length: 11 }).map((_, i) => (
          <circle key={i} cx={82 + i * 15.6} cy={152 - Math.sin((i / 10) * Math.PI) * 26} r="3" fill="#38BDF8" opacity="0.85">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="140" y="120" width="40" height="14" fill="#0E2040" stroke="#38BDF8" opacity="0.8" />
        <text x="150" y="131" fill="#7D8590" fontSize="7" fontFamily="monospace">QTZ</text>
        <line x1="70" y1="152" x2="250" y2="152" stroke="#2A3350" />
      </svg>
    );
  }
  if (device === "vpo") {
    return (
      <svg viewBox="0 0 320 200" style={box} aria-label="VPO anenergy pump">
        <defs>
          <radialGradient id="vpo-shimmer"><stop offset="45%" stopColor="#FFF3CF" stopOpacity="0.22" /><stop offset="100%" stopColor="#C9A84C" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="160" cy="100" r="88" fill="url(#vpo-shimmer)">
          <animate attributeName="r" values="80;92;80" dur="4s" repeatCount="indefinite" />
        </circle>
        <rect x="98" y="58" width="124" height="86" rx="12" fill="#10141F" stroke="#2A3350" />
        <path d="M160 100 m -34 0 a34 34 0 1 1 68 0 a21 21 0 1 1 -42 0 a13 13 0 1 1 26 0" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.95">
          <animateTransform attributeName="transform" type="rotate" from="0 160 100" to="360 160 100" dur="14s" repeatCount="indefinite" />
        </path>
        {[[112, 70], [208, 70], [112, 132], [208, 132]].map(([x, y], i) => (
          <polygon key={i} points={`${x},${y - 8} ${x + 6},${y} ${x},${y + 8} ${x - 6},${y}`} fill="#DDEBFF" opacity="0.75">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </polygon>
        ))}
        <text x="128" y="164" fill="#7D8590" fontSize="8" fontFamily="monospace">ATPase RESONANCE</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 200" style={box} aria-label="Scalar energy grid node">
      <defs>
        <radialGradient id="grid-core"><stop offset="0%" stopColor="#7FE9DA" stopOpacity="0.95" /><stop offset="100%" stopColor="#0D9488" stopOpacity="0" /></radialGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="160" cy="150" rx={70 + i * 44} ry={16 + i * 8} fill="none" stroke="#0D9488" strokeWidth="1" opacity="0.4">
          <animate attributeName="opacity" values="0.05;0.5;0.05" dur="3.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
      <path d="M118 108 a42 42 0 0 1 84 0 z" fill="#0B2230" stroke="#38BDF8" opacity="0.9" />
      <circle cx="160" cy="92" r="18" fill="url(#grid-core)">
        <animate attributeName="r" values="14;20;14" dur="2.6s" repeatCount="indefinite" />
      </circle>
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={160 + Math.cos((i / 8) * Math.PI * 2) * 46} cy={112 + Math.sin((i / 8) * Math.PI * 2) * 11} r="3.2" fill="#C9A84C" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="126" y={118 + i * 9} width="68" height="6" rx="3" fill="#B87333" opacity="0.9" />
      ))}
      {[[36, 20], [56, 30], [80, 14], [104, 26], [224, 24], [248, 16], [272, 28]].map(([x, h], i) => (
        <rect key={i} x={x} y={168 - h} width="12" height={h} fill="#1A2540" stroke="#2A3350" />
      ))}
      <line x1="10" y1="168" x2="310" y2="168" stroke="#2A3350" />
    </svg>
  );
}