"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useApp } from "@/lib/app";
import { JobList } from "@/components/JobList";
import { Login } from "@/components/Login";
import { Title } from "@/components/Shell";
import { Button, ButtonLink, Card, Field, Loading, TradeIcon } from "@/components/ui";

// One distinct tile shape per trade: shape + pictogram + label, so it reads without the text.
const SHAPES = [
  "rounded-[40px]", "rounded-[56px_16px]", "rounded-[16px_56px]", "rounded-[56px_56px_16px_16px]",
  "rounded-[16px_16px_56px_56px]", "rounded-[56px_16px_56px_56px]", "rounded-[56px_56px_56px_16px]",
];

export default function Home() {
  const { t, ref, label, user } = useApp();
  const router = useRouter();
  const [id, setId] = useState("");

  return (
    <>
      <Title sub={t("heroSub")}>{t("hero")}</Title>

      {!ref ? <Loading /> : (
        <nav aria-label={t("pickTrade")} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ref.trades.map((tr, i) => (
            <Link key={tr.id} href={`/request/?trade=${tr.id}`}
              className={`press flex aspect-[4/3] flex-col items-center justify-center gap-2 ${SHAPES[i % SHAPES.length]} text-lg font-bold hover:brightness-95 ${
                i % 3 === 0 ? "bg-primary-fixed text-on-primary-fixed" : i % 3 === 1 ? "bg-secondary-fixed text-on-secondary-fixed" : "bg-tertiary-fixed text-on-tertiary-fixed"}`}>
              <TradeIcon trade={tr.id} size={40} />
              {label(tr)}
            </Link>
          ))}
        </nav>
      )}

      <Card>
        <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); if (id.trim()) router.push(`/p/?a=${id.trim()}`); }}>
          <div className="flex-1">
            <Field label={t("checkId")} inputMode="numeric" placeholder="100100" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <Button type="submit" variant="tonal" aria-label={t("check")}><Search size={20} aria-hidden /></Button>
        </form>
      </Card>

      {!user ? <Login /> : (
        <>
          {user.role === "artisan" && <ButtonLink href="/me/" className="w-full">{t("myWorkspace")} <ArrowRight size={18} aria-hidden /></ButtonLink>}
          {user.role === "agent" && <ButtonLink href="/agent/" className="w-full">{t("agentConsole")} <ArrowRight size={18} aria-hidden /></ButtonLink>}
          {user.role === "admin" && <ButtonLink href="/admin/" className="w-full">{t("adminConsole")} <ArrowRight size={18} aria-hidden /></ButtonLink>}
          <JobList />
        </>
      )}
    </>
  );
}
