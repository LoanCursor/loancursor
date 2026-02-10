import type { LoanType, Purpose, PropertyType, Scenario } from "./scenarioTypes";

export type LenderRule = {
  id: string;
  name: string;
  tagline: string;

  /** Which loan types this lender supports (e.g. DSCR) */
  loanTypes: LoanType[];

  /** Which purposes this lender supports (Purchase / Refi / CashOutRefi) */
  purposes: Purpose[];

  // --- Hard constraints (baseline / generic) ---
  minFico: number;

  /** Default max LTV if a more specific rule isn't provided */
  maxLtv: number;

  /** Optional: max LTV by purpose */
  maxLtvByPurpose?: Partial<Record<Purpose, number>>;

  /** Optional: cash-out max LTV tiers by FICO (evaluated highest minFico first) */
  cashOutMaxLtvByFico?: { minFico: number; maxLtv: number; note?: string }[];

  excludedStates?: string[];

  allowedPropertyTypes?: PropertyType[];
  disallowInterestOnly?: boolean;

  /** Condo overlay (only used when propertyType === Condo) */
  condoNonWarrantableMaxLtv?: number;

  /** V1.5 market overlay */
  decliningMarketLtvHit?: number; // subtract from max eligible LTV if scenario.decliningMarket === true

  // --- DSCR constraints ---
  /** Baseline DSCR minimum (if no tiers apply) */
  minDscr?: number;

  /** Optional: DSCR tiers by LTV (useful for "Expanded" style programs) */
  dscrTiers?: { maxLtv: number; minDscr: number; note?: string }[];

  /** Optional: STR overlay */
  strMinDscr?: number;

  // --- Base pricing (simple, realistic placeholders for V1.5) ---
  baseRate: number;   // percent, e.g. 7.875
  basePoints: number; // points, e.g. 1.25

  // --- Pricing adjustments (rateAdd in percent; pointsAdd in points) ---
  adjustments: {
    ltv: { max: number; rateAdd: number; pointsAdd: number; note?: string }[];
    fico: { min: number; rateAdd: number; pointsAdd: number; note?: string }[];
    dscr?: { min: number; rateAdd: number; pointsAdd: number; note?: string }[];
    state?: { states: string[]; rateAdd: number; pointsAdd: number; note?: string }[];
    io?: { when: "Yes" | "No"; rateAdd: number; pointsAdd: number; note?: string }[];
    ppp?: { term: number; rateAdd: number; pointsAdd: number; note?: string }[];
  };

  strengths: string[];
  avoidWhen: string[];
};

/**
 * Built-in reference lenders for V1.5.
 *
 * IMPORTANT:
 * - These are NOT "live pricing". They are reference configurations to validate the engine.
 * - Next step (forward vision): move these configs into Supabase and version them by effective date.
 */
