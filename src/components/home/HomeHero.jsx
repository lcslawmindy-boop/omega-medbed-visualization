import React from "react";

const CHAPTERS = [
  ["#emf", "EMF"],
  ["#asd", "ASD"],
  ["#veterans", "VETERANS"],
  ["#fertility", "FERTILITY"],
  ["#timeline", "TIMELINE"],
  ["#solution", "SOLUTION"],
  ["#devices", "DEVICES"],
  ["#donate", "DONATE"],
  ["#showcases", "SIMULATIONS"],
  ["#campaign", "CAMPAIGN"],
  ["#docs", "ENGINEERING"],
];

export default function HomeHero() {
  return (
    <header className="bs-card p-5" style={{ background: "linear-gradient(150deg, #0E1525 0%, #050A14 100%)", borderLeft: "3px solid var(--sky)" }}>
      <div className="font-display" style={{ fontSize: 9.5, color: "var(--sky)", letterSpacing: "0.2em" }}>
        AETHON APEX IP HOLDINGS LLC — RESEARCH CONCEPT PROGRAM
      </div>
      <h1 className="font-display" style={{ fontSize: 26, lineHeight: 1.25, color: "var(--text-primary)", margin: "10px 0 0" }}>
        FOUR CRISES. ONE ROOT CAUSE.<br />ONE ENGINEERING ANSWER.
      </h1>
      <p className="font-body" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.75, margin: "10px 0 0", maxWidth: 640 }}>
        Start at the environment. Follow it through the children, the veterans and the fertility curve. See both futures, then walk the hardware, the simulations, the capital plan and the full engineering record — in that order.
      </p>
      <nav className="flex flex-wrap gap-1.5 mt-4">
        {CHAPTERS.map(([href, label], i) => (
          <a
            key={href}
            href={href}
            className="font-display rounded-full"
            style={{
              fontSize: 8.5, padding: "7px 11px", minHeight: 32, display: "inline-flex", alignItems: "center",
              letterSpacing: "0.1em", color: "var(--sky)", border: "1px solid var(--border)", background: "var(--bg-panel)",
            }}
          >
            {String(i + 1).padStart(2, "0")} {label}
          </a>
        ))}
      </nav>
    </header>
  );
}