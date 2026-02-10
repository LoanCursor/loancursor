"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getScenario } from "@/core/scenarioStore";
import { evaluateScenario } from "@/core/engine";
import { useLenders } from "@/lib/lendersStore";

function fmtDelta(n: number, digits = 3) {
  const v = Math.round(n * 1000) / 1000;
  const sign = v > 0 ? "+" : v < 0 ? "−" : "";
  const abs = Math.abs(v).toFixed(digits);
  return `${sign}${abs}`;
}

export default function ResultsPage() {
  const { lenders } = useLenders();
  const scenario = getScenario();

  const eligibleLenders = React.useMemo(() => {
    if (scenario.useAllLenders || scenario.selectedLenderIds.length === 0) return lenders;
    const set = new Set(scenario.selectedLenderIds);
    return lenders.filter((l) => set.has(l.id));
  }, [scenario.useAllLenders, scenario.selectedLenderIds]);

  const results = React.useMemo(() => evaluateScenario(scenario, eligibleLenders), [scenario, eligibleLenders]);

  const [expanded, setExpanded] = React.useState<string | null>(null);

  const eligible = results.filter((r) => r.eligible);
  const ineligible = results.filter((r) => !r.eligible);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">LoanCursor</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Pricing Results</h1>
          <p className="mt-2 text-muted-foreground">
            Ranked lender view for the current scenario. Expand a row to see how pricing was built.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/scenario">
            <Button className="rounded-lg">Edit Scenario</Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold text-foreground">Eligible</div>
            <div className="text-xs text-muted-foreground">{eligible.length} lender(s)</div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2 pr-4">Lender</th>
                  <th className="py-2 pr-4">Rate</th>
                  <th className="py-2 pr-4">Points</th>
                  <th className="py-2 pr-4">Notes</th>
                  <th className="py-2 pr-0 text-right">Details</th>
                </tr>
              </thead>
              <tbody>
                {eligible.map((r) => {
                  const isOpen = expanded === r.lenderId;
                  return (
                    <React.Fragment key={r.lenderId}>
                      <tr className="border-t border-border/70">
                        <td className="py-3 pr-4 font-medium">
                          <Link className="hover:underline" href={`/lenders/${r.lenderId}`}>
                            {r.lenderName}
                          </Link>
                        </td>
                        <td className="py-3 pr-4">{r.rate.toFixed(3)}%</td>
                        <td className="py-3 pr-4">{r.points.toFixed(2)}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{r.notes.join(" • ") || "—"}</td>
                        <td className="py-3 pr-0 text-right">
                          <button
                            className="text-xs text-indigo-300 hover:underline"
                            onClick={() => setExpanded(isOpen ? null : r.lenderId)}
                          >
                            {isOpen ? "Hide" : "Show"}
                          </button>
                        </td>
                      </tr>

                      {isOpen && (
                        <tr className="border-t border-border/70">
                          <td colSpan={5} className="py-4">
                            <div className="rounded-xl border border-border bg-muted/30 p-4">
                              <div className="text-xs text-muted-foreground">Pricing build</div>

                              <div className="mt-3 grid gap-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <div className="text-foreground">Base</div>
                                  <div className="text-foreground">
                                    {r.baseRate.toFixed(3)}% • {r.basePoints.toFixed(2)} pts
                                  </div>
                                </div>

                                {r.breakdown.map((b, idx) => (
                                  <div key={idx} className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                      <div className="text-foreground">{b.label}</div>
                                      {b.note && <div className="text-xs text-muted-foreground">{b.note}</div>}
                                    </div>
                                    <div className="shrink-0 text-right text-foreground tabular-nums">
                                      {fmtDelta(b.rateDelta)}% • {fmtDelta(b.pointsDelta, 2)} pts
                                    </div>
                                  </div>
                                ))}

                                <div className="mt-2 h-px bg-muted/40/70" />

                                <div className="flex items-center justify-between">
                                  <div className="text-foreground font-medium">Final</div>
                                  <div className="text-foreground font-medium">
                                    {r.rate.toFixed(3)}% • {r.points.toFixed(2)} pts
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-3">
                                <Link href={`/lenders/${r.lenderId}`}>
                                  <Button variant="secondary" className="rounded-md">
                                    View lender profile
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {eligible.length === 0 && (
            <div className="mt-4 text-sm text-muted-foreground">No eligible lenders for this scenario.</div>
          )}
        </Card>

        <Card className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold text-foreground">Ineligible</div>
            <div className="text-xs text-muted-foreground">{ineligible.length} lender(s)</div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2 pr-4">Lender</th>
                  <th className="py-2 pr-4">Why not</th>
                  <th className="py-2 pr-0 text-right">Profile</th>
                </tr>
              </thead>
              <tbody>
                {ineligible.map((r) => (
                  <tr key={r.lenderId} className="border-t border-border/70">
                    <td className="py-3 pr-4 font-medium">{r.lenderName}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{r.notes.join(" • ") || "—"}</td>
                    <td className="py-3 pr-0 text-right">
                      <Link className="text-xs text-indigo-300 hover:underline" href={`/lenders/${r.lenderId}`}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            Maintenance model: you update lender rules once; every future scenario uses the new truth.
          </div>
        </Card>
      </div>
    </div>
  );
}