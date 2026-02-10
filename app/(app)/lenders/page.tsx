"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLenders } from "@/lib/lendersStore";
import type { LenderRule } from "@/core/lenders";

function slugifyId(name: string) {
  return (
    "custom_" +
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40)
  );
}

const ADJUSTMENTS_TEMPLATE = {
  ltv: [{ max: 70, rateAdd: 0.0, pointsAdd: 0.0, note: "Example LTV band" }],
  fico: [{ min: 720, rateAdd: 0.0, pointsAdd: 0.0, note: "Example FICO tier" }],
  dscr: [{ min: 1.15, rateAdd: 0.0, pointsAdd: 0.0, note: "Example DSCR tier" }],
  state: [{ states: ["NY"], rateAdd: 0.05, pointsAdd: 0.05, note: "Example state add" }],
  io: [{ when: "Yes", rateAdd: 0.125, pointsAdd: 0.25, note: "Example IO add" }],
  ppp: [{ term: 5, rateAdd: 0.0, pointsAdd: 0.0, note: "Example PPP base" }],
};

function buildBlank(): LenderRule {
  return {
    id: "custom_new",
    name: "",
    tagline: "",
    loanTypes: ["DSCR"],
    purposes: ["Purchase", "Refi", "CashOutRefi"],

    minFico: 680,
    maxLtv: 75,
    minDscr: 1.0,
    excludedStates: [],
    allowedPropertyTypes: ["SFR", "Condo", "2-4Unit"],
    disallowInterestOnly: false,
    baseRate: 8.0,
    basePoints: 1.0,
    adjustments: ADJUSTMENTS_TEMPLATE as any,
    strengths: [],
    avoidWhen: [],
  };
}

