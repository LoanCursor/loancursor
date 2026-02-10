"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useLenders } from "@/lib/lendersStore";

export default function LenderProfile() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { lenders } = useLenders();

  const lender = lenders.find((l) => l.id === params.id);

  if (!lender) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-sm text-muted-foreground">Lender not found.</div>
        <button className="mt-3 text-sm text-foreground underline" onClick={() => router.push("/lenders")}>
          Back to lenders
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs text-muted-foreground">LoanCursor</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{lender.name}</h1>
          {lender.tagline && <p className="mt-2 text-muted-foreground">{lender.tagline}</p>}
          <div className="mt-3 text-xs text-muted-foreground">
            Min FICO {lender.minFico} • Max LTV {lender.maxLtv}% • Min DSCR {lender.minDscr}
          </div>
        </div>
        <Link href="/lenders" className="text-sm text-foreground hover:underline">
          Back
        </Link>
      </div>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="text-sm font-medium text-foreground">Base pricing</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Rate: <span className="font-medium text-foreground">{lender.baseRate.toFixed(3)}%</span> • Points:{" "}
            <span className="font-medium text-foreground">{lender.basePoints.toFixed(2)}</span>
          </div>
        </Card>

        <Card className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="text-sm font-medium text-foreground">Strengths</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            {(lender.strengths || []).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="text-sm font-medium text-foreground">Avoid when</div>
          <ul className="mt-3 list-disc pl-5 text-sm text-muted-foreground">
            {(lender.avoidWhen || []).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Card>

        <Card className="rounded-2xl border border-border bg-card/40 p-5">
          <div className="text-sm font-medium text-foreground">Adjustments</div>
          <pre className="mt-3 overflow-auto rounded-xl border border-border bg-black/30 p-3 text-xs text-foreground">
            {JSON.stringify(lender.adjustments, null, 2)}
          </pre>
        </Card>
      </div>
    </div>
  );
}
