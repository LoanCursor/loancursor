"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

import { CurrencyInput } from "@/components/CurrencyInput";
import { PercentInput } from "@/components/PercentInput";
import type { Scenario } from "@/core/scenarioTypes";
import {
  defaultScenario,
  saveScenario,
  validateScenario,
} from "@/core/scenarioStore";
import { evaluateScenario } from "@/core/engine";
import { useLenders } from "@/lib/lendersStore";
import { Home, User, Users, CheckCircle2, XCircle, Sparkles } from "lucide-react";

const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["DC", "District of Columbia"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
] as const;

function Field({
  label,
  action,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {action}
      </div>
      {children}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

// Monthly PI payment
function monthlyPayment({
  principal,
  ratePct,
  termYears,
  interestOnly,
}: {
  principal: number;
  ratePct: number;
  termYears: number;
  interestOnly: boolean;
}) {
  const r = ratePct / 100 / 12;
  if (principal <= 0 || r <= 0) return 0;
  if (interestOnly) return principal * r;

  const n = termYears * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/**
 * Broker-standard DSCR:
 *   DSCR = Rent / PITIA
 *   PITIA = PI + Taxes + HOI + HOA
 */
function calcDSCR({
  rentMonthly,
  taxAnnual,
  hoiAnnual,
  hoaMonthly,
  paymentMonthly,
}: {
  rentMonthly: number;
  taxAnnual: number;
  hoiAnnual: number;
  hoaMonthly: number;
  paymentMonthly: number;
}) {
  const taxesMonthly = (taxAnnual || 0) / 12;
  const hoiMonthly = (hoiAnnual || 0) / 12;
  const pitia =
    (paymentMonthly || 0) +
    taxesMonthly +
    hoiMonthly +
    (hoaMonthly || 0);

  if (pitia <= 0) return 0;
  return (rentMonthly || 0) / pitia;
}

function derivedPPPLabel(type: Scenario["prepayType"], term: number) {
  if (type === "None") return "No prepay";
  if (!Number.isFinite(term) || term < 1) return "";
  if (type === "Stepdown") {
    return Array.from({ length: term }, (_, i) => String(term - i)).join("-");
  }
  // Fixed
  return Array.from({ length: term }, () => String(term)).join("-");
}

const inputBase =
  "h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition " +
  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-600/40 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50";

type EngineRow = ReturnType<typeof evaluateScenario>[number];

export default function PricingPage() {
  const { lenders } = useLenders();

  const [scenario, setScenario] = React.useState<Scenario>(() =>
    defaultScenario()
  );
  const [error, setError] = React.useState<string | null>(null);

  // Results-on-right state
  const [ranOnce, setRanOnce] = React.useState(false);
  const [results, setResults] = React.useState<EngineRow[] | null>(null);
  const resultsTopRef = React.useRef<HTMLDivElement | null>(null);

  const [ficoDraft, setFicoDraft] = React.useState<string>(() =>
    String(defaultScenario().fico)
  );
  React.useEffect(() => {
    setFicoDraft(String(scenario.fico ?? ""));
  }, [scenario.fico]);

  /**
   * Single source of truth update()
   * - Keeps PV/Loan/LTV synced
   * - Recomputes DSCR immediately on ANY change that impacts it
   */
  function update<K extends keyof Scenario>(key: K, value: Scenario[K]) {
    setScenario((s) => {
      const next: Scenario = { ...s, [key]: value } as Scenario;

      // --- Keep LTV, loan amount, and value in sync ---
      if (
        (key === "loanAmount" || key === "propertyValue") &&
        next.propertyValue > 0
      ) {
        next.ltv = clamp(
          (next.loanAmount / next.propertyValue) * 100,
          0.01,
          100
        );
      }

      if (key === "ltv" && next.propertyValue > 0) {
        next.loanAmount = clamp(
          (next.propertyValue * next.ltv) / 100,
          0,
          next.propertyValue
        );
      }

      // If Interest-Only is turned off, clear IO structure.
      if (key === "interestOnly" && !next.interestOnly) {
        next.ioYears = undefined;
      }

      // --- Recompute DSCR immediately ---
      const payment = monthlyPayment({
        principal: next.loanAmount || 0,
        ratePct: next.qualifyingRate || 0,
        termYears: next.amortizationYears || 30,
        interestOnly: !!next.interestOnly,
      });

      next.dscr = calcDSCR({
        rentMonthly: next.rentMonthly || 0,
        taxAnnual: next.propertyTaxAnnual || 0,
        hoiAnnual: (next as any).hoiAnnual || 0,
        hoaMonthly: next.hoaMonthly || 0,
        paymentMonthly: payment,
      });

      return next;
    });
  }

  const selectedSet = React.useMemo(
    () => new Set(scenario.selectedLenderIds),
    [scenario.selectedLenderIds]
  );

  const lenderPreview = React.useMemo(
    () => evaluateScenario(scenario, lenders),
    [scenario, lenders]
  );

  const lenderPreviewMap = React.useMemo(() => {
    const m = new Map<string, { eligible: boolean; notes: string[] }>();
    lenderPreview.forEach((r) =>
      m.set(r.lenderId, { eligible: r.eligible, notes: r.notes })
    );
    return m;
  }, [lenderPreview]);

  const eligibleCount = React.useMemo(
    () => lenderPreview.filter((r) => r.eligible).length,
    [lenderPreview]
  );

  function setUseAllLenders(checked: boolean | "indeterminate") {
    update("useAllLenders", checked === true);
    if (checked !== true && scenario.selectedLenderIds.length === 0) {
      update("selectedLenderIds", lenders.map((l) => l.id) as any);
    }
  }

  function toggleLender(id: string, checked: boolean | "indeterminate") {
    const next = new Set(scenario.selectedLenderIds);
    if (checked) next.add(id);
    else next.delete(id);
    update("selectedLenderIds", Array.from(next) as any);
  }

  // Keep prepay term sane when enabled
  React.useEffect(() => {
    if (scenario.prepayType === "None") return;
    if (
      !Number.isFinite(scenario.prepayTerm) ||
      scenario.prepayTerm < 1 ||
      scenario.prepayTerm > 7
    ) {
      update("prepayTerm", 5 as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.prepayType]);

  // Display helpers (PI + PITIA)
  const payment = React.useMemo(() => {
    return monthlyPayment({
      principal: scenario.loanAmount || 0,
      ratePct: scenario.qualifyingRate || 0,
      termYears: scenario.amortizationYears || 30,
      interestOnly: !!scenario.interestOnly,
    });
  }, [
    scenario.loanAmount,
    scenario.qualifyingRate,
    scenario.amortizationYears,
    scenario.interestOnly,
  ]);

  const taxesMonthly = React.useMemo(
    () => (scenario.propertyTaxAnnual || 0) / 12,
    [scenario.propertyTaxAnnual]
  );
  const hoiMonthly = React.useMemo(
    () => ((scenario as any).hoiAnnual || 0) / 12,
    [(scenario as any).hoiAnnual]
  );
  const pitia = React.useMemo(
    () => payment + taxesMonthly + hoiMonthly + (scenario.hoaMonthly || 0),
    [payment, taxesMonthly, hoiMonthly, scenario.hoaMonthly]
  );

  function scrollToResultsTop() {
    // give React a moment to paint results first
    requestAnimationFrame(() => {
      resultsTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function onRun() {
    const v = validateScenario(scenario);
    if (!v.ok) {
      setError(v.error);
      return;
    }

    setError(null);
    saveScenario(scenario);

    const rows = evaluateScenario(scenario, lenders);

    // If user is in manual selection mode, filter to selected lenders only
    const filtered =
      scenario.useAllLenders
        ? rows
        : rows.filter((r) => selectedSet.has(r.lenderId));

    // Sort: eligible first, then by name (stable)
    const sorted = [...filtered].sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
      const an = lenders.find((x) => x.id === a.lenderId)?.name ?? "";
      const bn = lenders.find((x) => x.id === b.lenderId)?.name ?? "";
      return an.localeCompare(bn);
    });

    setRanOnce(true);
    setResults(sorted);
    scrollToResultsTop();
  }

  const resultsEligible = React.useMemo(
    () => (results ? results.filter((r) => r.eligible).length : 0),
    [results]
  );
  const resultsIneligible = React.useMemo(
    () => (results ? results.filter((r) => !r.eligible).length : 0),
    [results]
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Top header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">LoanCursor</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Pricing
          </h1>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
            Enter a scenario on the left. Run pricing to populate eligibility +
            notes on the right.
          </p>
        </div>

        {/* Top run/reset (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button className="rounded-md" onClick={onRun}>
            Run Pricing
          </Button>
          <Button
            variant="secondary"
            className="rounded-md"
            onClick={() => {
              const s = defaultScenario();
              setScenario(s);
              saveScenario(s);
              setError(null);
              setRanOnce(false);
              setResults(null);
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Split layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* LEFT: Inputs */}
        <Card className="lg:col-span-7 rounded-xl border border-border bg-card p-6">
          <Tabs defaultValue="deal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="deal" className="gap-2">
                <Home className="h-4 w-4" /> Deal
              </TabsTrigger>
              <TabsTrigger value="borrower" className="gap-2">
                <User className="h-4 w-4" /> Borrower
              </TabsTrigger>
              <TabsTrigger value="lenders" className="gap-2">
                <Users className="h-4 w-4" /> Lenders
              </TabsTrigger>
            </TabsList>

            {/* Deal */}
            <TabsContent value="deal">
              <div className="space-y-6">
                <Card className="p-5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Deal basics
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Quick identifiers that commonly drive eligibility and
                      pricing.
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Field label="Loan program">
                      <Select
                        value={scenario.loanType}
                        onValueChange={(v) => update("loanType", v as any)}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="DSCR">DSCR</SelectItem>
                          <SelectItem value="BankStatement">
                            Bank Statement
                          </SelectItem>
                          <SelectItem value="NonQM">Non-QM</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Purpose">
                      <Select
                        value={scenario.purpose}
                        onValueChange={(v) => update("purpose", v as any)}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Purchase">Purchase</SelectItem>
                          <SelectItem value="Refi">Rate/Term Refi</SelectItem>
                          <SelectItem value="CashOutRefi">
                            Cash-Out Refi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="State">
                      <Select
                        value={scenario.state}
                        onValueChange={(v) => update("state", v as any)}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border max-h-[320px]">
                          {US_STATES.map(([abbr, name]) => (
                            <SelectItem key={abbr} value={abbr}>
                              {abbr} — {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Occupancy">
                      <Select
                        value={scenario.occupancy}
                        onValueChange={(v) => update("occupancy", v as any)}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Primary">Primary</SelectItem>
                          <SelectItem value="SecondHome">
                            Second Home
                          </SelectItem>
                          <SelectItem value="Investment">
                            Investment
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Property type">
                      <Select
                        value={scenario.propertyType}
                        onValueChange={(v) => {
                          const pt = v as Scenario["propertyType"];
                          setScenario((s) => ({
                            ...s,
                            propertyType: pt,
                            unitCount:
                              pt === "2-4Unit"
                                ? [2, 3, 4].includes(Number(s.unitCount))
                                  ? s.unitCount
                                  : 2
                                : s.unitCount,
                          }));
                        }}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="SFR">SFR</SelectItem>
                          <SelectItem value="Condo">Condo</SelectItem>
                          <SelectItem value="2-4Unit">2–4 Unit</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    {scenario.propertyType === "2-4Unit" ? (
                      <Field label="Units">
                        <Select
                          value={String(scenario.unitCount || 2)}
                          onValueChange={(v) =>
                            update("unitCount", Number(v) as any)
                          }
                        >
                          <SelectTrigger className={inputBase}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    ) : (
                      <div />
                    )}

                    {scenario.propertyType === "Condo" ? (
                      <Field label="Condo">
                        <Select
                          value={
                            scenario.condoWarrantable
                              ? "Warrantable"
                              : "NonWarrantable"
                          }
                          onValueChange={(v) =>
                            update(
                              "condoWarrantable",
                              (v === "Warrantable") as any
                            )
                          }
                        >
                          <SelectTrigger className={inputBase}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="Warrantable">
                              Warrantable
                            </SelectItem>
                            <SelectItem value="NonWarrantable">
                              Non-warrantable
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    ) : (
                      <div />
                    )}

                    <Field label="Lien position">
                      <Select
                        value={scenario.lienPosition}
                        onValueChange={(v) =>
                          update("lienPosition", v as any)
                        }
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="First">First lien</SelectItem>
                          <SelectItem value="Second">Second lien</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Borrower type">
                      <Select
                        value={scenario.entity}
                        onValueChange={(v) => update("entity", v as any)}
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Individual">
                            Individual
                          </SelectItem>
                          <SelectItem value="Entity">Entity</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </Card>

                <Card className="p-5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Sizing
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Enter the minimum set needed to run pricing/eligibility
                      checks.
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Field label="Property value">
                      <CurrencyInput
                        value={scenario.propertyValue}
                        onChange={(n) =>
                          update("propertyValue", n as any)
                        }
                      />
                    </Field>

                    <Field label="Loan amount">
                      <CurrencyInput
                        value={scenario.loanAmount}
                        onChange={(n) => update("loanAmount", n as any)}
                      />
                    </Field>

                    <Field label="LTV">
                      <PercentInput
                        value={scenario.ltv}
                        onChange={(n) => update("ltv", n as any)}
                        className={inputBase}
                      />
                    </Field>

                    <Field label="FICO">
                      <Input
                        className={inputBase}
                        value={String(scenario.fico)}
                        inputMode="numeric"
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            (e.currentTarget as HTMLInputElement).blur();
                        }}
                        onChange={(e) =>
                          update("fico", Number(e.target.value || 0) as any)
                        }
                        placeholder="720"
                      />
                    </Field>

                    <Field label="Reserves (months)">
                      <Input
                        className={inputBase}
                        value={
                          scenario.reservesMonths == null
                            ? ""
                            : String(scenario.reservesMonths)
                        }
                        inputMode="numeric"
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            (e.currentTarget as HTMLInputElement).blur();
                        }}
                        onChange={(e) => {
                          const raw = e.target.value;
                          update(
                            "reservesMonths",
                            (raw === "" ? undefined : Number(raw)) as any
                          );
                        }}
                        placeholder="Optional (e.g. 6)"
                      />
                    </Field>
                  </div>
                </Card>

                <Card className="p-5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Loan terms
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      These often change pricing on DSCR/Non-QM programs.
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Field label="Amortization (years)">
                      <Select
                        value={String(scenario.amortizationYears)}
                        onValueChange={(v) =>
                          update("amortizationYears", Number(v) as any)
                        }
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    <Field label="Interest-only">
                      <Select
                        value={scenario.interestOnly ? "Yes" : "No"}
                        onValueChange={(v) =>
                          update("interestOnly", (v === "Yes") as any)
                        }
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="mt-1 text-xs text-muted-foreground">
                        If Yes, choose the IO structure below.
                      </div>
                    </Field>

                    {scenario.interestOnly ? (
                      <Field label="IO structure">
                        <Select
                          value={String(scenario.ioYears ?? 10)}
                          onValueChange={(v) =>
                            update("ioYears", Number(v) as any)
                          }
                        >
                          <SelectTrigger className={inputBase}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="5">5/30 IO</SelectItem>
                            <SelectItem value="7">7/30 IO</SelectItem>
                            <SelectItem value="10">10/30 IO</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Common IO periods used by DSCR lenders.
                        </div>
                      </Field>
                    ) : (
                      <div />
                    )}

                    <Field label="Prepay type">
                      <Select
                        value={scenario.prepayType}
                        onValueChange={(v) =>
                          update("prepayType", v as any)
                        }
                      >
                        <SelectTrigger className={inputBase}>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="None">None</SelectItem>
                          <SelectItem value="Stepdown">Stepdown</SelectItem>
                          <SelectItem value="Fixed">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    {scenario.prepayType !== "None" ? (
                      <Field label="Prepay term (years)">
                        <Select
                          value={String(scenario.prepayTerm)}
                          onValueChange={(v) =>
                            update("prepayTerm", Number(v) as any)
                          }
                        >
                          <SelectTrigger className={inputBase}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                              <SelectItem key={n} value={String(n)}>
                                {n}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          Example:{" "}
                          {derivedPPPLabel(
                            scenario.prepayType,
                            scenario.prepayTerm
                          )}
                        </div>
                      </Field>
                    ) : (
                      <div />
                    )}

                    <Field label="Overlays">
                      <div className="space-y-2 rounded-md border border-border bg-background px-3 py-2.5">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={scenario.isSTR}
                            onCheckedChange={(v) =>
                              update("isSTR", !!v as any)
                            }
                          />
                          <span className="text-sm text-foreground">
                            Short-term rental (STR)
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={scenario.decliningMarket}
                            onCheckedChange={(v) =>
                              update("decliningMarket", !!v as any)
                            }
                          />
                          <span className="text-sm text-foreground">
                            Declining market
                          </span>
                        </label>
                      </div>
                    </Field>
                  </div>
                </Card>

                <Card className="p-5">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Income & DSCR
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      DSCR uses PITIA = PI + Taxes + HOI + HOA.
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Field label="Monthly rent">
                      <CurrencyInput
                        value={scenario.rentMonthly}
                        onChange={(n) => update("rentMonthly", n as any)}
                      />
                    </Field>

                    <Field label="Annual property taxes">
                      <CurrencyInput
                        value={scenario.propertyTaxAnnual}
                        onChange={(n) =>
                          update("propertyTaxAnnual", n as any)
                        }
                      />
                    </Field>

                    <Field label="Annual HOI (homeowners insurance)">
                      <CurrencyInput
                        value={(scenario as any).hoiAnnual || 0}
                        onChange={(n) => update("hoiAnnual" as any, n as any)}
                      />
                    </Field>

                    <Field label="Monthly HOA">
                      <CurrencyInput
                        value={scenario.hoaMonthly}
                        onChange={(n) => update("hoaMonthly", n as any)}
                      />
                    </Field>

                    <Field label="Qualifying rate">
                      <PercentInput
                        value={scenario.qualifyingRate}
                        onChange={(n) =>
                          update("qualifyingRate", n as any)
                        }
                        className={inputBase}
                      />
                    </Field>

                    <Field label="DSCR (calculated)">
                      <div className="rounded-md border border-border bg-muted/30 px-3 py-2.5">
                        <div className="text-xs text-muted-foreground">
                          DSCR = Rent / PITIA
                        </div>
                        <div className="mt-1 text-base font-semibold tabular-nums">
                          {Number.isFinite(scenario.dscr)
                            ? scenario.dscr.toFixed(2)
                            : "--"}
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
                          <div>
                            <div className="uppercase tracking-wide">PI</div>
                            <div className="tabular-nums text-foreground/90">
                              {Number.isFinite(payment)
                                ? `$${payment.toFixed(2)}`
                                : "--"}
                            </div>
                          </div>
                          <div>
                            <div className="uppercase tracking-wide">PITIA</div>
                            <div className="tabular-nums text-foreground/90">
                              {Number.isFinite(pitia)
                                ? `$${pitia.toFixed(2)}`
                                : "--"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Field>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Borrower */}
            <TabsContent value="borrower">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Field label="Credit score (FICO)">
                  <Input
                    inputMode="numeric"
                    value={ficoDraft}
                    onChange={(e) => {
                      const next = e.target.value.replace(/[^\d]/g, "");
                      setFicoDraft(next);
                    }}
                    onBlur={() => {
                      const n = Number(ficoDraft);
                      const clamped = Number.isFinite(n)
                        ? clamp(n, 300, 850)
                        : 300;
                      update("fico", clamped as any);
                      setFicoDraft(String(clamped));
                    }}
                    placeholder="e.g. 720"
                    className={inputBase}
                  />
                </Field>

                <Field label="Entity">
                  <Select
                    value={scenario.entity}
                    onValueChange={(v) =>
                      update("entity", v as Scenario["entity"])
                    }
                  >
                    <SelectTrigger className={inputBase}>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Entity">Entity</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <div className="lg:col-span-3 md:col-span-2">
                  <div className="rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                    Add borrower eligibility fields here next (bank statements,
                    reserves, DTI, etc.).
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Lenders */}
            <TabsContent value="lenders">
              <div className="rounded-xl border border-border bg-muted/30 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Lender selection
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose whether this scenario runs against{" "}
                      <span className="text-foreground">all lenders</span> or
                      only a selected subset.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => {
                        update(
                          "selectedLenderIds",
                          lenders.map((l) => l.id) as any
                        );
                        update("useAllLenders", false as any);
                      }}
                    >
                      Select all
                    </Button>
                    <Button
                      variant="secondary"
                      className="rounded-md"
                      onClick={() => {
                        update("selectedLenderIds", [] as any);
                        update("useAllLenders", false as any);
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Checkbox
                    checked={scenario.useAllLenders}
                    onCheckedChange={setUseAllLenders}
                  />
                  <div className="text-sm text-foreground">Use all lenders</div>
                  {!scenario.useAllLenders && (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        Eligible right now: {eligibleCount}/{lenders.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Selected: {scenario.selectedLenderIds.length}
                      </div>
                    </div>
                  )}
                </div>

                {!scenario.useAllLenders && (
                  <div className="mt-4 grid gap-2 md:grid-cols-2">
                    {lenders.map((l) => {
                      const checked = selectedSet.has(l.id);
                      const p = lenderPreviewMap.get(l.id);
                      return (
                        <label
                          key={l.id}
                          className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3 hover:bg-muted/30 transition"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) =>
                              toggleLender(l.id, c === true)
                            }
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {l.name}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-2">
                              {l.tagline}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              {p?.eligible ? (
                                <span className="text-[11px] rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 px-2 py-0.5">
                                  Eligible
                                </span>
                              ) : (
                                <span className="text-[11px] rounded-full bg-rose-500/10 text-rose-200 border border-rose-500/20 px-2 py-0.5">
                                  Ineligible
                                </span>
                              )}
                              <span className="text-[11px] text-muted-foreground">
                                Loan types: {l.loanTypes.join(", ")} · Purposes:{" "}
                                {l.purposes.join(", ")}
                              </span>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 text-sm text-rose-300">{error}</div>
          )}

          {/* Bottom buttons (always visible at end of left panel) */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button className="rounded-md" onClick={onRun}>
              Run Pricing
            </Button>
            <Button
              variant="secondary"
              className="rounded-md"
              onClick={() => {
                const s = defaultScenario();
                setScenario(s);
                saveScenario(s);
                setError(null);
                setRanOnce(false);
                setResults(null);
              }}
            >
              Reset
            </Button>
            <div className="text-xs text-muted-foreground">
              Phase 1 is deterministic rules (no AI, no uploads).
            </div>
          </div>
        </Card>

        {/* RIGHT: Results */}
        <Card className="lg:col-span-5 rounded-xl border border-border bg-card p-6">
          <div ref={resultsTopRef} />

          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-foreground">
                Results
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                Eligible / ineligible + notes (rule-based).
              </div>
            </div>

            {results ? (
              <div className="text-xs text-muted-foreground tabular-nums">
                <span className="text-emerald-200">{resultsEligible} eligible</span>
                <span className="mx-2">•</span>
                <span className="text-rose-200">{resultsIneligible} ineligible</span>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">
                Not run yet
              </div>
            )}
          </div>

          {!ranOnce ? (
            <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    Ready when you are
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Run pricing to populate this panel.
                  </div>
                </div>
              </div>
            </div>
          ) : results && results.length === 0 ? (
            <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              No lenders in scope (check “Use all lenders” or select some).
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {(results ?? []).map((r) => {
                const lender = lenders.find((l) => l.id === r.lenderId);
                const name = lender?.name ?? r.lenderId;

                return (
                  <div
                    key={r.lenderId}
                    className="rounded-lg border border-border bg-muted/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {name}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {lender?.tagline ?? ""}
                        </div>
                      </div>

                      {r.eligible ? (
                        <div className="flex items-center gap-1 text-emerald-200 text-xs">
                          <CheckCircle2 className="h-4 w-4" />
                          Eligible
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-200 text-xs">
                          <XCircle className="h-4 w-4" />
                          Ineligible
                        </div>
                      )}
                    </div>

                    {r.notes?.length ? (
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {r.notes.slice(0, 6).map((n, idx) => (
                          <li key={idx} className="leading-relaxed">
                            • {n}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-3 text-sm text-muted-foreground">
                        No notes.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 text-xs text-muted-foreground">
            Next: add “pricing outputs” (rate/points) once your engine returns those fields.
          </div>
        </Card>
      </div>
    </div>
  );
}