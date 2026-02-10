import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs text-muted-foreground">Settings</div>
        <h1 className="mt-1 text-2xl font-semibold text-white">Workspace settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Basic placeholders to wire up later.</p>
      </div>

      <Card className="rounded-2xl border border-border bg-card/40 p-6 space-y-4">
        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Input placeholder="Company name" />
            <Input placeholder="Primary email" />
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Supabase (later)</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <Input placeholder="SUPABASE_URL" />
            <Input placeholder="SUPABASE_ANON_KEY" />
          </div>
        </div>

        <div className="pt-2">
          <Button className="rounded-lg">Save (mock)</Button>
        </div>
      </Card>
    </div>
  );
}
