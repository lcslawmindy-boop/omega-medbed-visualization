import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { base44 } from "@/api/base44Client";
import DashKpis from "@/components/dashboard/DashKpis";
import DashTrends from "@/components/dashboard/DashTrends";
import DashSessionTable from "@/components/dashboard/DashSessionTable";

export default function SessionDashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    base44.entities.SessionLog.list("started_at", 200).then((rows) => {
      setSessions(rows);
      if (rows.length) setSelectedId(rows[rows.length - 1].id);
      setLoading(false);
    });
  }, []);

  const data = useMemo(
    () =>
      sessions.map((s) => ({
        label: s.started_at ? format(new Date(s.started_at), "MMM d") : "—",
        scalar_field: s.scalar_field ?? 0,
        power_stability: s.power_stability ?? 0,
        kw: (s.total_watts ?? 0) / 1000,
        hrv: s.hrv ?? 0,
        eeg_alpha: s.eeg_alpha ?? 0,
        spo2: s.spo2 ?? 0,
      })),
    [sessions]
  );

  const curve = useMemo(() => {
    const s = sessions.find((x) => x.id === selectedId);
    return (s?.samples || []).map((p) => ({ t: `${Math.round(p.t / 1000)}s`, scalar: p.scalar, thermal: p.thermal, power: p.power }));
  }, [sessions, selectedId]);

  return (
    <div className="fixed inset-0 overflow-y-auto scroll-dark" style={{ background: "var(--bg-primary)" }}>
      <header
        className="sticky top-0 z-10 flex items-center gap-3 px-3 safe-top"
        style={{ height: "calc(60px + env(safe-area-inset-top))", background: "var(--bg-panel)", borderBottom: "1px solid var(--border)" }}
      >
        <button onClick={() => navigate("/")} className="text-gold flex items-center justify-center" style={{ fontSize: 18, minWidth: 40, minHeight: 44 }} aria-label="Back">←</button>
        <div className="min-w-0">
          <div className="font-display text-gold truncate" style={{ fontSize: 14, letterSpacing: "0.08em" }}>SESSION PERFORMANCE DASHBOARD</div>
          <div className="font-mono truncate" style={{ fontSize: 9, color: "var(--text-muted)" }}>Scalar field · power stability · biometric trends</div>
        </div>
      </header>

      <div className="p-3 space-y-2.5 pb-10">
        {loading ? (
          <div className="font-mono py-16 text-center" style={{ fontSize: 11, color: "var(--text-muted)" }}>Loading session telemetry…</div>
        ) : sessions.length === 0 ? (
          <div className="font-mono py-16 text-center" style={{ fontSize: 11, color: "var(--text-muted)" }}>No sessions logged yet. Run a protocol to populate trend data.</div>
        ) : (
          <>
            <DashKpis sessions={sessions} />
            <DashTrends data={data} curve={curve} />
            <DashSessionTable sessions={sessions} selectedId={selectedId} onSelect={setSelectedId} />
          </>
        )}
      </div>
    </div>
  );
}