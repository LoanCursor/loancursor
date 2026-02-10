"use client";

import * as React from "react";

function parseNumber(input: string) {
  const cleaned = input.replace(/[^\d.]/g, "");
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

export function PercentInput({
  value,
  onChange,
  placeholder,
  className,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
}) {
  const [text, setText] = React.useState<string>(value ? String(value) : "");
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (!focused) setText(value ? String(value) : "");
  }, [value, focused]);

  return (
    <div className="relative">
      <input
        className={className}
        inputMode="decimal"
        placeholder={placeholder}
        value={text}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          let v = parseNumber(text);
          if (typeof min === "number") v = Math.max(min, v);
          if (typeof max === "number") v = Math.min(max, v);
          // Ensure final clamped value is applied
          onChange(v);
          setText(v ? String(v) : "");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          // Update parent while typing
          let v = parseNumber(next);
          if (typeof min === "number") v = Math.max(min, v);
          if (typeof max === "number") v = Math.min(max, v);
          onChange(v);
        }}
      />
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
        %
      </div>
    </div>
  );
}