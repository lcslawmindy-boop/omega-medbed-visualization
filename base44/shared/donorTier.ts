// Donation tier + badge resolution. Shared by backend functions.
export function resolveTier(amount: number): { tier: string; badge: string } {
  if (amount >= 10000) return { tier: "CIVILIZATION ARCHITECT", badge: "◈" };
  if (amount >= 2500) return { tier: "PIONEER", badge: "★" };
  if (amount >= 500) return { tier: "HEALER", badge: "✦" };
  if (amount >= 100) return { tier: "BUILDER", badge: "▲" };
  if (amount >= 25) return { tier: "BEACON", badge: "◆" };
  return { tier: "SEEDLING", badge: "•" };
}