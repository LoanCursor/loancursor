(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cn.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-md border border-border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pb-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 10
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
_c2 = CardTitle;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cn$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_c3 = CardContent;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/core/scenarioStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultScenario",
    ()=>defaultScenario,
    "getScenario",
    ()=>getScenario,
    "saveScenario",
    ()=>saveScenario,
    "validateScenario",
    ()=>validateScenario
]);
const KEY = "loancursor_last_scenario";
function defaultScenario() {
    return {
        loanType: "DSCR",
        purpose: "Purchase",
        propertyValue: 600000,
        loanAmount: 450000,
        ltv: 75,
        fico: 720,
        rentMonthly: 4500,
        propertyTaxAnnual: 7200,
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
        amortizationYears: 30,
        prepayType: "None",
        prepayTerm: 5,
        entity: "Entity",
        useAllLenders: true,
        selectedLenderIds: []
    };
}
function validateScenario(s) {
    // --- State ---
    if (!s.state || s.state.trim().length !== 2) {
        return {
            ok: false,
            error: "State must be a 2-letter code (e.g. FL)."
        };
    }
    // --- Property & Loan ---
    if (!s.occupancy) {
        return {
            ok: false,
            error: "Select an occupancy type."
        };
    }
    if (!s.lienPosition) {
        return {
            ok: false,
            error: "Select a lien position."
        };
    }
    if (s.propertyType === "2-4Unit") {
        const u = Number(s.unitCount);
        if (![
            2,
            3,
            4
        ].includes(u)) {
            return {
                ok: false,
                error: "For 2–4 Unit properties, select the number of units (2, 3, or 4)."
            };
        }
    }
    if (!Number.isFinite(s.propertyValue) || s.propertyValue <= 0) {
        return {
            ok: false,
            error: "Property value must be greater than 0."
        };
    }
    if (!Number.isFinite(s.loanAmount) || s.loanAmount <= 0) {
        return {
            ok: false,
            error: "Loan amount must be greater than 0."
        };
    }
    if (s.loanAmount > s.propertyValue) {
        return {
            ok: false,
            error: "Loan amount cannot exceed property value."
        };
    }
    if (!Number.isFinite(s.ltv) || s.ltv <= 0 || s.ltv > 100) {
        return {
            ok: false,
            error: "LTV must be between 1 and 100."
        };
    }
    // --- Credit ---
    if (!Number.isFinite(s.fico) || s.fico < 300 || s.fico > 850) {
        return {
            ok: false,
            error: "Credit score must be between 300 and 850."
        };
    }
    // --- Income / DSCR inputs ---
    if (!Number.isFinite(s.rentMonthly) || s.rentMonthly <= 0) {
        return {
            ok: false,
            error: "Monthly rent must be greater than 0."
        };
    }
    if (!Number.isFinite(s.propertyTaxAnnual) || s.propertyTaxAnnual < 0) {
        return {
            ok: false,
            error: "Annual property tax must be 0 or greater."
        };
    }
    if (!Number.isFinite(s.hoaMonthly) || s.hoaMonthly < 0) {
        return {
            ok: false,
            error: "Monthly HOA must be 0 or greater."
        };
    }
    // --- Reserves (optional) ---
    if (s.reservesMonths != null) {
        const rm = Number(s.reservesMonths);
        if (!Number.isFinite(rm) || rm < 0 || rm > 36) {
            return {
                ok: false,
                error: "Reserves months must be between 0 and 36."
            };
        }
    }
    // --- Qualifying rate (for DSCR calc) ---
    if (!Number.isFinite(s.qualifyingRate) || s.qualifyingRate <= 0 || s.qualifyingRate > 20) {
        return {
            ok: false,
            error: "Qualifying rate must be a valid percentage."
        };
    }
    // --- DSCR (computed, but still sanity-checked) ---
    if (!Number.isFinite(s.dscr) || s.dscr <= 0) {
        return {
            ok: false,
            error: "DSCR could not be calculated. Check rent, expenses, and loan terms."
        };
    }
    // --- Interest-only structure ---
    if (s.interestOnly) {
        const io = Number(s.ioYears);
        if (![
            5,
            7,
            10
        ].includes(io)) {
            return {
                ok: false,
                error: "Select an Interest-Only structure (5, 7, or 10 years IO)."
            };
        }
    }
    // --- PPP logic sanity ---
    if (s.prepayType !== "None") {
        if (!Number.isFinite(s.prepayTerm) || s.prepayTerm < 1 || s.prepayTerm > 7) {
            return {
                ok: false,
                error: "Prepayment penalty term must be between 1 and 7 years."
            };
        }
    }
    return {
        ok: true
    };
}
function saveScenario(s) {
    try {
        localStorage.setItem(KEY, JSON.stringify(s));
    } catch  {
    // ignore
    }
}
function getScenario() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return defaultScenario();
        const parsed = JSON.parse(raw);
        return {
            ...defaultScenario(),
            ...parsed
        };
    } catch  {
        return defaultScenario();
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/core/lenders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "lenders",
    ()=>lenders,
    "maxEligibleLtvForScenario",
    ()=>maxEligibleLtvForScenario,
    "minDscrForScenario",
    ()=>minDscrForScenario
]);
const lenders = [
    {
        id: "bpl_standard",
        name: "BPL – Standard",
        tagline: "Conservative DSCR lane with simple overlays.",
        loanTypes: [
            "DSCR"
        ],
        purposes: [
            "Purchase",
            "Refi",
            "CashOutRefi"
        ],
        minFico: 680,
        // Default caps
        maxLtv: 80,
        maxLtvByPurpose: {
            Purchase: 80,
            Refi: 80,
            CashOutRefi: 75
        },
        // Cash-out tiers by FICO (mirrors common sheet behavior)
        cashOutMaxLtvByFico: [
            {
                minFico: 700,
                maxLtv: 75,
                note: "Cash-out tier (700+)"
            },
            {
                minFico: 680,
                maxLtv: 70,
                note: "Cash-out tier (<700)"
            }
        ],
        excludedStates: [],
        allowedPropertyTypes: [
            "SFR",
            "Condo",
            "2-4Unit"
        ],
        disallowInterestOnly: false,
        condoNonWarrantableMaxLtv: 70,
        decliningMarketLtvHit: 5,
        // DSCR requirement: based on FICO (simplified from sheet language)
        minDscr: 1.2,
        // We'll enforce 1.0 for 720+ inside the engine notes/logic.
        baseRate: 8.250,
        basePoints: 1.25,
        adjustments: {
            ltv: [
                {
                    max: 65,
                    rateAdd: -0.125,
                    pointsAdd: -0.25,
                    note: "Low LTV credit"
                },
                {
                    max: 70,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    max: 75,
                    rateAdd: 0.125,
                    pointsAdd: 0.25
                },
                {
                    max: 80,
                    rateAdd: 0.250,
                    pointsAdd: 0.50,
                    note: "High LTV add"
                }
            ],
            fico: [
                {
                    min: 760,
                    rateAdd: -0.125,
                    pointsAdd: -0.25
                },
                {
                    min: 720,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    min: 700,
                    rateAdd: 0.125,
                    pointsAdd: 0.25
                },
                {
                    min: 680,
                    rateAdd: 0.250,
                    pointsAdd: 0.50
                }
            ],
            dscr: [
                {
                    min: 1.35,
                    rateAdd: -0.100,
                    pointsAdd: -0.10
                },
                {
                    min: 1.20,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    min: 1.00,
                    rateAdd: 0.100,
                    pointsAdd: 0.10
                }
            ],
            state: [],
            io: [
                {
                    when: "Yes",
                    rateAdd: 0.125,
                    pointsAdd: 0.25,
                    note: "Interest-only add"
                },
                {
                    when: "No",
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                }
            ],
            // PPP: base assumes 5-year; 3-year adds rate (from sheet language). Keep others neutral for now.
            ppp: [
                {
                    term: 5,
                    rateAdd: 0.0,
                    pointsAdd: 0.0,
                    note: "Base assumes 5-yr PPP"
                },
                {
                    term: 3,
                    rateAdd: 0.375,
                    pointsAdd: 0.0,
                    note: "3-yr PPP add"
                }
            ]
        },
        strengths: [
            "Straightforward DSCR lane",
            "Predictable overlays",
            "Good for clean deals"
        ],
        avoidWhen: [
            "Borderline DSCR with high LTV",
            "Tight condos / special property types"
        ]
    },
    {
        id: "bpl_expanded",
        name: "BPL – Expanded",
        tagline: "More flexible DSCR with tiered DSCR and overlays.",
        loanTypes: [
            "DSCR"
        ],
        purposes: [
            "Purchase",
            "Refi",
            "CashOutRefi"
        ],
        minFico: 660,
        maxLtv: 80,
        maxLtvByPurpose: {
            Purchase: 80,
            Refi: 80,
            CashOutRefi: 75
        },
        excludedStates: [
            "ND",
            "NV",
            "SD"
        ],
        allowedPropertyTypes: [
            "SFR",
            "Condo",
            "2-4Unit"
        ],
        disallowInterestOnly: false,
        condoNonWarrantableMaxLtv: 65,
        decliningMarketLtvHit: 5,
        // DSCR tiers by LTV (Expanded-style behavior)
        dscrTiers: [
            {
                maxLtv: 65,
                minDscr: 0.75,
                note: "≤65 LTV DSCR tier"
            },
            {
                maxLtv: 80,
                minDscr: 1.0,
                note: "65.01–80 LTV DSCR tier"
            }
        ],
        strMinDscr: 1.15,
        baseRate: 7.875,
        basePoints: 1.75,
        adjustments: {
            ltv: [
                {
                    max: 65,
                    rateAdd: -0.125,
                    pointsAdd: -0.25,
                    note: "Low LTV credit"
                },
                {
                    max: 70,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    max: 75,
                    rateAdd: 0.125,
                    pointsAdd: 0.25
                },
                {
                    max: 80,
                    rateAdd: 0.250,
                    pointsAdd: 0.50,
                    note: "High LTV add"
                }
            ],
            fico: [
                {
                    min: 760,
                    rateAdd: -0.125,
                    pointsAdd: -0.25
                },
                {
                    min: 720,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    min: 700,
                    rateAdd: 0.125,
                    pointsAdd: 0.25
                },
                {
                    min: 660,
                    rateAdd: 0.250,
                    pointsAdd: 0.50
                }
            ],
            dscr: [
                {
                    min: 1.35,
                    rateAdd: -0.100,
                    pointsAdd: -0.10
                },
                {
                    min: 1.15,
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                },
                {
                    min: 1.00,
                    rateAdd: 0.100,
                    pointsAdd: 0.10
                },
                {
                    min: 0.75,
                    rateAdd: 0.200,
                    pointsAdd: 0.20,
                    note: "Low DSCR add"
                }
            ],
            state: [
                {
                    states: [
                        "NY",
                        "NJ"
                    ],
                    rateAdd: 0.05,
                    pointsAdd: 0.05,
                    note: "State add (example)"
                }
            ],
            io: [
                {
                    when: "Yes",
                    rateAdd: 0.125,
                    pointsAdd: 0.25,
                    note: "Interest-only add"
                },
                {
                    when: "No",
                    rateAdd: 0.0,
                    pointsAdd: 0.0
                }
            ],
            ppp: [
                {
                    term: 5,
                    rateAdd: 0.0,
                    pointsAdd: 0.0,
                    note: "Base assumes 5-yr PPP"
                },
                {
                    term: 3,
                    rateAdd: 0.250,
                    pointsAdd: 0.0,
                    note: "3-yr PPP add"
                },
                {
                    term: 2,
                    rateAdd: 0.375,
                    pointsAdd: 0.0,
                    note: "2-yr PPP add"
                },
                {
                    term: 1,
                    rateAdd: 0.500,
                    pointsAdd: 0.0,
                    note: "1-yr PPP add"
                }
            ]
        },
        strengths: [
            "Tiered DSCR options",
            "STR capable (with higher DSCR)",
            "More flexible overlays"
        ],
        avoidWhen: [
            "Excluded states (ND/NV/SD)",
            "Non-warrantable condos over 65 LTV"
        ]
    }
];
function maxEligibleLtvForScenario(l, s) {
    const notes = [];
    let maxLtv = l.maxLtvByPurpose?.[s.purpose] ?? l.maxLtv;
    // Cash-out tiers by FICO (if provided)
    if (s.purpose === "CashOutRefi" && l.cashOutMaxLtvByFico?.length) {
        const rows = [
            ...l.cashOutMaxLtvByFico
        ].sort((a, b)=>b.minFico - a.minFico);
        const row = rows.find((r)=>s.fico >= r.minFico) ?? rows[rows.length - 1];
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
    return {
        maxLtv,
        notes
    };
}
function minDscrForScenario(l, s) {
    const notes = [];
    // STR overlay
    if (s.isSTR && typeof l.strMinDscr === "number") {
        notes.push(`STR min DSCR ${l.strMinDscr}`);
        return {
            minDscr: l.strMinDscr,
            notes
        };
    }
    // Tiered DSCR by LTV
    if (l.dscrTiers?.length) {
        const row = l.dscrTiers.find((t)=>s.ltv <= t.maxLtv) ?? l.dscrTiers[l.dscrTiers.length - 1];
        if (row.note) notes.push(row.note);
        return {
            minDscr: row.minDscr,
            notes
        };
    }
    // BPL Standard special: 720+ lowers DSCR requirement (captured here without custom functions)
    if (l.id === "bpl_standard") {
        if (s.fico >= 720) return {
            minDscr: 1.0,
            notes: [
                "FICO 720+ DSCR tier"
            ]
        };
        return {
            minDscr: 1.2,
            notes: [
                "FICO <720 DSCR tier"
            ]
        };
    }
    return {
        minDscr: l.minDscr ?? 0,
        notes
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/core/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateScenario",
    ()=>evaluateScenario
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/lenders.ts [app-client] (ecmascript)");
;
function matchLtvAdj(rule, ltv) {
    const row = rule.adjustments.ltv.find((r)=>ltv <= r.max) ?? rule.adjustments.ltv[rule.adjustments.ltv.length - 1];
    return row;
}
function matchFicoAdj(rule, fico) {
    const rows = [
        ...rule.adjustments.fico
    ].sort((a, b)=>b.min - a.min);
    const row = rows.find((r)=>fico >= r.min) ?? rows[rows.length - 1];
    return row;
}
function matchDscrAdj(rule, dscr) {
    const rows = (rule.adjustments.dscr ?? []).slice().sort((a, b)=>b.min - a.min);
    const row = rows.find((r)=>dscr >= r.min);
    return row ?? null;
}
function matchStateAdj(rule, state) {
    const rows = rule.adjustments.state ?? [];
    return rows.find((r)=>r.states.includes(state.toUpperCase())) ?? null;
}
function matchPppAdj(rule, term) {
    const rows = rule.adjustments.ppp ?? [];
    return rows.find((r)=>r.term === term) ?? null;
}
function evaluateScenario(s, lenderRules) {
    const state = (s.state || "").toUpperCase();
    const results = lenderRules.map((l)=>{
        const notes = [];
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
        const { maxLtv, notes: maxLtvNotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxEligibleLtvForScenario"])(l, s);
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
            const { minDscr, notes: dscrNotes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["minDscrForScenario"])(l, s);
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
                notes
            };
        }
        // --- Pricing (base + simple adjustments) ---
        const breakdown = [];
        let rate = l.baseRate;
        let points = l.basePoints;
        const addRow = (label, rateDelta, pointsDelta, note)=>{
            if (rateDelta === 0 && pointsDelta === 0 && !note) return;
            breakdown.push({
                label,
                rateDelta,
                pointsDelta,
                note
            });
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
        const ioAdj = ioRows.find((r)=>r.when === (s.interestOnly ? "Yes" : "No")) ?? null;
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
        const pricingNotes = [];
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
            notes: [
                ...notes,
                ...pricingNotes
            ]
        };
    });
    // Eligible first, then best rate, then points
    const eligible = results.filter((r)=>r.eligible).sort((a, b)=>a.rate - b.rate || a.points - b.points);
    const ineligible = results.filter((r)=>!r.eligible).sort((a, b)=>a.lenderName.localeCompare(b.lenderName));
    return [
        ...eligible,
        ...ineligible
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/lendersStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllLenders",
    ()=>getAllLenders,
    "loadCustomLenders",
    ()=>loadCustomLenders,
    "saveCustomLenders",
    ()=>saveCustomLenders,
    "useLenders",
    ()=>useLenders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/lenders.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const STORAGE_KEY = "loancursor.customLenders.v2";
function safeParse(jsonStr) {
    try {
        return JSON.parse(jsonStr);
    } catch  {
        return null;
    }
}
function loadCustomLenders() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = safeParse(raw);
    if (!Array.isArray(parsed)) return [];
    // Light validation: only keep objects with id + name
    return parsed.filter((x)=>x && typeof x === "object" && typeof x.id === "string" && typeof x.name === "string");
}
function saveCustomLenders(lenders) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lenders));
}
function getAllLenders() {
    // Built-ins first (stable ordering), with optional custom overrides by the same id.
    // Any remaining custom lenders (ids not in built-ins) are appended.
    const customs = loadCustomLenders();
    const byId = new Map(customs.map((l)=>[
            l.id,
            l
        ]));
    const builtIds = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lenders"].map((l)=>l.id));
    const mergedBuiltIns = __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lenders"].map((l)=>byId.get(l.id) ?? l);
    const extraCustoms = customs.filter((l)=>!builtIds.has(l.id));
    return [
        ...mergedBuiltIns,
        ...extraCustoms
    ];
}
function useLenders() {
    _s();
    const [customs, setCustoms] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useLenders.useEffect": ()=>{
            setCustoms(loadCustomLenders());
        }
    }["useLenders.useEffect"], []);
    const all = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "useLenders.useMemo[all]": ()=>{
            const byId = new Map(customs.map({
                "useLenders.useMemo[all]": (l)=>[
                        l.id,
                        l
                    ]
            }["useLenders.useMemo[all]"]));
            const builtIds = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lenders"].map({
                "useLenders.useMemo[all]": (l)=>l.id
            }["useLenders.useMemo[all]"]));
            const mergedBuiltIns = __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$lenders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lenders"].map({
                "useLenders.useMemo[all].mergedBuiltIns": (l)=>byId.get(l.id) ?? l
            }["useLenders.useMemo[all].mergedBuiltIns"]);
            const extraCustoms = customs.filter({
                "useLenders.useMemo[all].extraCustoms": (l)=>!builtIds.has(l.id)
            }["useLenders.useMemo[all].extraCustoms"]);
            return [
                ...mergedBuiltIns,
                ...extraCustoms
            ];
        }
    }["useLenders.useMemo[all]"], [
        customs
    ]);
    const setAllCustoms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "useLenders.useCallback[setAllCustoms]": (next)=>{
            setCustoms({
                "useLenders.useCallback[setAllCustoms]": (prev)=>{
                    const resolved = typeof next === "function" ? next(prev) : next;
                    saveCustomLenders(resolved);
                    return resolved;
                }
            }["useLenders.useCallback[setAllCustoms]"]);
        }
    }["useLenders.useCallback[setAllCustoms]"], []);
    return {
        lenders: all,
        customLenders: customs,
        setCustomLenders: setAllCustoms
    };
}
_s(useLenders, "DEXMGELQjBm5T/Rr7ChcmpOQPeo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(app)/results/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ResultsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$scenarioStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/scenarioStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lendersStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/lendersStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function fmtDelta(n, digits = 3) {
    const v = Math.round(n * 1000) / 1000;
    const sign = v > 0 ? "+" : v < 0 ? "−" : "";
    const abs = Math.abs(v).toFixed(digits);
    return `${sign}${abs}`;
}
function ResultsPage() {
    _s();
    const { lenders } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lendersStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLenders"])();
    const scenario = (0, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$scenarioStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getScenario"])();
    const eligibleLenders = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ResultsPage.useMemo[eligibleLenders]": ()=>{
            if (scenario.useAllLenders || scenario.selectedLenderIds.length === 0) return lenders;
            const set = new Set(scenario.selectedLenderIds);
            return lenders.filter({
                "ResultsPage.useMemo[eligibleLenders]": (l)=>set.has(l.id)
            }["ResultsPage.useMemo[eligibleLenders]"]);
        }
    }["ResultsPage.useMemo[eligibleLenders]"], [
        scenario.useAllLenders,
        scenario.selectedLenderIds
    ]);
    const results = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ResultsPage.useMemo[results]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["evaluateScenario"])(scenario, eligibleLenders)
    }["ResultsPage.useMemo[results]"], [
        scenario,
        eligibleLenders
    ]);
    const [expanded, setExpanded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const eligible = results.filter((r)=>r.eligible);
    const ineligible = results.filter((r)=>!r.eligible);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 max-w-5xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-muted-foreground",
                                children: "LoanCursor"
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-2 text-2xl font-semibold tracking-tight",
                                children: "Pricing Results"
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-muted-foreground",
                                children: "Ranked lender view for the current scenario. Expand a row to see how pricing was built."
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(app)/results/page.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/scenario",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "rounded-lg",
                                children: "Edit Scenario"
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(app)/results/page.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(app)/results/page.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(app)/results/page.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-2xl border border-border bg-card/40 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-foreground",
                                        children: "Eligible"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/results/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            eligible.length,
                                            " lender(s)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(app)/results/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "text-muted-foreground",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Lender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Rate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Points"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Notes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 66,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-0 text-right",
                                                        children: "Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 67,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/results/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: eligible.map((r)=>{
                                                const isOpen = expanded === r.lenderId;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-border/70",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 pr-4 font-medium",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        className: "hover:underline",
                                                                        href: `/lenders/${r.lenderId}`,
                                                                        children: r.lenderName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                                        lineNumber: 77,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 76,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 pr-4",
                                                                    children: [
                                                                        r.rate.toFixed(3),
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 81,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 pr-4",
                                                                    children: r.points.toFixed(2)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 82,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 pr-4 text-muted-foreground",
                                                                    children: r.notes.join(" • ") || "—"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 pr-0 text-right",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: "text-xs text-indigo-300 hover:underline",
                                                                        onClick: ()=>setExpanded(isOpen ? null : r.lenderId),
                                                                        children: isOpen ? "Hide" : "Show"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                                        lineNumber: 85,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 84,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                            lineNumber: 75,
                                                            columnNumber: 23
                                                        }, this),
                                                        isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-border/70",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: 5,
                                                                className: "py-4",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "rounded-xl border border-border bg-muted/30 p-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "text-xs text-muted-foreground",
                                                                            children: "Pricing build"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                            lineNumber: 98,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-3 grid gap-2 text-sm",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-foreground",
                                                                                            children: "Base"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                                            lineNumber: 102,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-foreground",
                                                                                            children: [
                                                                                                r.baseRate.toFixed(3),
                                                                                                "% • ",
                                                                                                r.basePoints.toFixed(2),
                                                                                                " pts"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                                            lineNumber: 103,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                                    lineNumber: 101,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                r.breakdown.map((b, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-start justify-between gap-4",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "min-w-0",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "text-foreground",
                                                                                                        children: b.label
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                                                                        lineNumber: 111,
                                                                                                        columnNumber: 39
                                                                                                    }, this),
                                                                                                    b.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                        className: "text-xs text-muted-foreground",
                                                                                                        children: b.note
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                                                                        lineNumber: 112,
                                                                                                        columnNumber: 50
                                                                                                    }, this)
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                                                                lineNumber: 110,
                                                                                                columnNumber: 37
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "shrink-0 text-right text-foreground tabular-nums",
                                                                                                children: [
                                                                                                    fmtDelta(b.rateDelta),
                                                                                                    "% • ",
                                                                                                    fmtDelta(b.pointsDelta, 2),
                                                                                                    " pts"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                                                                lineNumber: 114,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        ]
                                                                                    }, idx, true, {
                                                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                                                        lineNumber: 109,
                                                                                        columnNumber: 35
                                                                                    }, this)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "mt-2 h-px bg-muted/40/70"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                                    lineNumber: 120,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center justify-between",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-foreground font-medium",
                                                                                            children: "Final"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                                            lineNumber: 123,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-foreground font-medium",
                                                                                            children: [
                                                                                                r.rate.toFixed(3),
                                                                                                "% • ",
                                                                                                r.points.toFixed(2),
                                                                                                " pts"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                                            lineNumber: 124,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                                    lineNumber: 122,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                            lineNumber: 100,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-4 flex flex-wrap gap-3",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                                href: `/lenders/${r.lenderId}`,
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                    variant: "secondary",
                                                                                    className: "rounded-md",
                                                                                    children: "View lender profile"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                                    lineNumber: 132,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                                                lineNumber: 131,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                                            lineNumber: 130,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                                    lineNumber: 97,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, r.lenderId, true, {
                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/results/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/results/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            eligible.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-sm text-muted-foreground",
                                children: "No eligible lenders for this scenario."
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(app)/results/page.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                        className: "rounded-2xl border border-border bg-card/40 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-semibold text-foreground",
                                        children: "Ineligible"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(app)/results/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-muted-foreground",
                                        children: [
                                            ineligible.length,
                                            " lender(s)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(app)/results/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "text-muted-foreground",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "text-left",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Lender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-4",
                                                        children: "Why not"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2 pr-0 text-right",
                                                        children: "Profile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(app)/results/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/results/page.tsx",
                                            lineNumber: 161,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            children: ineligible.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-t border-border/70",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 pr-4 font-medium",
                                                            children: r.lenderName
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 pr-4 text-muted-foreground",
                                                            children: r.notes.join(" • ") || "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-3 pr-0 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                className: "text-xs text-indigo-300 hover:underline",
                                                                href: `/lenders/${r.lenderId}`,
                                                                children: "View"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(app)/results/page.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(app)/results/page.tsx",
                                                            lineNumber: 173,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, r.lenderId, true, {
                                                    fileName: "[project]/app/(app)/results/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/(app)/results/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(app)/results/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 text-xs text-muted-foreground",
                                children: "Maintenance model: you update lender rules once; every future scenario uses the new truth."
                            }, void 0, false, {
                                fileName: "[project]/app/(app)/results/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(app)/results/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(app)/results/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(app)/results/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(ResultsPage, "KYIllh6kdHEYM8Q3d5fEoq+/YXo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$lendersStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLenders"]
    ];
});
_c = ResultsPage;
var _c;
__turbopack_context__.k.register(_c, "ResultsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_6aa6b8e3._.js.map