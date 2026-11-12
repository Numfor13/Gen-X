"use client";
import Link from "next/link";
import { Suspense } from "react";
import { LogOut, Smartphone } from "lucide-react";
import { setStored } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Login } from "./Login";
import { Loading, TierBadge } from "./ui";

export function Shell({ children }: { children: React.ReactNode }) {
  const { t, lang, user } = useApp();
  const pill = "press inline-flex min-h-10 items-center gap-1.5 px-3 text-sm font-semibold hover:bg-surface-container";
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4">
      <header className="flex items-center gap-1 py-3">
        <Link href="/" className="mr-auto flex items-center gap-2 text-xl font-extrabold tracking-tight text-primary">
          <TierBadge tier={3} size={32} />
          MySureGuy
        </Link>
        <Link href="/sim/" className={pill} title={t("simulator")}>
          <Smartphone size={18} aria-hidden />
          <span className="max-sm:sr-only">{t("simulator")}</span>
        </Link>
        <button className={pill} onClick={() => setStored("lang", lang === "en" ? "fr" : "en")}
          aria-label={lang === "en" ? "Passer en français" : "Switch to English"}>
          {lang === "en" ? "FR" : "EN"}
        </button>
        {user && (
          <button className={pill} onClick={() => setStored("session", null)} title={t("logout")}>
            <span className="max-w-24 truncate">{user.name.split(" ")[0]}</span>
            <LogOut size={16} aria-label={t("logout")} />
          </button>
        )}
      </header>
      {/* pages read the query string, which needs a Suspense boundary in a static export */}
      <main className="flex-1 space-y-4 pb-10"><Suspense fallback={<Loading />}>{children}</Suspense></main>
      <footer className="border-t border-outline-variant py-4 text-center text-xs text-on-surface-variant">{t("demoNotice")}</footer>
    </div>
  );
}

/** Shows the page only to a logged-in user with one of `roles`; otherwise the login panel. */
export function Gate({ roles, children }: { roles?: string[]; children: React.ReactNode }) {
  const { t, user } = useApp();
  if (user && (!roles || roles.includes(user.role))) return <>{children}</>;
  return (
    <>
      <h1 className="text-2xl font-bold">{user ? t("wrongRole", { roles: roles!.join(", ") }) : t("loginFirst")}</h1>
      <Login only={roles} />
    </>
  );
}

export function Title({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="pt-2">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{children}</h1>
      {sub && <div className="mt-1 text-on-surface-variant">{sub}</div>}
    </div>
  );
}
