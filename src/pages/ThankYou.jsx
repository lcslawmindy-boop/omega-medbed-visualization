import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/data/contact";
import "@/styles/brightsteps.css";

export default function ThankYou() {
  return (
    <div className="bs-root fixed inset-0 overflow-y-auto bs-scroll flex items-center justify-center p-4">
      <div className="bs-card p-5 text-center" style={{ background: "var(--bg-panel)", borderRadius: 20, border: "1px solid rgba(201,168,76,0.45)", maxWidth: 460 }}>
        <div style={{ fontSize: 34, color: "var(--gold)", lineHeight: 1 }}>◈</div>
        <div className="font-display mt-2" style={{ fontSize: 15, color: "var(--gold)", letterSpacing: "0.12em" }}>THANK YOU</div>
        <p className="font-body" style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.75, margin: "10px 0 0" }}>
          Your contribution is confirmed. Your donor badge is being issued now — visit the Supporter Wall
          to add your picture and a comment, and to join the community forum.
        </p>
        <div className="flex flex-col gap-2 mt-4">
          <Link to="/supporters" className="font-display rounded-full" style={{ fontSize: 10, padding: "12px", minHeight: 44, background: "var(--gold)", color: "#1B1405", letterSpacing: "0.08em" }}>
            OPEN MY SUPPORTER PROFILE
          </Link>
          <Link to="/forum" className="font-display rounded-full" style={{ fontSize: 10, padding: "12px", minHeight: 44, color: "var(--sky)", border: "1px solid var(--sky)", letterSpacing: "0.08em" }}>
            GO TO COMMUNITY FORUM
          </Link>
          <Link to="/" className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)", padding: "8px" }}>← BACK TO THE MISSION</Link>
        </div>
        <div className="font-mono mt-3" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>
          Questions: {CONTACT_EMAIL}
        </div>
      </div>
    </div>
  );
}