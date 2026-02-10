"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  Landmark,
} from "lucide-react";

const nav = [
  { name: "Scenario", href: "/scenario", icon: ClipboardList },
  { name: "Results", href: "/results", icon: LayoutDashboard },
  { name: "Lenders", href: "/lenders", icon: Users },
  { name: "Admin", href: "/admin", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/scenario" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg">
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">LoanCursor</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className={cn("w-4 h-4", active ? "text-sidebar-accent-foreground" : "text-muted-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-6">
          <div className="rounded-md border border-border bg-muted/30 p-4">
            <div className="text-xs text-muted-foreground">Workspace</div>
            <div className="mt-1 text-sm font-medium">Pipeline → Docs → Close</div>
            <div className="mt-2 text-xs text-muted-foreground">Mock UI now • Plug in Supabase when ready.</div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="h-16 flex items-center justify-between px-6 border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="text-sm text-muted-foreground">Loan origination workspace</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">Local • Dev</div>
            <ThemeToggle />
          </div>
        </header>

        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
