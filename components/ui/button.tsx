import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "secondary" | "ghost" | "outline";
type Size = "default" | "sm" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",
  secondary: "bg-muted text-foreground hover:opacity-90",
  ghost: "bg-transparent hover:bg-muted/60 text-foreground",
  outline: "border border-border bg-background hover:bg-muted/40",
};

const sizes: Record<Size, string> = {
  default: "h-11 px-4",
  sm: "h-9 px-3 rounded-md",
  icon: "h-9 w-9 p-0 rounded-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    );
  }
);
Button.displayName = "Button";
