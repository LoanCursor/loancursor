"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function safeNextPath(next: string | null): string {
  if (!next) return "/dashboard";
  if (!next.startsWith("/")) return "/dashboard";
  if (next === "/access" || next.startsWith("/access")) return "/dashboard";
  return next;
}

export default function AccessClient() {
  const sp = useSearchParams();
  const next = safeNextPath(sp.get("next"));

  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const trimmed = code.trim();
    if (!trimmed) {
      setErr("Please enter the access code.");
      return;
    }

    setLoading(true);

    try {
      const r = await fetch("/api/access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
        credentials: "include",
        cache: "no-store",
      });

      const data = await r.json().catch(() => ({}));
      if (!data?.ok) {
        setErr("Incorrect access code.");
        return;
      }

      // ✅ Most reliable: full navigation so cookie is definitely applied
      window.location.assign(next);
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="space-y-1">
          <div className="text-lg font-semibold">LoanCursor</div>
          <div className="text-sm text-muted-foreground">
            Enter the access code to continue.
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            autoFocus
          />
          {err && <div className="text-sm text-red-500">{err}</div>}
          <Button className="w-full" disabled={loading}>
            {loading ? "Checking..." : "Enter"}
          </Button>
        </form>
      </Card>
    </div>
  );
}