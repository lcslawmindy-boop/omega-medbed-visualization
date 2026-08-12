import React, { useRef } from "react";

/** Button that requires the configured touch-hold time before it activates. */
export default function HoldButton({ holdMs = 100, onActivate, className = "", style, children, ...rest }) {
  const timer = useRef(null);
  const start = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(onActivate, holdMs);
  };
  const cancel = () => clearTimeout(timer.current);
  return (
    <button
      type="button"
      className={`kids-tap ${className}`}
      style={style}
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); } }}
      {...rest}
    >
      {children}
    </button>
  );
}