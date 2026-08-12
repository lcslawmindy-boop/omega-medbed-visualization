// Shared watt allocations for the Omega MedBed (totaling ~3.5 kW max).
// Consumed by the spec-panel PowerAllocation view and the Protocol Builder.
export const POWER_WATTS = {
  PBM: 800, FIT: 600, HIT: 400, PEMF: 300, VAT: 250,
  SFT: 200, RIF: 200, NIA: 150, PRI: 150, EEG: 100,
  BIO: 100, MCT: 80, CHM: 70, GSC: 50, VOR: 50,
  NAD: 30, OZO: 20, ORG: 0,
};

export const MAX_WATTS = 3500;