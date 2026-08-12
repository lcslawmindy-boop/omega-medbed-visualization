import React from "react";

export default function DetailBlock({ title, children }) {
  return (
    <section className="mb-4">
      <div className="font-display text-sky mb-1.5" style={{ fontSize: 10, letterSpacing: "0.14em" }}>{title}</div>
      {children}
    </section>
  );
}