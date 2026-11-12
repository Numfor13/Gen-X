"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { api, Artisan, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import { JobList } from "@/components/JobList";
import { Qr } from "@/components/Qr";
import { Gate, Title } from "@/components/Shell";
import { ButtonLink, Card, H2, Loading, NextStep, Notice, TierBadge, TierChip, tierName, TrustLine } from "@/components/ui";

/** The checks a new artisan still has to pass before customers can rely on them. */
function Checklist({ a }: { a: Artisan }) {
  const { t } = useApp();
  const circles = new Set(a.vouches?.map((v) => v.circle)).size;
  const items: [boolean, string, string?][] = [
    [true, t("checkPhone")],
    [a.vouch_count >= 2 && circles >= 2, t("checkVouches", { n: a.vouch_count }), t("checkVouchesHow")],
    [a.verified_jobs >= 3, t("checkJobs", { n: Math.min(a.verified_jobs, 3) }), t("checkJobsHow")],
  ];
  return (
    <Card className="space-y-3">
      <H2>{t("yourChecks")}</H2>
      {a.tier === 0 && <Notice kind="info">{t("notBookable")}</Notice>}
      <ol className="space-y-3">
        {items.map(([done, title, how], i) => (
          <li key={i} className="flex gap-3">
            <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${done
              ? "bg-primary text-on-primary" : "border border-outline text-on-surface-variant"}`}>
              {done ? <Check size={14} strokeWidth={3} aria-label={t("done")} /> : i + 1}
            </span>
            <div className="text-sm">
              <p className={done ? "text-on-surface-variant line-through" : "font-medium"}>{title}</p>
              {!done && how && <p className="text-on-surface-variant">{how}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Workspace() {
  const { t, label, trade } = useApp();
  const welcome = useSearchParams().get("welcome");
  const { data, error, reload } = useApi<{ artisan: Artisan }>("/me");
  const [toggleError, setToggleError] = useState("");
  if (error) return <Notice>{error}</Notice>;
  if (!data) return <Loading />;
  const a = data.artisan;
  const toggle = () => api("/me/available", { available: !a.available }).then(reload).catch((e: Error) => setToggleError(e.message));

  return (
    <>
      <Title sub={<TrustLine a={a} />}>{a.name}</Title>

      {welcome && <Notice kind="info">{t("welcomeArtisan", { id: a.id })}</Notice>}
      {a.tier < 2 && <Checklist a={a} />}

      <Card className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-semibold">{a.available ? t("available") : t("busy")}</p>
          <p className="text-sm text-on-surface-variant">{!a.available ? t("busyNote") : a.tier === 0 ? t("availableNotYet") : t("availableNote")}</p>
        </div>
        <button role="switch" aria-checked={a.available} aria-label={t("available")} onClick={toggle}
          className={`flex h-8 w-[52px] shrink-0 items-center rounded-full border-2 p-0.5 transition-colors ${a.available ? "justify-end border-primary bg-primary" : "border-outline bg-surface-highest"}`}>
          <span className={`rounded-full transition-all ${a.available ? "size-6 bg-on-primary" : "ml-1 size-4 bg-outline"}`} />
        </button>
      </Card>
      <Notice>{toggleError}</Notice>

      <JobList />

      <H2>{t("myBadge")}</H2>
      {/* credit-card ratio so an agent can print and laminate it */}
      <div className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-lowest">
        <div className="flex items-center gap-1.5 bg-primary px-4 py-2 text-sm font-semibold text-on-primary">
          <ShieldCheck size={18} aria-hidden /><span className="mr-auto">MySureGuy</span>{t("scanToCheck")}
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="min-w-0 flex-1 space-y-1.5">
            <TierChip tier={a.tier} />
            <p className="truncate text-xl font-bold leading-tight">{a.name}</p>
            <p className="text-sm text-on-surface-variant">{label(trade(a.trade))} · {a.quarter}</p>
            <p className="font-mono text-lg font-semibold tracking-widest">{a.id}</p>
          </div>
          <Qr artisanId={a.id} size={104} />
        </div>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center gap-3">
          <TierBadge tier={a.tier} size={44} />
          <div>
            <p className="font-semibold">{t("trustLevel")}: {t(tierName(a.tier))}</p>
            <NextStep a={a} />
          </div>
        </div>
        <ButtonLink variant="outline" href={`/p/?a=${a.id}`} className="w-full">{t("seePublicProfile")}</ButtonLink>
      </Card>
    </>
  );
}

export default function MePage() {
  return <Gate roles={["artisan"]}><Workspace /></Gate>;
}
