import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "@/components/shell/PageShell";
import { base44 } from "@/api/base44Client";
import DonorCard from "@/components/community/DonorCard";
import DonorProfileEditor from "@/components/community/DonorProfileEditor";
import { CONTACT_EMAIL } from "@/data/contact";

export default function Supporters() {
  const [donors, setDonors] = useState([]);
  const [mine, setMine] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const all = await base44.entities.Donor.filter({ is_public: true }, "-amount", 200);
    setDonors(all);
    let user = null;
    try { user = await base44.auth.me(); } catch { user = null; }
    if (user?.email) {
      setMine(await base44.entities.Donor.filter({ email: user.email }, "-created_date", 10));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const total = donors.reduce((s, d) => s + (d.amount || 0), 0);

  return (
    <PageShell title="SUPPORTER WALL" subtitle={`Donor badges, faces and comments · contact ${CONTACT_EMAIL}`} accent="var(--gold)">
      <div className="bs-card p-3 flex flex-wrap items-center gap-3" style={{ background: "var(--bg-panel)", borderRadius: 16 }}>
        <div>
          <div className="font-display" style={{ fontSize: 18, color: "var(--gold)" }}>{donors.length}</div>
          <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>PUBLIC SUPPORTERS</div>
        </div>
        <div>
          <div className="font-display" style={{ fontSize: 18, color: "var(--teal)" }}>${total.toLocaleString()}</div>
          <div className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>CONTRIBUTED ON THE WALL</div>
        </div>
        <Link
          to="/campaign-dashboard"
          className="font-display rounded-full ml-auto"
          style={{ fontSize: 9.5, padding: "11px 14px", minHeight: 40, background: "var(--gold)", color: "#1B1405", letterSpacing: "0.08em" }}
        >
          DONATE AND EARN YOUR BADGE
        </Link>
      </div>

      {mine.map((d) => (
        <DonorProfileEditor key={d.id} donor={d} onSaved={load} />
      ))}

      {loading ? (
        <div className="font-mono" style={{ fontSize: 9, color: "var(--text-muted)" }}>LOADING SUPPORTERS…</div>
      ) : donors.length === 0 ? (
        <div className="bs-card p-4 text-center font-body" style={{ background: "var(--bg-panel)", borderRadius: 16, fontSize: 11, color: "var(--text-muted)" }}>
          No public supporters yet — the first badge on this wall is still available.
        </div>
      ) : (
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
          {donors.map((d) => <DonorCard key={d.id} donor={d} />)}
        </div>
      )}

      <Link to="/forum" className="font-display block text-center rounded-full" style={{ fontSize: 9.5, padding: "12px", minHeight: 42, color: "var(--sky)", border: "1px solid var(--sky)", letterSpacing: "0.08em" }}>
        OPEN THE COMMUNITY FORUM →
      </Link>
    </PageShell>
  );
}