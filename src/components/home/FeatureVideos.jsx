import React from "react";

const VIDEOS = [
  {
    tag: "01A — CAMPAIGN FILM",
    title: "BrightSteps — Funding Campaign Film",
    body: "The BrightSteps ASD therapy pod campaign film prepared for Kickstarter, GoFundMe and SBIR grant submission.",
    src: "https://media.base44.com/videos/public/6a7c053f6098c206f62a3535/466da6be0_BrightStepsKickStarterGoFundMeSBIRGrantfundingvideo3.MOV",
    color: "var(--sky)",
  },
  {
    tag: "01B — IP PORTFOLIO FILM",
    title: "Aethon Apex — IP Portfolio Film",
    body: "The Aethon Apex IP ecosystem: scalar healing devices, therapy pods and the light-timeline technology portfolio.",
    src: "https://media.base44.com/videos/public/6a7c053f6098c206f62a3535/7c1f67556_aethonapexipvideo.MOV",
    color: "var(--gold)",
  },
];

export default function FeatureVideos() {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {VIDEOS.map((v) => (
        <div key={v.src} className="bs-card overflow-hidden" style={{ background: "var(--bg-card)", borderLeft: `3px solid ${v.color}` }}>
          <video
            src={v.src}
            controls
            playsInline
            preload="metadata"
            className="w-full block"
            style={{ background: "#02060B", aspectRatio: "16 / 9", objectFit: "cover" }}
          />
          <div className="p-3">
            <div className="font-display" style={{ fontSize: 9.5, color: v.color, letterSpacing: "0.16em" }}>{v.tag}</div>
            <div className="font-display mt-1" style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.35 }}>{v.title}</div>
            <p className="font-body" style={{ fontSize: 10.5, color: "var(--text-muted)", lineHeight: 1.65, margin: "6px 0 0" }}>{v.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}