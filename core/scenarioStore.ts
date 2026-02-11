import type { Scenario } from "./scenarioTypes";

const KEY = "loancursor_last_scenario";

export function defaultScenario(): Scenario {
  return {
    loanType: "DSCR",
    purpose: "Purchase",
    propertyValue: 600000,
    loanAmount: 450000,
    ltv: 75,
    fico: 720,

    rentMonthly: 4500,
    propertyTaxAnnual: 7200,
    hoiAnnual: 0,
    hoaMonthly: 0,

    qualifyingRate: 8.25,
    dscr: 0,

    state: "FL",
    propertyType: "SFR",
    occupancy: "Investment",
    lienPosition: "First",
    reservesMonths: 6,
    unitCount: 2,

    condoWarrantable: true,
    isSTR: false,
    decliningMarket: false,

    interestOnly: false,
    ioYears: 10,

    amortizationYears: 30, // ✅ THIS was missing

    prepayType: "None",
    prepayTerm: 5,

    entity: "Entity",

    useAllLenders: true,
    selectedLenderIds: [],
  };
}

export function validateScenario(
  s: Scenario
): { ok: true } | { ok: false; error: string } {
  // --- State ---
  if (!s.state || s.state.trim().length !== 2) {
    return { ok: false, error: "State must be a 2-letter code (e.g. FL)." };
  }

  // --- Property & Loan ---
  if (!s.occupancy) {
    return { ok: false, error: "Select an occupancy type." };
  }
  if (!s.lienPosition) {
    return { ok: false, error: "Select a lien position." };
  }

  if (s.propertyType === "2-4Unit") {
    const u = Number(s.unitCount);
    if (![2, 3, 4].includes(u)) {
      return { ok: false, error: "For 2–4 Unit properties, select the number of units (2, 3, or 4)." };
    }
  }

  if (!Number.isFinite(s.propertyValue) || s.propertyValue <= 0) {
    return { ok: false, error: "Property value must be greater than 0." };
  }

  if (!Number.isFinite(s.loanAmount) || s.loanAmount <= 0) {
    return { ok: false, error: "Loan amount must be greater than 0." };
  }

  if (s.loanAmount > s.propertyValue) {
    return { ok: false, error: "Loan amount cannot exceed property value." };
  }

  if (!Number.isFinite(s.ltv) || s.ltv <= 0 || s.ltv > 100) {
    return { ok: false, error: "LTV must be between 1 and 100." };
  }

  // --- Credit ---
  if (!Number.isFinite(s.fico) || s.fico < 300 || s.fico > 850) {
    return { ok: false, error: "Credit score must be between 300 and 850." };
  }

  // --- Income / DSCR inputs ---
  if (!Number.isFinite(s.rentMonthly) || s.rentMonthly <= 0) {
    return { ok: false, error: "Monthly rent must be greater than 0." };
  }

  if (!Number.isFinite(s.propertyTaxAnnual) || s.propertyTaxAnnual < 0) {
    return { ok: false, error: "Annual property tax must be 0 or greater." };
  }

  if (!Number.isFinite(s.hoaMonthly) || s.hoaMonthly < 0) {
    return { ok: false, error: "Monthly HOA must be 0 or greater." };
  }

  // --- Reserves (optional) ---
  if (s.reservesMonths != null) {
    const rm = Number(s.reservesMonths);
    if (!Number.isFinite(rm) || rm < 0 || rm > 36) {
      return { ok: false, error: "Reserves months must be between 0 and 36." };
    }
  }

  // --- Qualifying rate (for DSCR calc) ---
  if (!Number.isFinite(s.qualifyingRate) || s.qualifyingRate <= 0 || s.qualifyingRate > 20) {
    return { ok: false, error: "Qualifying rate must be a valid percentage." };
  }

  // --- DSCR (computed, but still sanity-checked) ---
  if (!Number.isFinite(s.dscr) || s.dscr <= 0) {
    return { ok: false, error: "DSCR could not be calculated. Check rent, expenses, and loan terms." };
  }

  
// --- Interest-only structure ---
if (s.interestOnly) {
  const io = Number(s.ioYears);
  if (![5, 7, 10].includes(io)) {
    return { ok: false, error: "Select an Interest-Only structure (5, 7, or 10 years IO)." };
  }
}

// --- PPP logic sanity ---
  if (s.prepayType !== "None") {
    if (!Number.isFinite(s.prepayTerm) || s.prepayTerm < 1 || s.prepayTerm > 7) {
      return { ok: false, error: "Prepayment penalty term must be between 1 and 7 years." };
    }
  } 

  return { ok: true };
}

export function saveScenario(s: Scenario) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

export function getScenario(): Scenario {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultScenario();
    const parsed = JSON.parse(raw) as Partial<Scenario>;
    return { ...defaultScenario(), ...parsed };
  } catch {
    return defaultScenario();
  }
}
