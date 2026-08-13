import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import EarthScene from "./EarthScene";
import { GOLD } from "@/data/campaignTeam";

const RED = "#FF3B30";

const COPY = {
  dark: {
    tag: "DARK TIMELINE — 2050",
    line: "The grid tightens. Chronic disease compounds. Life expectancy falls to 52 years.",
    sub: "This is the future nobody chose — it simply arrives if nothing changes.",
    stat: ["52 yrs", "1 in 22", "$8T"],
    label: ["Projected lifespan", "Children with ASD", "Protected pharma revenue"],
    color: RED,
  },
  light: {
    tag: "LIGHT TIMELINE — 2050",
    line: "The field is restored. Cellular repair becomes accessible. Children are given their futures back.",
    sub: "This future doesn't arrive on its own. It gets built — or it doesn't.",
    stat: ["120 yrs", "Reversible", "$0"],
    label: ["Restored lifespan", "Neurological outcomes", "Cost of suppression"],
    color: GOLD,
  },
};

export default function CampaignEarth() {
  const [light, setLight] = useState(false);
  const mode = light ? COPY.light : COPY.dark;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="bs-card overflow-hidden relative"
      style={{
        background: "#02060B",
        border: `1px solid ${light ? GOLD : "rgba(255,59,48,0.4)"}`,
        boxShadow: light ? `0 0 60px ${GOLD}22` : "0 0 60px rgba(255,59,48,0.12)",
        transition: "border-color 1200ms ease, box-shadow 1200ms ease",
      }}
    >
      <div className="relative" style={{ height: isMobile ? 360 : 500 }}>
        <EarthScene target={light ? 1 : 0} quality={isMobile ? "low" : "high"} />

        {/* flip flash */}
        <AnimatePresence>
          <motion.div
            key={light ? "l" : "d"}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{ background: `radial-gradient(circle at 50% 45%, ${mode.color}55 0%, transparent 65%)` }}
          />
        </AnimatePresence>

        <div
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{ height: 170, background: "linear-gradient(to top, #02060B 15%, transparent)" }}
        />
        <div
          className="absolute left-0 right-0 top-0 pointer-events-none"
          style={{ height: 110, background: "linear-gradient(to bottom, #02060Bcc 10%, transparent)" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={mode.tag}
            className="absolute top-3 left-3 right-3 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-display" style={{ fontSize: 10, color: mode.color, letterSpacing: "0.22em", textShadow: `0 0 14px ${mode.color}88` }}>
              ● {mode.tag}
            </div>
            <div className="font-display mt-1.5" style={{ fontSize: isMobile ? 15 : 20, color: "#F2F6FA", lineHeight: 1.4, maxWidth: 560, textShadow: "0 2px 12px #02060B" }}>
              {mode.line}
            </div>
            <div className="font-body mt-1" style={{ fontSize: isMobile ? 10 : 11, color: "var(--text-muted)", maxWidth: 480, textShadow: "0 2px 10px #02060B" }}>
              {mode.sub}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-3 right-3 flex flex-wrap items-end gap-x-5 gap-y-2" style={{ bottom: 14 }}>
          {mode.stat.map((s, i) => (
            <AnimatePresence mode="wait" key={mode.label[i]}>
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                style={{ minWidth: 96 }}
              >
                <div className="font-display" style={{ fontSize: isMobile ? 18 : 24, color: mode.color, textShadow: `0 0 22px ${mode.color}66` }}>{s}</div>
                <div className="font-body" style={{ fontSize: 9, color: "var(--text-muted)" }}>{mode.label[i]}</div>
              </motion.div>
            </AnimatePresence>
          ))}
          <AnimatePresence>
            {light && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="ml-auto pointer-events-auto"
              >
                <Link
                  to="/campaign-dashboard"
                  className="font-display inline-flex items-center rounded"
                  style={{
                    fontSize: 10, letterSpacing: "0.1em", padding: "12px 18px", minHeight: 44,
                    color: "#0B0803", background: GOLD, boxShadow: `0 0 30px ${GOLD}88`,
                  }}
                >
                  ⚡ FUND THE LIGHT TIMELINE →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toggle */}
      <div className="p-3" style={{ borderTop: "1px solid var(--border)", background: "#050A12" }}>
        <div className="font-display text-center mb-2" style={{ fontSize: 10, letterSpacing: "0.2em", color: mode.color, textShadow: `0 0 14px ${mode.color}88` }}>
          ↓ TAP TO SWITCH THE FUTURE ↓
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLight(false)}
            className="font-display flex-1 rounded"
            style={{
              fontSize: 12, padding: "16px 10px", minHeight: 58, letterSpacing: "0.1em",
              color: light ? "#FF8A80" : "#FFF0EF",
              background: light ? "rgba(255,59,48,0.10)" : "rgba(255,59,48,0.30)",
              border: `2px solid ${light ? "rgba(255,59,48,0.55)" : RED}`,
              boxShadow: light ? "none" : `0 0 30px rgba(255,59,48,0.5)`,
              transition: "all 600ms ease",
            }}
          >
            🔴 DARK TIMELINE
          </button>
          <button
            onClick={() => setLight(true)}
            className="font-display flex-1 rounded"
            style={{
              fontSize: 12, padding: "16px 10px", minHeight: 58, letterSpacing: "0.1em",
              color: light ? "#0B0803" : GOLD,
              background: light ? GOLD : `${GOLD}22`,
              border: `2px solid ${light ? GOLD : `${GOLD}99`}`,
              boxShadow: light ? `0 0 34px ${GOLD}99` : `0 0 16px ${GOLD}44`,
              transition: "all 600ms ease",
            }}
          >
            🌟 LIGHT TIMELINE
          </button>
        </div>
        <div className="font-body text-center mt-2" style={{ fontSize: 9.5, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
          Two futures. One planet. The difference between them is funding.
        </div>
      </div>
    </div>
  );
}