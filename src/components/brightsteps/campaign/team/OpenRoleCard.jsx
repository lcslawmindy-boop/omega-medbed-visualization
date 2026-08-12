import React from "react";
import { GOLD } from "@/data/campaignTeam";

export default function OpenRoleCard({ role }) {
  return (
    <div className="bs-card p-3 flex flex-col items-center text-center" style={{ background: "var(--bg-panel)", border: `1px dashed ${GOLD}` }}>
      <div className="font-display" style={{ fontSize: 10, color: GOLD, letterSpacing: "0.12em" }}>{role.role}</div>
      <div className="font-mono mt-1" style={{ fontSize: 9.5, color: "var(--text-muted)" }}>{role.status}</div>
      <p className="font-body flex-1" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.6, margin: "8px 0 0" }}>{role.body}</p>
      <a
        href={`mailto:${role.mail}`}
        className="font-display rounded mt-3 w-full"
        style={{ fontSize: 9, padding: "11px 10px", minHeight: 40, color: GOLD, border: `1px solid ${GOLD}`, letterSpacing: "0.07em", display: "block" }}
      >
        {role.cta}
      </a>
    </div>
  );
}