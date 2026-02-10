import * as React from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  /** shadcn/Radix-style API used throughout the app */
  onCheckedChange?: (checked: boolean) => void;
};

export function Checkbox({ className, onCheckedChange, checked, defaultChecked, ...props }: CheckboxProps) {
  const isControlled = typeof checked === "boolean";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked);
    // If caller passed an onChange too, still honor it via props (we stripped onChange from types, but it may exist at runtime)
    // @ts-expect-error - allow passthrough if provided
    props.onChange?.(e);
  };

  return (
    <input
      type="checkbox"
      className={cn(
        "h-5 w-5 rounded-md border border-input bg-background shadow-sm accent-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      checked={isControlled ? checked : undefined}
      defaultChecked={!isControlled ? defaultChecked : undefined}
      onChange={handleChange}
      // Prevent React warning if someone sets `checked` but provides no handler (we provide onChange above, but keep this safe)
      readOnly={isControlled && !onCheckedChange && !(props as any).onChange}
      {...props}
    />
  );
}
