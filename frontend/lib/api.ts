"use client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

// Production serves the API on the same origin (/api/*). Dev talks to uvicorn.
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

export type User = { id: string; name: string; phone: string; role: "customer" | "artisan" | "agent" | "admin"; quarter: string; artisan_id?: string };
export type Session = { token: string; user: User };
export type Label = { en: string; fr: string };
export type Trade = Label & { id: string; band: [number, number]; problems: (Label & { id: string })[] };
export type Ref = { trades: Trade[]; quarters: string[] };
export type Rating = { thumb: "up" | "down"; tags: string[]; ts: number };
export type Artisan = {
  id: string; name: string; trade: string; quarter: string; available: boolean; since: number;
  tier: 0 | 1 | 2 | 3; next: { kind: "vouches" | "circle" | "jobs" | "score"; n: number } | null;
  verified_jobs: number; up: number; down: number; pct: number | null; customers: number; repeat: number;
  vouch_count: number; neighbours?: number; km?: number; newcomer?: boolean;
  vouches?: { voucher_name: string; circle: string; relation: string; reason: string; ts: number }[];
  tags?: [string, number][];
  reviews?: { thumb: "up" | "down"; tags: string[]; ts: number; quarter: string; problem: string }[];
};
export type Job = {
  id: string; status: "booked" | "in_progress" | "completed" | "locked"; side: "customer" | "artisan";
  customer_name: string; artisan_id: string; artisan_name: string; trade: string; problem: string; quarter: string;
  urgency: string; created: number; band: [number, number]; code?: string; attempts_left: number;
  revealed: boolean; reviews: { customer?: Rating; artisan?: Rating };
};

// ---- tiny storage store: components re-render when a stored value changes ----
const listeners = new Set<() => void>();
const subscribe = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn); }; };
const store = (key: string) => (key === "lang" ? localStorage : sessionStorage);

export function useStored(key: "lang" | "session"): string | null {
  return useSyncExternalStore(subscribe, () => store(key).getItem(key), () => null);
}
export function setStored(key: "lang" | "session", value: string | null) {
  if (value === null) store(key).removeItem(key);
  else store(key).setItem(key, value);
  listeners.forEach((fn) => fn());
}

// ---- fetch ----
export async function api<T>(path: string, body?: unknown, form = false): Promise<T> {
  const session = sessionStorage.getItem("session");
  const headers: Record<string, string> = {};
  if (session) headers["X-Session-Token"] = (JSON.parse(session) as Session).token;
  if (body !== undefined) headers["Content-Type"] = form ? "application/x-www-form-urlencoded" : "application/json";
  const res = await fetch(BASE + "/api" + path, {
    method: body === undefined ? "GET" : "POST", headers,
    body: body === undefined ? undefined : form ? new URLSearchParams(body as Record<string, string>) : JSON.stringify(body),
  }).catch(() => { throw new Error("Cannot reach the server. Check your connection."); });
  if (form) return (await res.text()) as T;
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) setStored("session", null);
  if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Something went wrong");
  return data as T;
}

/** GET `path` (skipped while null), refetch on reload() or every `pollMs`. */
export function useApi<T>(path: string | null, pollMs?: number) {
  const [state, setState] = useState<{ path: string | null; data?: T; error?: string }>({ path });
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((n) => n + 1), []);
  useEffect(() => {
    if (!path) return;
    let live = true;
    api<T>(path).then((data) => live && setState({ path, data })).catch((e: Error) => live && setState({ path, error: e.message }));
    const timer = pollMs ? setInterval(reload, pollMs) : undefined;
    return () => { live = false; clearInterval(timer); };
  }, [path, tick, pollMs, reload]);
  const fresh = state.path === path; // never show another path's data
  return { data: fresh ? state.data : undefined, error: fresh ? state.error : undefined, reload, set: (data: T) => setState({ path, data }) };
}
