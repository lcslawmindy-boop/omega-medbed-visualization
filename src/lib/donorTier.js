// Tier + badge display for donors (mirrors base44/shared/donorTier.ts).
export const TIER_COLORS = {
  "CIVILIZATION ARCHITECT": "var(--gold)",
  PIONEER: "var(--gold)",
  HEALER: "var(--violet)",
  BUILDER: "var(--teal)",
  BEACON: "var(--sky)",
  SEEDLING: "var(--text-muted)",
};

export function tierColor(tier) {
  return TIER_COLORS[tier] || "var(--text-muted)";
}