export type Stored<T> = { version: number; data: T };

export function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const parsed = safeJsonParse<T>(window.localStorage.getItem(key));
  return parsed ?? fallback;
}

export function saveLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
