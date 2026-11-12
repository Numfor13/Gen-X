"use client";
import Link from "next/link";
import { BrickWall, Check, ChevronRight, Droplets, Hammer, Handshake, Scissors, Shirt, Star, User, Wrench, Zap, type LucideIcon } from "lucide-react";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";

// Material 3 Expressive, applied with restraint: hierarchy comes from size, containment and one
// brand colour. Decorative shapes are kept for the trust badge, which is the product's signature.

// ---- buttons ----
const VARIANTS = {
  filled: "bg-primary text-on-primary hover:brightness-110",
  tonal: "bg-secondary-container text-on-secondary-container hover:brightness-95",
  outline: "border border-outline text-primary hover:bg-surface-low",
  text: "text-primary hover:bg-surface-low",
};
type Variant = keyof typeof VARIANTS;
type Size = "md" | "lg";
// md is 48px (minimum touch target); lg is for the one main action of a screen
const btn = (variant: Variant, size: Size, extra = "") =>
  `press inline-flex items-center justify-center gap-2 font-semibold disabled:opacity-40 ${
    size === "lg" ? "min-h-14 px-8 text-base" : "min-h-12 px-5 text-sm"} ${VARIANTS[variant]} ${extra}`;

type ButtonLook = { variant?: Variant; size?: Size };
export function Button({ variant = "filled", size = "md", className, ...props }: React.ComponentProps<"button"> & ButtonLook) {
  return <button type="button" {...props} className={btn(variant, size, className)} />;
}
export function ButtonLink({ variant = "filled", size = "md", className, ...props }: React.ComponentProps<typeof Link> & ButtonLook) {
  return <Link {...props} className={btn(variant, size, className)} />;
}

