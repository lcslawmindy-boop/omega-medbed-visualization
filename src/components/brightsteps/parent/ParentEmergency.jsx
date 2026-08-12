import React from "react";

export default function ParentEmergency() {
  return (
    <div className="rounded-xl p-3" style={{ border: "1px solid var(--red-alert)", background: "rgba(248,113,113,0.1)" }}>
      <div className="font-display mb-1" style={{ fontSize: 10, color: "var(--red-alert)", letterSpacing: "0.1em" }}>
        🛑 EMERGENCY STOP
      </div>
      <p className="font-kid m-0" style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.6 }}>
        A large red button sits inside <em>and</em> outside the pod. Pressing either one stops <strong>all</strong> systems within 100 milliseconds. You can also stop the session remotely at any moment from the companion app.
      </p>
    </div>
  );
}