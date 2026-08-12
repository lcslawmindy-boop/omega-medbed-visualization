import React, { useState } from "react";
import { ROUTINE } from "@/data/kidsos";
import { logEvent } from "@/lib/kidsLog";
import HoldButton from "./HoldButton";

export default function RoutineCard({ holdMs, onStars }) {
  const [done, setDone] = useState({});
  const total = ROUTINE.tasks.length;
  const count = Object.keys(done).length;

  const complete = (task, index, status) => {
    if (done[task.id]) return;
    setDone((d) => ({ ...d, [task.id]: status }));
    if (status === "complete") onStars(1);
    logEvent({
      type: "routine_event",
      routine_id: ROUTINE.id,
      task_id: task.id,
      step_number: index + 1,
      step_total: total,
      status,
      assistance_level: status === "helped" ? "verbal" : "independent",
      stars_earned: status === "complete" ? 1 : 0,
    });
  };

  return (
    <section className="kids-card p-4">
      <div className="flex items-baseline gap-2">
        <h2 className="k-t-lg font-bold flex-1">{ROUTINE.title}</h2>
        <span className="k-t-sm" style={{ color: "var(--k-muted)" }}>{count} of {total}</span>
      </div>
      <div className="mt-3 grid gap-3 kids-gap" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
        {ROUTINE.tasks.map((t, i) => {
          const status = done[t.id];
          return (
            <div key={t.id} className="kids-card p-3 flex flex-col items-center text-center" style={{ opacity: status ? 0.75 : 1 }}>
              <span className="k-emoji" aria-hidden="true">{t.icon}</span>
              <span className="k-t-md font-bold mt-1">{t.label}</span>
              {status ? (
                <span className="k-t-sm mt-2" style={{ color: "var(--k-teal)" }}>
                  {status === "complete" ? "Nice work! ⭐" : "That's okay 💙"}
                </span>
              ) : (
                <div className="flex gap-2 mt-2 w-full">
                  <HoldButton
                    holdMs={holdMs}
                    onActivate={() => complete(t, i, "complete")}
                    className="kids-solid flex-1 k-t-sm font-bold"
                    style={{ background: "var(--k-sky)", color: "#04121F", minHeight: 48 }}
                  >
                    Done
                  </HoldButton>
                  <HoldButton
                    holdMs={holdMs}
                    onActivate={() => complete(t, i, "helped")}
                    className="flex-1 k-t-sm"
                    style={{ border: "1px solid var(--k-border)", color: "var(--k-ink)", minHeight: 48 }}
                  >
                    Helped
                  </HoldButton>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}