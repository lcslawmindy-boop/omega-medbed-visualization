import React from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/omega", label: "OMEGA MEDBED" },
  { to: "/brightsteps", label: "BRIGHTSTEPS" },
  { to: "/hardware-gallery", label: "DEVICES" },
  { to: "/campaign-dashboard", label: "CAMPAIGN" },
  { to: "/investor-portal", label: "INVESTORS" },
  { to: "/engineering", label: "ENGINEERING" },
  { to: "/clinical-trials", label: "TRIALS" },
  { to: "/supporters", label: "SUPPORTERS" },
  { to: "/forum", label: "FORUM" },
  { to: "/kidsos", label: "KIDS-OS" },
];

export default function AppNav({ top = 0 }) {
  const { pathname } = useLocation();
  return (
    <nav
      className="sticky z-20 overflow-x-auto bs-scroll"
      style={{ top, background: "rgba(7,11,20,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-1.5 px-3" style={{ minHeight: 48 }}>
        {LINKS.map((l) => {
          const on = pathname.toLowerCase() === l.to.toLowerCase();
          return (
            <Link
              key={l.to}
              to={l.to}
              className="font-display rounded-full whitespace-nowrap"
              style={{
                fontSize: 9, letterSpacing: "0.1em", padding: "9px 12px", minHeight: 36,
                display: "flex", alignItems: "center",
                color: on ? "#04121F" : "var(--text-muted)",
                background: on ? "var(--sky)" : "transparent",
                border: `1px solid ${on ? "var(--sky)" : "var(--border)"}`,
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}