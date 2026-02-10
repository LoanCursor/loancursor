import type { Scenario } from "./scenarioTypes";
import type { LenderRule } from "./lenders";
import { maxEligibleLtvForScenario, minDscrForScenario } from "./lenders";

export type PricingBreakdownRow = {
  label: string;
  rateDelta: number;
  pointsDelta: number;
  note?: string;
};

export type PricingResult = {
  lenderId: string;
  lenderName: string;

  eligible: boolean;

  // Base + adjustments (only meaningful when eligible)
  baseRate: number;
  basePoints: number;
  rate: number;
  points: number;

  breakdown: PricingBreakdownRow[];

  // Notes always available; for ineligible results these are disqualifiers.
  notes: string[];
};

function matchLtvAdj(rule: LenderRule, ltv: number) {
  const row =
    rule.adjustments.ltv.find((r) => ltv <= r.max) ??
    rule.adjustments.ltv[rule.adjustments.ltv.length - 1];
  return row;
}

function matchFicoAdj(rule: LenderRule, fico: number) {
  const rows = [...rule.adjustments.fico].sort((a, b) => b.min - a.min);
  const row = rows.find((r) => fico >= r.min) ?? rows[rows.length - 1];
  return row;
}

function matchDscrAdj(rule: LenderRule, dscr: number) {
  const rows = (rule.adjustments.dscr ?? []).slice().sort((a, b) => b.min - a.min);
  const row = rows.find((r) => dscr >= r.min);
  return row ?? null;
}

function matchStateAdj(rule: LenderRule, state: string) {
  const rows = rule.adjustments.state ?? [];
  return rows.find((r) => r.states.includes(state.toUpperCase())) ?? null;
}

function matchPppAdj(rule: LenderRule, term: number) {
  const rows = rule.adjustments.ppp ?? [];
  return rows.find((r) => r.term === term) ?? null;
}

export function evaluateScenario(s: Scenario, lenderRules: LenderRule[]): PricingResult[] {
  const state = (s.state || "").toUpperCase();

  const results: PricingResult[] = lenderRules.map((l) => {
    const notes: string[] = [];
    let eligible = true;

    // --- Eligibility checks (deterministic) ---
    if (!l.loanTypes.includes(s.loanType)) {
      eligible = false;
      notes.push("Loan type not offered");
    }

    if (eligible && !l.purposes.includes(s.purpose)) {
      eligible = false;
      notes.push("Purpose not offered");
    }

    if (eligible && s.fico < l.minFico) {
      eligible = false;
      notes.push(`FICO < ${l.minFico}`);
    }

    if (eligible && l.allowedPropertyTypes?.length && !l.allowedPropertyTypes.includes(s.propertyType)) {
      eligible = false;
      notes.push("Property type not allowed");
    }

    // max LTV (with overlays)
    const { maxLtv, notes: maxLtvNotes } = maxEligibleLtvForScenario(l, s);
    if (eligible) notes.push(...maxLtvNotes);
    if (eligible && s.ltv > maxLtv) {
      eligible = false;
      notes.push(`LTV > ${maxLtv}`);
    }

    if (eligible && l.excludedStates?.includes(state)) {
      eligible = false;
      notes.push(`State excluded (${state})`);
    }

    if (eligible && l.disallowInterestOnly && s.interestOnly) {
      eligible = false;
      notes.push("Interest-only not allowed");
    }

    // DSCR
    if (eligible && s.loanType === "DSCR") {
      const { minDscr, notes: dscrNotes } = minDscrForScenario(l, s);
      notes.push(...dscrNotes);
      if (s.dscr < minDscr) {
        eligible = false;
        notes.push(`DSCR ${s.dscr.toFixed(2)} < ${minDscr.toFixed(2)}`);
      }
    }

    // Ineligible: return with only notes
    if (!eligible) {
      return {
        lenderId: l.id,
        lenderName: l.name,
        eligible: false,
        baseRate: l.baseRate,
        basePoints: l.basePoints,
        rate: l.baseRate,
        points: l.basePoints,
        breakdown: [],
        notes,
      };
    }

    // --- Pricing (base + simple adjustments) ---
    const breakdown: PricingBreakdownRow[] = [];
    let rate = l.baseRate;
    let points = l.basePoints;

    const addRow = (label: string, rateDelta: number, pointsDelta: number, note?: string) => {
      if (rateDelta === 0 && pointsDelta === 0 && !note) return;
      breakdown.push({ label, rateDelta, pointsDelta, note });
      rate += rateDelta;
      points += pointsDelta;
    };

    // LTV band
    const ltvAdj = matchLtvAdj(l, s.ltv);
    addRow("LTV band", ltvAdj.rateAdd, ltvAdj.pointsAdd, ltvAdj.note);

    // FICO tier
    const ficoAdj = matchFicoAdj(l, s.fico);
    addRow("FICO tier", ficoAdj.rateAdd, ficoAdj.pointsAdd, ficoAdj.note);

    // DSCR tier (if provided)
    if (s.loanType === "DSCR") {
      const dscrAdj = matchDscrAdj(l, s.dscr);
      if (dscrAdj) addRow("DSCR tier", dscrAdj.rateAdd, dscrAdj.pointsAdd, dscrAdj.note);
    }

    // State add (optional)
    const stateAdj = matchStateAdj(l, state);
    if (stateAdj) addRow("State", stateAdj.rateAdd, stateAdj.pointsAdd, stateAdj.note);

    // IO add (optional)
    const ioRows = l.adjustments.io ?? [];
    const ioAdj = ioRows.find((r) => r.when === (s.interestOnly ? "Yes" : "No")) ?? null;
    if (ioAdj) addRow("Interest-only", ioAdj.rateAdd, ioAdj.pointsAdd, ioAdj.note);

    // PPP add (optional; only apply when PPP is not None)
    if (s.prepayType !== "None") {
      const pppAdj = matchPppAdj(l, s.prepayTerm);
      if (pppAdj) addRow("PPP term", pppAdj.rateAdd, pppAdj.pointsAdd, pppAdj.note);
    }

    // Round for presentation
    rate = Math.round(rate * 1000) / 1000;
    points = Math.round(points * 1000) / 1000;

    // Notes: keep eligibility notes + pricing context
    const pricingNotes: string[] = [];
    if (s.prepayType === "None") pricingNotes.push("No PPP selected");
    else pricingNotes.push(`${s.prepayType} PPP, ${s.prepayTerm}yr`);

    return {
      lenderId: l.id,
      lenderName: l.name,
      eligible: true,
      baseRate: l.baseRate,
      basePoints: l.basePoints,
      rate,
      points,
      breakdown,
      notes: [...notes, ...pricingNotes],
    };
  });

  // Eligible first, then best rate, then points
  const eligible = results.filter((r) => r.eligible).sort((a, b) => a.rate - b.rate || a.points - b.points);
  const ineligible = results.filter((r) => !r.eligible).sort((a, b) => a.lenderName.localeCompare(b.lenderName));
  return [...eligible, ...ineligible];
}
