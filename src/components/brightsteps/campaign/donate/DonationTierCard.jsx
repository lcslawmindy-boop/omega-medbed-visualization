import React from "react";

const BTN = {
  ghost: { color: "var(--text-primary)", border: "1px solid var(--border)", background: "transparent" },
  sky: { background: "var(--sky)", color: "#04121F" },
  teal: { background: "var(--teal)", color: "#04211D" },
  violet: { background: "var(--violet)", color: "#170B33" },
  gold: { background: "linear-gradient(90deg,#C9A84C,#F2DC9B)", color: "#1B1405", boxShadow: "0 0 16px rgba(201,168,76,0.5)" },
};

export default function DonationTierCard({ tier, onSelect }) {
  return (
    <div
      className="bs-card p-3 flex flex-col"
      style={{
        background: "var(--bg-panel)",
        borderTop: `3px solid ${tier.color}`,
        gridColumn: tier.wide ? "1 / -1" : undefined,
        boxShadow: tier.glow ? "0 0 20px rgba(201,168,76,0.22)" : undefined,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-display" style={{ fontSize: 12, color: "var(--text-primary)", letterSpacing: "0.1em" }}>
          {tier.name}
        </span>
        <span
          className="font-display rounded-full flex-none"
          style={{ fontSize: 9, padding: "3px 8px", background: "rgba(201,168,76,0.15)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.4)" }}
        >
          {tier.amount}
        </span>
      </div>
      <p className="font-body" style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.65, margin: "8px 0 0" }}>
        {tier.blurb}
      </p>
      <ul className="mt-2.5 flex-1 space-y-1" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {tier.perks.map((p) => (
          <li key={p} className="font-body flex gap-1.5" style={{ fontSize: 9.5, color: "var(--text-muted)", lineHeight: 1.5 }}>
            <span style={{ color: tier.color === "var(--border)" ? "var(--text-muted)" : tier.color }}>✓</span>
            {p}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSelect(tier)}
        className="font-display rounded mt-3 w-full"
        style={{
          fontSize: tier.glow ? 10 : 9,
          padding: tier.glow ? "12px 12px" : "10px 12px",
          minHeight: 40,
          letterSpacing: "0.07em",
          ...BTN[tier.style],
        }}
      >
        {tier.cta}
      </button>
    </div>
  );
}