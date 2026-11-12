"use client";
import Link from "next/link";
import { BrickWall, Check, Droplets, Hammer, Handshake, Scissors, Shirt, Star, User, Wrench, Zap, type LucideIcon } from "lucide-react";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";

// ---- buttons ----
const VARIANTS = {
  filled: "bg-primary text-on-primary hover:brightness-110",
  tonal: "bg-primary-fixed text-on-primary-fixed hover:brightness-95",
  outline: "border-2 border-outline-variant text-primary hover:bg-surface-container",
  text: "text-primary hover:bg-surface-container",
};
type Variant = keyof typeof VARIANTS;
// 56px tall: comfortable touch target on a small phone
const btn = (variant: Variant, extra = "") =>
  `press inline-flex min-h-14 items-center justify-center gap-2 px-6 text-base font-semibold disabled:opacity-40 ${VARIANTS[variant]} ${extra}`;

export function Button({ variant = "filled", className, ...props }: React.ComponentProps<"button"> & { variant?: Variant }) {
  return <button type="button" {...props} className={btn(variant, className)} />;
}
export function ButtonLink({ variant = "filled", className, ...props }: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={btn(variant, className)} />;
}

/** Selectable chip or large option. */
export function Choice({ selected, className = "", ...props }: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button type="button" aria-pressed={!!selected} {...props}
      className={`press inline-flex min-h-12 items-center gap-2 px-4 text-left font-medium ${selected
        ? "bg-secondary text-on-secondary" : "bg-surface-high text-on-surface hover:bg-surface-highest"} ${className}`} />
  );
}

// ---- containers ----
export function Card({ className = "", ...props }: React.ComponentProps<"section">) {
  return <section {...props} className={`rounded-[28px] bg-surface-low p-5 ${className}`} />;
}

export function Notice({ kind = "error", children }: { kind?: "error" | "info"; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role={kind === "error" ? "alert" : "status"}
      className={`rounded-2xl px-4 py-3 text-sm font-medium ${kind === "error"
        ? "bg-error-container text-on-error-container" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>
      {children}
    </p>
  );
}

export function Field({ label, ...props }: React.ComponentProps<"input"> & { label: string }) {
  return (
    <label className="block text-sm font-medium text-on-surface-variant">
      {label}
      <input {...props}
        className="mt-1 block min-h-14 w-full rounded-2xl border-2 border-outline-variant bg-surface-lowest px-4 text-base text-on-surface focus:border-primary" />
    </label>
  );
}

export function Select({ label, children, ...props }: React.ComponentProps<"select"> & { label: string }) {
  return (
    <label className="block text-sm font-medium text-on-surface-variant">
      {label}
      <select {...props}
        className="mt-1 block min-h-14 w-full rounded-2xl border-2 border-outline-variant bg-surface-lowest px-3 text-base text-on-surface">
        {children}
      </select>
    </label>
  );
}

export const Loading = () => <p className="animate-pulse py-10 text-center text-on-surface-variant">…</p>;

// ---- trades ----
const TRADE_ICONS: Record<string, LucideIcon> = {
  tailor: Shirt, electrician: Zap, plumber: Droplets, mechanic: Wrench, mason: BrickWall, carpenter: Hammer, hairdresser: Scissors,
};
export function TradeIcon({ trade, size = 24 }: { trade: string; size?: number }) {
  const Icon = TRADE_ICONS[trade] ?? Wrench;
  return <Icon size={size} aria-hidden />;
}

// ---- trust tiers: each tier has its own shape, glyph and colour, never colour alone ----
function blob(points: number, amp: number) {
  const R = 46 / (1 + amp);
  return Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * 2 * Math.PI, r = R * (1 + amp * Math.cos(points * a));
    return `${i ? "L" : "M"}${(50 + r * Math.sin(a)).toFixed(1)} ${(50 - r * Math.cos(a)).toFixed(1)}`;
  }).join("") + "Z";
}
const CIRCLE = blob(1, 0);
const TIERS: { name: Key; shape: string; fill: string; ink: string; Icon: LucideIcon; outline?: boolean }[] = [
  { name: "tier0", shape: CIRCLE, fill: "transparent", ink: "var(--color-on-surface-variant)", Icon: User, outline: true },
  { name: "tier1", shape: CIRCLE, fill: "var(--color-secondary)", ink: "var(--color-on-secondary)", Icon: Handshake },
  { name: "tier2", shape: blob(6, 0.1), fill: "var(--color-tertiary)", ink: "var(--color-on-tertiary)", Icon: Check },
  { name: "tier3", shape: blob(8, 0.16), fill: "var(--color-primary)", ink: "var(--color-gold)", Icon: Star },
];
export const tierName = (tier: number): Key => TIERS[tier].name;

export function TierBadge({ tier, size = 56, ghost }: { tier: number; size?: number; ghost?: boolean }) {
  const { t } = useApp();
  const { name, shape, fill, ink, Icon, outline } = TIERS[tier];
  return (
    <span role="img" aria-label={t(name)} className={`relative inline-grid shrink-0 place-items-center ${ghost ? "opacity-30" : ""}`}
      style={{ width: size, height: size, color: ink }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
        <path d={shape} fill={fill} stroke={outline ? "currentColor" : "none"} strokeWidth={outline ? 5 : 0} />
      </svg>
      <Icon size={size * 0.44} strokeWidth={2.5} className="relative" fill={tier === 3 ? "currentColor" : "none"} aria-hidden />
    </span>
  );
}

/** "34 jobs checked · at least 92% satisfied": the one honest line shown everywhere. */
export function TrustLine({ a }: { a: { verified_jobs: number; pct: number | null } }) {
  const { t } = useApp();
  return (
    <p className="text-sm text-on-surface-variant">
      <strong className="text-on-surface">{t("jobsChecked", { n: a.verified_jobs })}</strong>
      {" · "}
      {a.pct === null ? t("notRated") : <strong className="text-secondary">{t("satisfied", { n: a.pct })}</strong>}
    </p>
  );
}

/** What the artisan still needs for the next tier, in plain words. */
export function NextStep({ a }: { a: { tier: number; next: { kind: "vouches" | "circle" | "jobs" | "score"; n: number } | null } }) {
  const { t } = useApp();
  return (
    <p className="text-sm text-on-surface-variant">
      {a.next ? t(`next_${a.next.kind}`, { n: a.next.n, tier: t(tierName(a.tier + 1)) }) : t("next_top")}
    </p>
  );
}
