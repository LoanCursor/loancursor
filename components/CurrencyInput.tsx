"use client";

import * as React from "react";

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function parseNumber(input: string) {
  // keep digits and decimal only
  const cleaned = input.replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function CurrencyInput({
  label,
  value,
  onChange,
  placeholder,
  className,
}: {
  /** Optional label. If you wrap this input with <Field label="...">, omit this. */
  label?: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
}) {
  const [text, setText] = React.useState<string>(value ? formatUSD(value) : "");
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (!focused) setText(value ? formatUSD(value) : "");
  }, [value, focused]);

  return (
    <div className="space-y-2">
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
        inputMode="numeric"
        placeholder={placeholder}
        value={text}
        onFocus={() => {
          setFocused(true);
          setText(value ? String(value) : "");
        }}
        onBlur={() => {
          setFocused(false);
          const num = parseNumber(text);
          // Parent already received live updates; on blur we only normalize formatting.
          setText(num ? formatUSD(num) : "");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          // Update parent while typing so values don't feel 'stuck'
          const num = parseNumber(next);
          onChange(num);
        }}
      />
    </div>
  );
}