/** Filter chip: a small selectable option. */
export function Choice({ selected, className = "", ...props }: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button type="button" aria-pressed={!!selected} {...props}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium transition-colors ${selected
        ? "border-primary bg-primary-container text-on-primary-container"
        : "border-outline-variant text-on-surface hover:bg-surface-low"} ${className}`} />
  );
}

// ---- containers ----
export function Card({ className = "", ...props }: React.ComponentProps<"section">) {
  return <section {...props} className={`rounded-2xl border border-outline-variant/60 bg-surface-lowest p-4 ${className}`} />;
}

/** A list inside one container: rows separated by hairlines. */
export function List({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={`divide-y divide-outline-variant/50 overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-lowest ${className}`} />;
}
const ROW = "flex min-h-16 w-full items-center gap-3 px-4 py-2 text-left hover:bg-surface-low disabled:opacity-40";
function RowBody({ icon, children, sub }: { icon?: React.ReactNode; children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <>
      {icon && <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-container text-on-surface">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">{children}</span>
        {sub && <span className="block truncate text-sm text-on-surface-variant">{sub}</span>}
      </span>
      <ChevronRight size={18} className="shrink-0 text-on-surface-variant" aria-hidden />
    </>
  );
}
type RowProps = { icon?: React.ReactNode; sub?: React.ReactNode; children: React.ReactNode };
export function RowButton({ icon, sub, children, ...props }: Omit<React.ComponentProps<"button">, "children"> & RowProps) {
  return <button type="button" {...props} className={ROW}><RowBody icon={icon} sub={sub}>{children}</RowBody></button>;
}
export function RowLink({ icon, sub, children, ...props }: Omit<React.ComponentProps<typeof Link>, "children"> & RowProps) {
  return <Link {...props} className={ROW}><RowBody icon={icon} sub={sub}>{children}</RowBody></Link>;
}

export function Notice({ kind = "error", children }: { kind?: "error" | "info"; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role={kind === "error" ? "alert" : "status"}
      className={`rounded-xl px-4 py-3 text-sm font-medium ${kind === "error"
        ? "bg-error-container text-on-error-container" : "bg-secondary-container text-on-secondary-container"}`}>
      {children}
    </p>
  );
}

const INPUT = "mt-1 block min-h-12 w-full rounded-xl border border-outline bg-surface-lowest px-3.5 text-base text-on-surface focus:border-primary focus:outline-2 focus:outline-primary";
export function Field({ label, ...props }: React.ComponentProps<"input"> & { label: string }) {
  return (
    <label className="block text-sm font-medium text-on-surface-variant">
      {label}
      <input {...props} className={INPUT} />
    </label>
  );
}
export function Select({ label, children, ...props }: React.ComponentProps<"select"> & { label: string }) {
  return (
    <label className="block text-sm font-medium text-on-surface-variant">
      {label}
      <select {...props} className={INPUT}>{children}</select>
    </label>
  );
}

export const Loading = () => <p className="animate-pulse py-10 text-center text-on-surface-variant">…</p>;

export const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="text-base font-semibold">{children}</h2>;

/** Initials in a circle. No photos yet, and a face cannot be faked this way. */
export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span aria-hidden style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="grid shrink-0 place-items-center rounded-full bg-primary-container font-semibold text-on-primary-container">
      {initials}
    </span>
  );
}

// ---- trades ----
const TRADE_ICONS: Record<string, LucideIcon> = {
  tailor: Shirt, electrician: Zap, plumber: Droplets, mechanic: Wrench, mason: BrickWall, carpenter: Hammer, hairdresser: Scissors,
};
export function TradeIcon({ trade, size = 20 }: { trade: string; size?: number }) {
  const Icon = TRADE_ICONS[trade] ?? Wrench;
  return <Icon size={size} strokeWidth={1.75} aria-hidden />;
}

// ---- trust tiers ----
// Inline styles use the --md-sys-* tokens directly: Tailwind inlines its own theme variables.
// One hue that gets stronger with each level, plus a different shape and glyph per level,
// so the level never depends on colour alone.
function blob(points: number, amp: number) {
  const R = 46 / (1 + amp);
  return Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * 2 * Math.PI, r = R * (1 + amp * Math.cos(points * a));
    return `${i ? "L" : "M"}${(50 + r * Math.sin(a)).toFixed(1)} ${(50 - r * Math.cos(a)).toFixed(1)}`;
  }).join("") + "Z";
}
const CIRCLE = blob(1, 0);
const TIERS: { name: Key; shape: string; fill: string; ink: string; Icon: LucideIcon; outline?: boolean }[] = [
  { name: "tier0", shape: CIRCLE, fill: "transparent", ink: "var(--md-sys-color-outline)", Icon: User, outline: true },
  { name: "tier1", shape: CIRCLE, fill: "var(--md-sys-color-primary-container)", ink: "var(--md-sys-color-on-primary-container)", Icon: Handshake },
  { name: "tier2", shape: blob(6, 0.08), fill: "var(--md-sys-color-primary)", ink: "var(--md-sys-color-on-primary)", Icon: Check },
  { name: "tier3", shape: blob(8, 0.12), fill: "var(--md-sys-color-primary)", ink: "var(--md-sys-color-gold)", Icon: Star },
];
export const tierName = (tier: number): Key => TIERS[tier].name;

export function TierBadge({ tier, size = 40, ghost }: { tier: number; size?: number; ghost?: boolean }) {
  const { t } = useApp();
  const { name, shape, fill, ink, Icon, outline } = TIERS[tier];
  return (
    <span role="img" aria-label={t(name)} className={`relative inline-grid shrink-0 place-items-center ${ghost ? "opacity-35" : ""}`}
      style={{ width: size, height: size, color: ink }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
        <path d={shape} fill={fill} stroke={outline ? "currentColor" : "none"} strokeWidth={outline ? 5 : 0} />
      </svg>
      <Icon size={size * 0.46} strokeWidth={2.5} className="relative" fill={tier === 3 ? "currentColor" : "none"} aria-hidden />
    </span>
  );
}

/** Badge and level name on one line, for cards and lists. */
export function TierChip({ tier }: { tier: number }) {
  const { t } = useApp();
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface">
      <TierBadge tier={tier} size={20} /> {t(tierName(tier))}
    </span>
  );
}

/** "34 jobs checked · at least 92% satisfied": the one honest line shown everywhere. */
export function TrustLine({ a }: { a: { verified_jobs: number; pct: number | null; up: number; down: number } }) {
  const { t } = useApp();
  return (
    <p className="text-sm text-on-surface-variant">
      <span className="font-medium text-on-surface">{t("jobsChecked", { n: a.verified_jobs })}</span>
      {" · "}
      {a.pct !== null ? <span className="font-medium text-primary">{t("satisfied", { n: a.pct })}</span>
        : a.up + a.down ? t("fewRatings", { up: a.up, n: a.up + a.down }) : t("notRated")}
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
