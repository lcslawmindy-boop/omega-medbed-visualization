import React from "react";

const W = 60;
const H = 18;

function path(data) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / span) * (H - 3) - 1.5;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function SensorRow({ label, value, data, color, status, statusColor, badge }) {
  return (
    <div className="py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2">
        <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--text-muted)", width: 46 }}>{label}</span>
        <span className="font-mono flex-1 min-w-0 truncate" style={{ fontSize: 10, color }}>{value}</span>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="flex-none" aria-hidden="true">
          <path d={path(data)} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5" style={{ paddingLeft: 46 }}>
        <span className="font-body" style={{ fontSize: 8.5, color: statusColor }}>● {status}</span>
        {badge && (
          <span className="font-display rounded px-1" style={{ fontSize: 7, color: "var(--amber)", border: "1px solid var(--amber)", letterSpacing: "0.05em" }}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}