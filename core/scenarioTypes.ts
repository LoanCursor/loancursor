export type LoanType = "DSCR" | "BankStatement" | "NonQM";
export type Purpose = "Purchase" | "Refi" | "CashOutRefi";
export type PropertyType = "SFR" | "Condo" | "2-4Unit";
export type UnitCount = 2 | 3 | 4;
export type PrepayType = "None" | "Stepdown" | "Fixed";
export type EntityType = "Individual" | "Entity";
export type Occupancy = "Primary" | "SecondHome" | "Investment";
export type LienPosition = "First" | "Second";


export type Scenario = {
  loanType: LoanType;
  purpose: Purpose;

  propertyValue: number;
  loanAmount: number;
  ltv: number; // 0–100
  fico: number;

  rentMonthly: number;
  propertyTaxAnnual: number;
  hoaMonthly: number;

  qualifyingRate: number; // percent, e.g. 8.25
  dscr: number;           // computed/read-only

  /** Estimated reserves in months (optional, used by some lenders) */
  reservesMonths?: number;

  state: string;          // 2-letter
  propertyType: PropertyType;
  occupancy: Occupancy;
  lienPosition: LienPosition;

  /** Only used when propertyType === '2-4Unit' */
  unitCount?: UnitCount;

  // V1.5 toggles
  condoWarrantable: boolean; // only relevant when propertyType === 'Condo'
  isSTR: boolean; // short-term rental
  decliningMarket: boolean;

  interestOnly: boolean;

  /** If interestOnly is true, common IO structures (years) */
  ioYears?: 5 | 7 | 10;

  amortizationYears: number; // ✅ add this (e.g. 30)

  prepayType: PrepayType;
  prepayTerm: number; // 1–7

  entity: EntityType;

  /** Lender inclusion for this scenario */
  useAllLenders: boolean;
  selectedLenderIds: string[];
};