"use client";
import { useState } from "react";
import { api, Artisan, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import { JobList } from "@/components/JobList";
import { Qr } from "@/components/Qr";
import { Gate, Title } from "@/components/Shell";
import { ButtonLink, Card, Loading, NextStep, Notice, TierBadge, tierName, TradeIcon, TrustLine } from "@/components/ui";

const BAND = ["bg-surface-highest text-on-surface", "bg-secondary text-on-secondary", "bg-tertiary text-on-tertiary", "bg-primary text-on-primary"];

function Workspace() {
  const { t, label, trade } = useApp();
  const { data, error, reload } = useApi<{ artisan: Artisan }>("/me");
  const [toggleError, setToggleError] = useState("");
  if (error) return <Notice>{error}</Notice>;
  if (!data) return <Loading />;
  const a = data.artisan;
  const toggle = () => api("/me/available", { available: !a.available }).then(reload).catch((e: Error) => setToggleError(e.message));

  return (
    <>
      <Title sub={<TrustLine a={a} />}>{a.name}</Title>

      <button role="switch" aria-checked={a.available} onClick={toggle}
        className={`press flex min-h-20 w-full items-center justify-between px-6 text-left text-xl font-bold ${a.available ? "bg-secondary text-on-secondary" : "bg-surface-highest text-on-surface-variant"}`}>
        {a.available ? t("available") : t("busy")}
        <span className={`flex h-9 w-16 items-center rounded-full bg-black/20 p-1 ${a.available ? "justify-end" : ""}`}>
          <span className="size-7 rounded-full bg-white" />
        </span>
      </button>
      <Notice>{toggleError}</Notice>

      <JobList />

      {/* badge card: credit-card ratio so an agent can print and laminate it */}
      <Card className="aspect-[85.6/54] overflow-hidden p-0!">
        <div className={`flex items-center gap-2 px-5 py-2 font-bold ${BAND[a.tier]}`}>
          <span className="mr-auto">MySureGuy</span> {t(tierName(a.tier))}
        </div>
        <div className="flex items-center gap-4 p-5">
          <div className="min-w-0 flex-1 space-y-1">
            <TierBadge tier={a.tier} size={48} />
            <p className="truncate text-2xl font-extrabold">{a.name}</p>
            <p className="flex items-center gap-1 font-medium text-on-surface-variant"><TradeIcon trade={a.trade} size={18} /> {label(trade(a.trade))} · {a.quarter}</p>
          </div>
          <div className="text-center">
            <Qr artisanId={a.id} size={104} />
            <p className="font-extrabold tracking-widest">{a.id}</p>
            <p className="text-xs text-on-surface-variant">{t("scanToCheck")}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-2">
        <h2 className="text-xl font-bold">{t("trustLevel")}: {t(tierName(a.tier))}</h2>
        <NextStep a={a} />
        <ButtonLink variant="outline" href={`/p/?a=${a.id}`} className="w-full">{t("seePublicProfile")}</ButtonLink>
      </Card>
    </>
  );
}

export default function MePage() {
  return <Gate roles={["artisan"]}><Workspace /></Gate>;
}