export const lenders: LenderRule[] = [
  {
    id: "bpl_standard",
    name: "BPL – Standard",
    tagline: "Conservative DSCR lane with simple overlays.",
    loanTypes: ["DSCR"],
    purposes: ["Purchase", "Refi", "CashOutRefi"],

    minFico: 680,

    // Default caps
    maxLtv: 80,
    maxLtvByPurpose: {
      Purchase: 80,
      Refi: 80,
      CashOutRefi: 75,
    },
    // Cash-out tiers by FICO (mirrors common sheet behavior)
    cashOutMaxLtvByFico: [
      { minFico: 700, maxLtv: 75, note: "Cash-out tier (700+)" },
      { minFico: 680, maxLtv: 70, note: "Cash-out tier (<700)" },
    ],

    excludedStates: [],
    allowedPropertyTypes: ["SFR", "Condo", "2-4Unit"],
    disallowInterestOnly: false,

    condoNonWarrantableMaxLtv: 70, // Standard is typically tighter on condos (placeholder)
    decliningMarketLtvHit: 5,

    // DSCR requirement: based on FICO (simplified from sheet language)
    minDscr: 1.2, // for <720
    // We'll enforce 1.0 for 720+ inside the engine notes/logic.

    baseRate: 8.250,
    basePoints: 1.25,

    adjustments: {
      ltv: [
        { max: 65, rateAdd: -0.125, pointsAdd: -0.25, note: "Low LTV credit" },
        { max: 70, rateAdd: 0.0, pointsAdd: 0.0 },
        { max: 75, rateAdd: 0.125, pointsAdd: 0.25 },
        { max: 80, rateAdd: 0.250, pointsAdd: 0.50, note: "High LTV add" },
      ],
      fico: [
        { min: 760, rateAdd: -0.125, pointsAdd: -0.25 },
        { min: 720, rateAdd: 0.0, pointsAdd: 0.0 },
        { min: 700, rateAdd: 0.125, pointsAdd: 0.25 },
        { min: 680, rateAdd: 0.250, pointsAdd: 0.50 },
      ],
      dscr: [
        { min: 1.35, rateAdd: -0.100, pointsAdd: -0.10 },
        { min: 1.20, rateAdd: 0.0, pointsAdd: 0.0 },
        { min: 1.00, rateAdd: 0.100, pointsAdd: 0.10 },
      ],
      state: [],
      io: [
        { when: "Yes", rateAdd: 0.125, pointsAdd: 0.25, note: "Interest-only add" },
        { when: "No", rateAdd: 0.0, pointsAdd: 0.0 },
      ],
      // PPP: base assumes 5-year; 3-year adds rate (from sheet language). Keep others neutral for now.
      ppp: [
        { term: 5, rateAdd: 0.0, pointsAdd: 0.0, note: "Base assumes 5-yr PPP" },
        { term: 3, rateAdd: 0.375, pointsAdd: 0.0, note: "3-yr PPP add" },
      ],
    },

    strengths: ["Straightforward DSCR lane", "Predictable overlays", "Good for clean deals"],
    avoidWhen: ["Borderline DSCR with high LTV", "Tight condos / special property types"],
  },

  {
    id: "bpl_expanded",
    name: "BPL – Expanded",
    tagline: "More flexible DSCR with tiered DSCR and overlays.",
    loanTypes: ["DSCR"],
    purposes: ["Purchase", "Refi", "CashOutRefi"],

    minFico: 660,

    maxLtv: 80,
    maxLtvByPurpose: {
      Purchase: 80,
      Refi: 80,
      CashOutRefi: 75,
    },

    excludedStates: ["ND", "NV", "SD"],
    allowedPropertyTypes: ["SFR", "Condo", "2-4Unit"],
    disallowInterestOnly: false,

    condoNonWarrantableMaxLtv: 65,
    decliningMarketLtvHit: 5,

    // DSCR tiers by LTV (Expanded-style behavior)
    dscrTiers: [
      { maxLtv: 65, minDscr: 0.75, note: "≤65 LTV DSCR tier" },
      { maxLtv: 80, minDscr: 1.0, note: "65.01–80 LTV DSCR tier" },
    ],
    strMinDscr: 1.15,

    baseRate: 7.875,
    basePoints: 1.75,

    adjustments: {
      ltv: [
        { max: 65, rateAdd: -0.125, pointsAdd: -0.25, note: "Low LTV credit" },
        { max: 70, rateAdd: 0.0, pointsAdd: 0.0 },
        { max: 75, rateAdd: 0.125, pointsAdd: 0.25 },
        { max: 80, rateAdd: 0.250, pointsAdd: 0.50, note: "High LTV add" },
      ],
      fico: [
        { min: 760, rateAdd: -0.125, pointsAdd: -0.25 },
        { min: 720, rateAdd: 0.0, pointsAdd: 0.0 },
        { min: 700, rateAdd: 0.125, pointsAdd: 0.25 },
        { min: 660, rateAdd: 0.250, pointsAdd: 0.50 },
      ],
      dscr: [
        { min: 1.35, rateAdd: -0.100, pointsAdd: -0.10 },
        { min: 1.15, rateAdd: 0.0, pointsAdd: 0.0 },
        { min: 1.00, rateAdd: 0.100, pointsAdd: 0.10 },
        { min: 0.75, rateAdd: 0.200, pointsAdd: 0.20, note: "Low DSCR add" },
      ],
      state: [
        { states: ["NY", "NJ"], rateAdd: 0.05, pointsAdd: 0.05, note: "State add (example)" },
      ],
      io: [
        { when: "Yes", rateAdd: 0.125, pointsAdd: 0.25, note: "Interest-only add" },
        { when: "No", rateAdd: 0.0, pointsAdd: 0.0 },
      ],
      ppp: [
        { term: 5, rateAdd: 0.0, pointsAdd: 0.0, note: "Base assumes 5-yr PPP" },
        { term: 3, rateAdd: 0.250, pointsAdd: 0.0, note: "3-yr PPP add" },
        { term: 2, rateAdd: 0.375, pointsAdd: 0.0, note: "2-yr PPP add" },
        { term: 1, rateAdd: 0.500, pointsAdd: 0.0, note: "1-yr PPP add" },
      ],
    },

    strengths: ["Tiered DSCR options", "STR capable (with higher DSCR)", "More flexible overlays"],
    avoidWhen: ["Excluded states (ND/NV/SD)", "Non-warrantable condos over 65 LTV"],
  },
];

