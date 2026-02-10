"use client";

import * as React from "react";
import { lenders as builtInLenders, type LenderRule } from "@/core/lenders";

const STORAGE_KEY = "loancursor.customLenders.v2";

function safeParse(jsonStr: string): unknown {
  try { return JSON.parse(jsonStr); } catch { return null; }
}

export function loadCustomLenders(): LenderRule[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) return [];
  // Light validation: only keep objects with id + name
  return parsed.filter((x) => x && typeof x === "object" && typeof (x as any).id === "string" && typeof (x as any).name === "string") as LenderRule[];
}

export function saveCustomLenders(lenders: LenderRule[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lenders));
}

export function getAllLenders(): LenderRule[] {
  // Built-ins first (stable ordering), with optional custom overrides by the same id.
  // Any remaining custom lenders (ids not in built-ins) are appended.
  const customs = loadCustomLenders();
  const byId = new Map(customs.map((l) => [l.id, l] as const));
  const builtIds = new Set(builtInLenders.map((l) => l.id));

  const mergedBuiltIns = builtInLenders.map((l) => byId.get(l.id) ?? l);
  const extraCustoms = customs.filter((l) => !builtIds.has(l.id));
  return [...mergedBuiltIns, ...extraCustoms];
}

export function useLenders() {
  const [customs, setCustoms] = React.useState<LenderRule[]>([]);
  React.useEffect(() => {
    setCustoms(loadCustomLenders());
  }, []);

  const all = React.useMemo(() => {
    const byId = new Map(customs.map((l) => [l.id, l] as const));
    const builtIds = new Set(builtInLenders.map((l) => l.id));
    const mergedBuiltIns = builtInLenders.map((l) => byId.get(l.id) ?? l);
    const extraCustoms = customs.filter((l) => !builtIds.has(l.id));
    return [...mergedBuiltIns, ...extraCustoms];
  }, [customs]);

  const setAllCustoms = React.useCallback((next: LenderRule[] | ((prev: LenderRule[]) => LenderRule[])) => {
    setCustoms((prev) => {
      const resolved = typeof next === "function" ? (next as any)(prev) : next;
      saveCustomLenders(resolved);
      return resolved;
    });
  }, []);

  return { lenders: all, customLenders: customs, setCustomLenders: setAllCustoms };
}