export default function LendersPage() {
  const { lenders, customLenders, setCustomLenders } = useLenders();

  const customById = React.useMemo(() => new Set(customLenders.map((l) => l.id)), [customLenders]);

  const [editing, setEditing] = React.useState<LenderRule | null>(null);
  const [jsonErr, setJsonErr] = React.useState<string | null>(null);

  function startAdd() {
    setEditing(buildBlank());
    setJsonErr(null);
  }

  function startEdit(id: string) {
    const l = lenders.find((x) => x.id === id);
    if (!l) return;
    // Create editable clone (supports built-in override because id is preserved).
    setEditing(JSON.parse(JSON.stringify(l)) as LenderRule);
    setJsonErr(null);
  }

  function remove(id: string) {
    // Removing an override reverts to the built-in lender (if one exists).
    setCustomLenders((prev) => prev.filter((x) => x.id !== id));
  }

  function upsert(next: LenderRule) {
    setCustomLenders((prev) => {
      const idx = prev.findIndex((x) => x.id === next.id);
      if (idx === -1) return [...prev, next];
      const copy = [...prev];
      copy[idx] = next;
      return copy;
    });
  }

  function save() {
    if (!editing) return;

    const trimmedName = editing.name.trim();
    if (!trimmedName) {
      setJsonErr("Name is required.");
      return;
    }

    const id = editing.id === "custom_new" ? slugifyId(trimmedName) : editing.id;

    setJsonErr(null);
    upsert({ ...editing, id });
    setEditing(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(customLenders, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "loancursor-custom-lenders.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array.");
      const cleaned = parsed
        .filter((x: any) => x && typeof x.id === "string" && typeof x.name === "string")
        .map((x: any) => x as LenderRule);
      setCustomLenders(cleaned);
    } catch (e: any) {
      alert(e?.message || "Invalid JSON");
    }
  }

  function toggleAllowedPropertyType(type: "SFR" | "Condo" | "2-4Unit", allowed: boolean) {
    setEditing((prev) => {
      if (!prev) return prev;
      const current = new Set(prev.allowedPropertyTypes || []);
      if (allowed) current.add(type);
      else current.delete(type);
      return { ...prev, allowedPropertyTypes: Array.from(current) as any };
    });
  }

  const condoAllowed = !!editing?.allowedPropertyTypes?.includes("Condo");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-xs text-muted-foreground">LoanCursor</div>

      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lenders</h1>
          <p className="mt-2 text-muted-foreground">
            Built-in lenders can be <span className="text-foreground">customized</span> (we store an override locally, so you
            don’t change the code defaults). Custom lenders you add also appear in Scenario + Results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={startAdd}>Add lender</Button>
          <Button variant="secondary" onClick={exportJson}>
            Export JSON
          </Button>
          <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/40 px-3 py-2 text-sm cursor-pointer">
            Import JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJson(f);
                e.currentTarget.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {editing && (
        <Card className="mt-6 rounded-2xl border border-border bg-card/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-foreground">
                {editing.id === "custom_new" ? "Add lender" : "Edit lender"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Tip: start simple — base rate/points + a few adjustment tiers. You can refine later.
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={save}>Save</Button>
            </div>
          </div>

          {jsonErr && <div className="mt-3 text-sm text-rose-300">{jsonErr}</div>}

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Name</div>
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Tagline</div>
              <Input value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} />
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Min FICO</div>
              <Input
                type="number"
                value={String(editing.minFico ?? "")}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setEditing({ ...editing, minFico: Number.isFinite(n) ? n : editing.minFico });
                }}
              />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Max LTV</div>
              <Input
                type="number"
                value={String(editing.maxLtv ?? "")}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setEditing({ ...editing, maxLtv: Number.isFinite(n) ? n : editing.maxLtv });
                }}
              />
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Min DSCR</div>
              <Input
                type="number"
                step="0.01"
                value={String(editing.minDscr ?? "")}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setEditing({ ...editing, minDscr: Number.isFinite(n) ? n : editing.minDscr });
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Base rate</div>
                <Input
                  type="number"
                  step="0.001"
                  value={String(editing.baseRate ?? "")}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setEditing({ ...editing, baseRate: Number.isFinite(n) ? n : editing.baseRate });
                  }}
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Base points</div>
                <Input
                  type="number"
                  step="0.01"
                  value={String(editing.basePoints ?? "")}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    setEditing({ ...editing, basePoints: Number.isFinite(n) ? n : editing.basePoints });
                  }}
                />
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-1">Excluded states (comma separated)</div>
              <Input
                value={(editing.excludedStates || []).join(",")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    excludedStates: e.target.value
                      .split(",")
                      .map((s) => s.trim().toUpperCase())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            {/* ✅ FIXED: Condo disallow uses allowedPropertyTypes instead of a missing disallowCondo field */}
            <div className="flex items-center gap-4 pt-5">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={!condoAllowed}
                  onChange={(e) => toggleAllowedPropertyType("Condo", !e.target.checked)}
                />
                Disallow Condo
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={!!editing.disallowInterestOnly}
                  onChange={(e) => setEditing({ ...editing, disallowInterestOnly: e.target.checked })}
                />
                Disallow IO
              </label>
            </div>

            <div className="md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Strengths (one per line)</div>
              <Textarea
                rows={3}
                value={(editing.strengths || []).join("\n")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    strengths: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            <div className="md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Avoid when (one per line)</div>
              <Textarea
                rows={3}
                value={(editing.avoidWhen || []).join("\n")}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    avoidWhen: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>

            {/* ✅ NEW: Full lender JSON preview so you can confirm minFico changes */}
            <div className="md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Lender JSON (preview)</div>
              <Textarea rows={10} readOnly value={JSON.stringify(editing, null, 2)} />
              <div className="mt-2 text-xs text-muted-foreground">
                This preview updates as you edit fields (so you can confirm changes like Min FICO are really saved).
              </div>
            </div>

            {/* Adjustments editor remains separate (it only edits adjustments) */}
            <div className="md:col-span-2">
              <div className="text-xs text-muted-foreground mb-1">Adjustments (JSON)</div>
              <Textarea
                rows={10}
                value={JSON.stringify(editing.adjustments || ADJUSTMENTS_TEMPLATE, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value || "{}");
                    setEditing({ ...editing, adjustments: parsed as any });
                    setJsonErr(null);
                  } catch {
                    setJsonErr("Adjustments JSON is invalid (fix the JSON).");
                  }
                }}
              />
              <div className="mt-2 text-xs text-muted-foreground">
                Adjustments drive pricing + breakdown. This editor only modifies the adjustments block (not Min FICO, Max LTV, etc.).
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-4">
        {lenders.map((l) => {
          const isBuiltIn = !l.id.startsWith("custom_");
          const isOverridden = isBuiltIn && customById.has(l.id);

          return (
            <Card key={l.id} className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium text-foreground">{l.name}</div>
                    {isBuiltIn ? (
                      <span className="text-[11px] rounded-full border border-border bg-card/40 px-2 py-0.5 text-muted-foreground">
                        {isOverridden ? "Built-in (overridden)" : "Built-in"}
                      </span>
                    ) : (
                      <span className="text-[11px] rounded-full border border-emerald-800 bg-emerald-900/30 px-2 py-0.5 text-emerald-200">
                        Custom
                      </span>
                    )}
                  </div>

                  {l.tagline && <div className="mt-1 text-sm text-muted-foreground">{l.tagline}</div>}

                  <div className="mt-2 text-xs text-muted-foreground">
                    Min FICO {l.minFico} • Max LTV {l.maxLtv}% • Min DSCR {l.minDscr} • Base {l.baseRate.toFixed(3)} /{" "}
                    {l.basePoints.toFixed(2)} pts
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/lenders/${l.id}`} className="text-sm text-foreground hover:underline">
                    View
                  </Link>

                  <Button variant="secondary" onClick={() => startEdit(l.id)}>
                    {isBuiltIn ? (isOverridden ? "Edit override" : "Customize") : "Edit"}
                  </Button>

                  {(l.id.startsWith("custom_") || isOverridden) && (
                    <Button
                      variant="outline"
                      className="border-rose-800 text-rose-200 hover:bg-rose-900/20"
                      onClick={() => remove(l.id)}
                    >
                      {l.id.startsWith("custom_") ? "Delete" : "Reset"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}