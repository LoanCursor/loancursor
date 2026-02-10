import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-xs text-muted-foreground">LoanCursor</div>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        Phase 1 is intentionally not PDF/AI-based. Maintain lender rules as structured data, with change logs.
      </p>

      <div className="mt-6 grid gap-4">
        <Card className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="text-sm font-semibold">Where lender rules live (today)</div>
          <p className="mt-3 text-sm text-muted-foreground">
            <code className="text-foreground">core/lenders.ts</code> and <code className="text-foreground">core/engine.ts</code>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Next step: store each lender's eligibility + pricing adjustments in Supabase tables, and build an internal
            editor here.
          </p>
        </Card>

        <Card className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="text-sm font-semibold">Update burden (designed correctly)</div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            You don’t update loans — you update rules. A change like “DSCR &lt; 1.0 pricing +0.25” becomes one edit that
            applies to all future scenarios instantly.
          </p>
        </Card>
      </div>
    </div>
  );
}
