import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { usePdfAccess, DONATION_THRESHOLD } from "@/lib/usePdfAccess";

const inputStyle = {
  fontSize: 10, padding: "9px 10px", minHeight: 38, width: "100%",
  background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)",
};

export default function PdfAccessGate({ children }) {
  const { loading, allowed, user, request, reload } = usePdfAccess();
  const [form, setForm] = useState({ organization: "", reason: "" });
  const [sending, setSending] = useState(false);

  if (loading) return <div className="font-mono text-muted p-3" style={{ fontSize: 9 }}>VERIFYING DOCUMENT CREDENTIALS…</div>;
  if (allowed) return children;

  const submit = async () => {
    setSending(true);
    await base44.entities.DocAccessRequest.create({
      full_name: user?.full_name || "Unknown",
      email: user?.email || "",
      organization: form.organization,
      reason: form.reason,
      status: "pending",
    });
    setSending(false);
    reload();
  };

  return (
    <div className="rounded-sm p-4 text-center" style={{ background: "var(--bg-panel)", border: "1px solid var(--red)" }}>
      <div className="font-display" style={{ fontSize: 11, letterSpacing: "0.18em", color: "#FFD9D6" }}>
        CONTROLLED DOCUMENTS — ACCESS RESTRICTED
      </div>
      <div className="font-mono mx-auto mt-2" style={{ fontSize: 9, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 420 }}>
        Engineering PDFs are released to administrators only. Investors may request access
        for review, or unlock the full package with a verified contribution of $
        {DONATION_THRESHOLD.toLocaleString()} or more.
      </div>

      {request?.status === "pending" ? (
        <div className="font-display mt-3" style={{ fontSize: 10, color: "var(--amber)", letterSpacing: "0.1em" }}>
          REQUEST SUBMITTED — PENDING ADMINISTRATOR REVIEW
        </div>
      ) : (
        <div className="space-y-2 mt-3 mx-auto text-left" style={{ maxWidth: 420 }}>
          {request?.status === "denied" && (
            <div className="font-mono" style={{ fontSize: 9, color: "var(--red)" }}>Previous request was declined. You may submit an updated request.</div>
          )}
          <input
            className="font-body rounded-sm"
            style={inputStyle}
            placeholder="Organization / fund"
            value={form.organization}
            onChange={(e) => setForm({ ...form, organization: e.target.value })}
          />
          <textarea
            className="font-body rounded-sm"
            style={{ ...inputStyle, minHeight: 70 }}
            placeholder="Purpose of review"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
          <button
            onClick={submit}
            disabled={sending}
            className="font-display rounded-sm w-full"
            style={{ fontSize: 9.5, padding: "10px", minHeight: 40, background: "var(--gold)", color: "#000", letterSpacing: "0.08em", opacity: sending ? 0.6 : 1 }}
          >
            {sending ? "SUBMITTING…" : "REQUEST DOCUMENT ACCESS"}
          </button>
        </div>
      )}

      <Link
        to="/campaign-dashboard#donate"
        className="font-display inline-block mt-3 rounded-sm"
        style={{ fontSize: 9.5, padding: "10px 14px", minHeight: 40, color: "var(--teal)", border: "1px solid var(--teal)", letterSpacing: "0.08em" }}
      >
        UNLOCK VIA ${DONATION_THRESHOLD.toLocaleString()}+ CONTRIBUTION
      </Link>

      <div className="font-mono mt-3" style={{ fontSize: 8, color: "var(--text-muted)", lineHeight: 1.7 }}>
        © 2026 Aethon Apex IP Holdings LLC — All rights reserved. Documents are confidential
        and released only under executed NDA. Reproduction or redistribution is prohibited.
      </div>
    </div>
  );
}