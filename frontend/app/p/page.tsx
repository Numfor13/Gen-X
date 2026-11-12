"use client";
import { useSearchParams } from "next/navigation";
import { MapPin, Repeat, ThumbsDown, ThumbsUp, Users } from "lucide-react";
import { Artisan, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Qr } from "@/components/Qr";
import { ButtonLink, Card, Loading, NextStep, Notice, TierBadge, tierName, TradeIcon } from "@/components/ui";

function Profile() {
  const { t, label, trade, date, user } = useApp();
  const id = useSearchParams().get("a");
  const quarter = user?.quarter;
  const { data: a, error } = useApi<Artisan>(id && `/artisans/${id}${quarter ? `?quarter=${encodeURIComponent(quarter)}` : ""}`);

  if (error || !id) return <Notice>{error || t("noId")}</Notice>;
  if (!a) return <Loading />;

  return (
    <>
      <header className="flex items-center gap-4 pt-2">
        <TierBadge tier={a.tier} size={72} />
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight break-words">{a.name}</h1>
          <p className="flex flex-wrap items-center gap-x-3 font-medium text-on-surface-variant">
            <span className="flex items-center gap-1"><TradeIcon trade={a.trade} size={18} /> {label(trade(a.trade))}</span>
            <span className="flex items-center gap-1"><MapPin size={16} aria-hidden /> {a.quarter}</span>
          </p>
          <p className="text-sm text-on-surface-variant">ID {a.id} · {t("since", { d: date(a.since) })}</p>
        </div>
      </header>

      {!a.available && <Notice kind="info">{t("busyNow")}</Notice>}

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-tertiary-fixed! text-on-tertiary-fixed">
          <p className="text-4xl font-extrabold">{a.verified_jobs}</p>
          <p className="font-semibold">{t("jobsCheckedLabel")}</p>
          <p className="mt-1 text-xs">{t("jobsCheckedNote")}</p>
        </Card>
        <Card className="bg-secondary-fixed! text-on-secondary-fixed">
          <p className="text-4xl font-extrabold">{a.pct === null ? "–" : `${a.pct}%`}</p>
          <p className="font-semibold">{t("satisfiedLabel")}</p>
          <p className="mt-1 flex items-center gap-2 text-xs">
            <ThumbsUp size={14} aria-label={t("thumbsUp")} /> {a.up} <ThumbsDown size={14} aria-label={t("thumbsDown")} /> {a.down} · {t("conservative")}
          </p>
        </Card>
      </div>

      <Card className="space-y-2">
        <p className="flex items-center gap-2"><Users size={18} aria-hidden /> {t("customers", { n: a.customers })}</p>
        <p className="flex items-center gap-2"><Repeat size={18} aria-hidden /> {t("cameBack", { n: a.repeat })}</p>
        {!!a.neighbours && <p className="flex items-center gap-2 font-semibold text-secondary"><MapPin size={18} aria-hidden /> {t("neighbours", { n: a.neighbours, q: quarter! })}</p>}
        {!!a.tags?.length && (
          <p className="flex flex-wrap gap-2 pt-1">
            {a.tags.map(([tag, n]) => <span key={tag} className="rounded-full bg-surface-highest px-3 py-1 text-sm font-medium">{t(`tag_${tag}` as Key)} · {n}</span>)}
          </p>
        )}
      </Card>

      <Card>
        <h2 className="text-xl font-bold">{t("trustLevel")}: {t(tierName(a.tier))}</h2>
        <ol className="my-3 flex items-end justify-between">
          {[0, 1, 2, 3].map((tier) => (
            <li key={tier} className="flex w-1/4 flex-col items-center gap-1 text-center text-xs font-semibold" aria-current={tier === a.tier ? "step" : undefined}>
              <TierBadge tier={tier} size={tier === a.tier ? 56 : 40} ghost={tier > a.tier} />
              <span className={tier === a.tier ? "text-on-surface" : "text-on-surface-variant"}>{t(tierName(tier))}</span>
            </li>
          ))}
        </ol>
        <NextStep a={a} />
        {/* say exactly what each badge means: a vague "vetted" label is worth nothing */}
        <details className="mt-3 text-sm">
          <summary className="min-h-10 cursor-pointer font-semibold text-primary">{t("howWeCheck")}</summary>
          <ul className="mt-1 space-y-1 text-on-surface-variant">
            {[0, 1, 2, 3].map((tier) => <li key={tier}><strong className="text-on-surface">{t(tierName(tier))}:</strong> {t(`tierMeans${tier}` as Key)}</li>)}
            <li>{t("neverPaid")}</li>
          </ul>
        </details>
      </Card>

      <Card>
        <h2 className="mb-2 text-xl font-bold">{t("vouchedBy", { n: a.vouches!.length })}</h2>
        {!a.vouches!.length && <p className="text-on-surface-variant">{t("noVouches")}</p>}
        <ul className="space-y-3">
          {a.vouches!.map((v) => (
            <li key={v.voucher_name + v.ts}>
              <p className="font-semibold">{v.voucher_name}</p>
              <p className="text-sm">“{v.reason}”</p>
              <p className="text-xs text-on-surface-variant">{t(`circle_${v.circle}` as Key)} · {t(`relation_${v.relation}` as Key)} · {date(v.ts)}</p>
            </li>
          ))}
        </ul>
      </Card>

      {!!a.reviews?.length && (
        <Card>
          <h2 className="mb-2 text-xl font-bold">{t("recentJobs")}</h2>
          <ul className="divide-y divide-outline-variant">
            {a.reviews.map((r, i) => (
              <li key={i} className="flex items-start gap-3 py-2">
                {r.thumb === "up" ? <ThumbsUp className="mt-1 text-secondary" size={20} aria-label={t("thumbsUp")} /> : <ThumbsDown className="mt-1 text-error" size={20} aria-label={t("thumbsDown")} />}
                <div>
                  <p className="font-medium">{label(trade(a.trade)?.problems.find((p) => p.id === r.problem))}</p>
                  {!!r.tags.length && <p className="text-sm">{r.tags.map((tag) => t(`tag_${tag}` as Key)).join(" · ")}</p>}
                  <p className="text-xs text-on-surface-variant">{t("verifiedJob")} · {r.quarter} · {date(r.ts)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="flex items-center gap-4">
        <Qr artisanId={a.id} />
        <div>
          <p className="text-sm text-on-surface-variant">{t("scanToCheck")}</p>
          <p className="text-2xl font-extrabold tracking-widest">{a.id}</p>
          <p className="text-sm text-on-surface-variant">{t("orDial")}</p>
        </div>
      </Card>

      {a.tier >= 1 && a.available && <ButtonLink href={`/request/?trade=${a.trade}`} className="w-full">{t("requestTrade", { trade: label(trade(a.trade)) })}</ButtonLink>}
    </>
  );
}

export default function ProfilePage() {
  return <Profile />;
}
