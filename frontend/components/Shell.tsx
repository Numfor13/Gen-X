"use client";
import Link from "next/link";
import { Suspense } from "react";
import { CircleUserRound, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { setStored } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Login } from "./Login";
import { Loading } from "./ui";

export function Shell({ children }: { children: React.ReactNode }) {
  const { t, lang, user } = useApp();
  const action = "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container";
  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-0.5 border-b border-outline-variant/50 bg-surface px-4 py-2">
        <Link href="/" className="mr-auto flex items-center gap-1.5 text-lg font-bold tracking-tight">
          <ShieldCheck size={22} className="text-primary" aria-hidden />
          MySureGuy
        </Link>
        <Link href="/sim/" className={action} title={t("simulator")}>
          <Smartphone size={18} aria-hidden />
          <span className="max-sm:sr-only">{t("simulator")}</span>
        </Link>
        <button className={action} onClick={() => setStored("lang", lang === "en" ? "fr" : "en")}
          aria-label={lang === "en" ? "Passer en français" : "Switch to English"}>
          {lang === "en" ? "FR" : "EN"}
        </button>
        {user?.role === "artisan" && (
          <Link href="/me/" className={action} title={t("myProfile")}>
            <CircleUserRound size={18} aria-hidden />
            <span className="max-sm:sr-only">{t("myProfile")}</span>
          </Link>
        )}
        {user && (
          <button className={action} onClick={() => setStored("session", null)} title={t("logout")}>
            <span className="max-w-24 truncate">{user.name.split(" ")[0]}</span>
            <LogOut size={16} aria-label={t("logout")} />
          </button>
        )}
      </header>
      {/* pages read the query string, which needs a Suspense boundary in a static export */}
      <main className="flex-1 space-y-4 px-4 pb-10 pt-4"><Suspense fallback={<Loading />}>{children}</Suspense></main>
      <footer className="border-t border-outline-variant/50 px-4 py-4 text-center text-xs text-on-surface-variant">{t("demoNotice")}</footer>
    </div>
  );
}

/** Shows the page only to a logged-in user with one of `roles`; otherwise the login panel. */
export function Gate({ roles, children }: { roles?: string[]; children: React.ReactNode }) {
  const { t, user } = useApp();
  if (user && (!roles || roles.includes(user.role))) return <>{children}</>;
  return (
    <>
      <Title>{user ? t("wrongRole", { roles: roles!.join(", ") }) : t("loginFirst")}</Title>
      <Login only={roles} />
    </>
  );
}

export function Title({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-bold leading-tight tracking-tight">{children}</h1>
      {sub && <div className="mt-1 text-sm text-on-surface-variant">{sub}</div>}
    </div>
  );
}
