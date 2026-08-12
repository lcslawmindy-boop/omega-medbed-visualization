import React from "react";
import { Link } from "react-router-dom";

// Card that hands the visitor off to a full sub-experience (simulation, campaign, docs).
export default function JourneyLink({ to, tag, title, body, cta, color = "var(--sky)" }) {
  return (
    <Link to={to} className="bs-card block p-4" style={{ background: "var(--bg-card)", borderLeft: `3px solid ${color}`, textDecoration: "none" }}>
      <div className="font-display" style={{ fontSize: 9.5, color, letterSpacing: "0.16em" }}>{tag}</div>
      <div className="font-display mt-1" style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.35 }}>{title}</div>
      <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "6px 0 0" }}>{body}</p>
      <span className="font-display inline-flex items-center rounded mt-3" style={{ fontSize: 9, padding: "9px 12px", minHeight: 38, background: color, color: "#04121F", letterSpacing: "0.08em" }}>
        {cta} →
      </span>
    </Link>
  );
}