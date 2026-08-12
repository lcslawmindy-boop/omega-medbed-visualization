import React, { useEffect, useState } from "react";
import PageShell from "@/components/shell/PageShell";
import SectionCard from "@/components/shell/SectionCard";

const KEY = "aa_routines";
const DEFAULT_ROUTINES = [
  { id: "r1", name: "Morning Start", icon: "🌅", tasks: [
    { id: "t1", label: "Wake up and stretch", mins: 3 },
    { id: "t2", label: "Brush teeth", mins: 3 },
    { id: "t3", label: "Get dressed", mins: 6 },
    { id: "t4", label: "Breakfast", mins: 15 },
  ]},
  { id: "r2", name: "Calm Time", icon: "🕊️", tasks: [
    { id: "t5", label: "Pod session — sensory regulation", mins: 20 },
    { id: "t6", label: "Quiet corner with a book", mins: 10 },
  ]},
];

const field = {
  padding: "10px 12px", minHeight: 44, fontSize: 12, borderRadius: 8,
  background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-primary)",
};
const uid = () => Math.random().toString(36).slice(2, 9);

export default function RoutineManager() {
  const [routines, setRoutines] = useState(DEFAULT_ROUTINES);
  const [newRoutine, setNewRoutine] = useState("");
  const [draft, setDraft] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setRoutines(JSON.parse(raw));
  }, []);

  const persist = (next) => { setRoutines(next); localStorage.setItem(KEY, JSON.stringify(next)); };

  const addRoutine = () => {
    if (!newRoutine.trim()) return;
    persist([...routines, { id: uid(), name: newRoutine.trim(), icon: "⭐", tasks: [] }]);
    setNewRoutine("");
  };
  const removeRoutine = (id) => persist(routines.filter((r) => r.id !== id));
  const addTask = (rid) => {
    const text = (draft[rid] || "").trim();
    if (!text) return;
    persist(routines.map((r) => (r.id === rid ? { ...r, tasks: [...r.tasks, { id: uid(), label: text, mins: 5 }] } : r)));
    setDraft((d) => ({ ...d, [rid]: "" }));
  };
  const removeTask = (rid, tid) =>
    persist(routines.map((r) => (r.id === rid ? { ...r, tasks: r.tasks.filter((t) => t.id !== tid) } : r)));
  const move = (rid, idx, dir) =>
    persist(routines.map((r) => {
      if (r.id !== rid) return r;
      const t = [...r.tasks];
      const j = idx + dir;
      if (j < 0 || j >= t.length) return r;
      [t[idx], t[j]] = [t[j], t[idx]];
      return { ...r, tasks: t };
    }));
  const setMins = (rid, tid, mins) =>
    persist(routines.map((r) => (r.id === rid ? { ...r, tasks: r.tasks.map((t) => (t.id === tid ? { ...t, mins } : t)) } : r)));

  return (
    <PageShell title="ROUTINE MANAGER" subtitle="Create, sequence and customise daily routines" accent="var(--teal, #2DD4BF)">
      <SectionCard title="NEW ROUTINE" accent="var(--teal, #2DD4BF)">
        <div className="flex gap-2">
          <input style={{ ...field, flex: 1 }} className="font-body" placeholder="Routine name (e.g. Bedtime)" value={newRoutine}
            onChange={(e) => setNewRoutine(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addRoutine()} />
          <button onClick={addRoutine} className="font-display rounded" style={{ fontSize: 10, padding: "10px 14px", minHeight: 44, background: "var(--teal, #2DD4BF)", color: "#04121F" }}>ADD</button>
        </div>
      </SectionCard>

      {routines.map((r) => (
        <SectionCard key={r.id} title={`${r.icon} ${r.name.toUpperCase()}`} accent="var(--sky, #38BDF8)"
          note={`${r.tasks.length} steps · ${r.tasks.reduce((s, t) => s + Number(t.mins || 0), 0)} min total`}>
          <div className="space-y-1.5">
            {r.tasks.map((t, i) => (
              <div key={t.id} className="bs-card flex items-center gap-2 px-2.5 py-2" style={{ background: "var(--bg-panel)" }}>
                <span className="font-mono flex-none" style={{ fontSize: 9, color: "var(--sky)", width: 18 }}>{i + 1}</span>
                <span className="font-body flex-1 min-w-0 truncate" style={{ fontSize: 11, color: "var(--text-primary)" }}>{t.label}</span>
                <input
                  type="number" min={1} max={90} value={t.mins}
                  onChange={(e) => setMins(r.id, t.id, e.target.value)}
                  className="font-mono rounded text-center"
                  style={{ width: 52, minHeight: 36, fontSize: 10, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                />
                <span className="font-mono" style={{ fontSize: 8.5, color: "var(--text-muted)" }}>min</span>
                <button onClick={() => move(r.id, i, -1)} aria-label="Move up" style={{ minWidth: 32, minHeight: 36, color: "var(--text-muted)" }}>▲</button>
                <button onClick={() => move(r.id, i, 1)} aria-label="Move down" style={{ minWidth: 32, minHeight: 36, color: "var(--text-muted)" }}>▼</button>
                <button onClick={() => removeTask(r.id, t.id)} aria-label="Remove step" style={{ minWidth: 32, minHeight: 36, color: "#EF4444" }}>✕</button>
              </div>
            ))}
            {r.tasks.length === 0 && (
              <div className="font-body" style={{ fontSize: 10, color: "var(--text-muted)" }}>No steps yet — add the first one below.</div>
            )}
          </div>

          <div className="flex gap-2 mt-2">
            <input
              style={{ ...field, flex: 1 }} className="font-body" placeholder="Add a step…"
              value={draft[r.id] || ""}
              onChange={(e) => setDraft((d) => ({ ...d, [r.id]: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && addTask(r.id)}
            />
            <button onClick={() => addTask(r.id)} className="font-display rounded" style={{ fontSize: 10, padding: "10px 14px", minHeight: 44, color: "var(--sky)", border: "1px solid var(--sky-dim, #1D6FA4)" }}>+ STEP</button>
            <button onClick={() => removeRoutine(r.id)} className="font-display rounded" style={{ fontSize: 10, padding: "10px 12px", minHeight: 44, color: "#EF4444", border: "1px solid #EF4444" }}>DELETE</button>
          </div>
        </SectionCard>
      ))}

      <div className="font-mono" style={{ fontSize: 8, color: "var(--text-muted)" }}>
        Routines are saved on this device. Steps are supports, never demands — skipping a step is always okay.
      </div>
    </PageShell>
  );
}