"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Banknote, Hammer, Handshake, KeyRound, LayoutDashboard, Search } from "lucide-react";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { JobList } from "@/components/JobList";
import { Login } from "@/components/Login";
import { Button, ButtonLink, Card, Field, H2, List, Loading, RowLink, TradeIcon } from "@/components/ui";

const PROMISES: [typeof KeyRound, Key][] = [[KeyRound, "promise1"], [Handshake, "promise2"], [Banknote, "promise3"]];
const CONSOLES = { artisan: ["/me/", "myProfile"], agent: ["/agent/", "agentConsole"], admin: ["/admin/", "adminConsole"] } as const;

export default function Home() {
  const { t, ref, label, user } = useApp();
  const router = useRouter();
  const [id, setId] = useState("");
  const mine = user && user.role !== "customer" ? CONSOLES[user.role] : null;

  return (
    <>
      <div className="pt-2">
        <h1 className="text-[28px] font-bold leading-9 tracking-tight">{t("hero")}</h1>
        <p className="mt-2 text-on-surface-variant">{t("heroSub")}</p>
      </div>

      {/* what makes this different, stated once and plainly */}
      <ul className="grid grid-cols-3 gap-2 rounded-2xl bg-surface-low p-3 text-center text-xs font-medium text-on-surface-variant">
        {PROMISES.map(([Icon, key]) => (
          <li key={key} className="flex flex-col items-center gap-1.5"><Icon size={20} className="text-primary" aria-hidden />{t(key)}</li>
        ))}
      </ul>

      {mine && (
        <List><RowLink href={mine[0]} icon={<LayoutDashboard size={20} aria-hidden />}>{t(mine[1])}</RowLink></List>
      )}
      <H2>{t("pickTrade")}</H2>
      {!ref ? <Loading /> : (
        <List>
          {ref.trades.map((tr) => (
            <RowLink key={tr.id} href={`/request/?trade=${tr.id}`} icon={<TradeIcon trade={tr.id} />}>{label(tr)}</RowLink>
          ))}
        </List>
      )}

      {(!user || user.role === "customer") && (
        <Card className="flex items-center gap-3 border-transparent bg-primary-container text-on-primary-container">
          <Hammer size={28} className="shrink-0" aria-hidden />
          <div className="flex-1">
            <p className="font-semibold">{t("joinCtaTitle")}</p>
            <p className="text-sm">{t("joinCtaSub")}</p>
          </div>
          <ButtonLink href="/join/" className="shrink-0">{t("joinCta")}</ButtonLink>
        </Card>
      )}

      {user && <JobList />}

      <Card>
        <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); if (id.trim()) router.push(`/p/?a=${id.trim()}`); }}>
          <div className="flex-1">
            <Field label={t("checkId")} inputMode="numeric" placeholder="100100" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <Button type="submit" variant="tonal" aria-label={t("check")}><Search size={20} aria-hidden /></Button>
        </form>
      </Card>

      {!user && <Login />}
    </>
  );
}
