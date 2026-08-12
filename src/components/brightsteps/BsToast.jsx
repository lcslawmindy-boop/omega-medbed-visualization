import React, { useEffect } from "react";

export default function BsToast({ message, actionLabel, onAction, onDismiss }) {
  useEffect(() => {
    const id = setTimeout(onDismiss, 5000);
    return () => clearTimeout(id);
  }, [message, onDismiss]);

  return (
    <div
      className="fixed left-1/2 z-[250] flex items-center gap-3 px-4 py-2.5 rounded-lg fade-in"
      style={{
        top: "calc(72px + env(safe-area-inset-top))",
        transform: "translateX(-50%)",
        maxWidth: "92vw",
        background: "var(--bg-elevated)",
        border: "1px solid var(--amber)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
      }}
      role="status"
    >
      <span className="font-body" style={{ fontSize: 11, color: "var(--amber)", lineHeight: 1.5 }}>{message}</span>
      {actionLabel && (
        <button onClick={onAction} className="font-display flex-none text-sky" style={{ fontSize: 10, letterSpacing: "0.06em", minHeight: 32 }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}