/** Helper used in the engine: compute max eligible LTV for a lender given a scenario. */
export function maxEligibleLtvForScenario(l: LenderRule, s: Scenario): { maxLtv: number; notes: string[] } {
  const notes: string[] = [];

  let maxLtv = l.maxLtvByPurpose?.[s.purpose] ?? l.maxLtv;

  // Cash-out tiers by FICO (if provided)
  if (s.purpose === "CashOutRefi" && l.cashOutMaxLtvByFico?.length) {
    const rows = [...l.cashOutMaxLtvByFico].sort((a, b) => b.minFico - a.minFico);
    const row = rows.find((r) => s.fico >= r.minFico) ?? rows[rows.length - 1];
    maxLtv = Math.min(maxLtv, row.maxLtv);
    if (row.note) notes.push(row.note);
  }

  // Condo overlay: non-warrantable cap
  if (s.propertyType === "Condo" && !s.condoWarrantable && typeof l.condoNonWarrantableMaxLtv === "number") {
    maxLtv = Math.min(maxLtv, l.condoNonWarrantableMaxLtv);
    notes.push(`Non-warrantable condo max LTV ${l.condoNonWarrantableMaxLtv}%`);
  }

  // Declining market overlay: reduce LTV cap
  if (s.decliningMarket && typeof l.decliningMarketLtvHit === "number" && l.decliningMarketLtvHit > 0) {
    maxLtv = Math.max(0, maxLtv - l.decliningMarketLtvHit);
    notes.push(`Declining market: −${l.decliningMarketLtvHit}% max LTV`);
  }

  return { maxLtv, notes };
}

/** Helper used in the engine: compute DSCR minimum for a lender given a scenario. */
export function minDscrForScenario(l: LenderRule, s: Scenario): { minDscr: number; notes: string[] } {
  const notes: string[] = [];

  // STR overlay
  if (s.isSTR && typeof l.strMinDscr === "number") {
    notes.push(`STR min DSCR ${l.strMinDscr}`);
    return { minDscr: l.strMinDscr, notes };
  }

  // Tiered DSCR by LTV
  if (l.dscrTiers?.length) {
    const row =
      l.dscrTiers.find((t) => s.ltv <= t.maxLtv) ??
      l.dscrTiers[l.dscrTiers.length - 1];

    if (row.note) notes.push(row.note);
    return { minDscr: row.minDscr, notes };
  }

  // BPL Standard special: 720+ lowers DSCR requirement (captured here without custom functions)
  if (l.id === "bpl_standard") {
    if (s.fico >= 720) return { minDscr: 1.0, notes: ["FICO 720+ DSCR tier"] };
    return { minDscr: 1.2, notes: ["FICO <720 DSCR tier"] };
  }

  return { minDscr: l.minDscr ?? 0, notes };
}
