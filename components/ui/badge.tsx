import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "secondary" | "outline";

export function Badge({ className, variant = "default", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const v =
    variant === "default"
      ? "bg-primary/15 text-primary border border-primary/25"
      : variant === "secondary"
      ? "bg-muted text-muted-foreground border border-border"
      : "bg-transparent text-foreground border border-border";
  return <span className={cn("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium", v, className)} {...props} />;
}
