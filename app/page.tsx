import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <Card className="max-w-2xl w-full rounded-3xl border border-border bg-card p-8">
        <div className="text-xs text-muted-foreground">LoanCursor</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Enter a scenario once. See all lenders at once.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          LoanCursor is a pricing intelligence layer for DSCR / Non-QM scenarios. It evaluates eligibility and pricing
          rules across your lender set and returns a ranked view that humans actually trust.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link href="/scenario">
            <Button className="rounded-xl">Build Scenario</Button>
          </Link>
          <Link href="/results">
            <Button variant="secondary" className="rounded-xl">View Results</Button>
          </Link>
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          Phase 1: deterministic rules (no AI, no PDF uploads). Phase 2: Excel-assisted updates + change detection for admins.
        </div>
      </Card>
    </div>
  );
}
