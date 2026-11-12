"use client";
import Link from "next/link";
import { useState } from "react";
import { api, Artisan, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Gate, Title } from "@/components/Shell";
import { Button, Card, Field, Loading, NextStep, Notice, Select, TierBadge } from "@/components/ui";

/** Reads a form into a plain object and posts it. */
function useForm(path: string, onDone: () => void, extra: Record<string, string> = {}) {
  const [error, setError] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");
    api(path, { ...Object.fromEntries(new FormData(form)), ...extra })
      .then(() => { form.reset(); onDone(); })
      .catch((er: Error) => setError(er.message));
  };
  return { error, onSubmit };
}

function VouchForm({ artisan, onDone }: { artisan: Artisan; onDone: () => void }) {
  const { t } = useApp();
  const { error, onSubmit } = useForm("/agent/vouches", onDone, { artisan_id: artisan.id });
  return (
    <form onSubmit={onSubmit} className="mt-3 space-y-3 border-t border-outline-variant pt-3">
      <Field name="voucher_name" label={t("voucherName")} required />
      <Field name="voucher_phone" label={t("voucherPhone")} type="tel" defaultValue="+237" required />
      <div className="grid grid-cols-2 gap-2">
        <Select name="circle" label={t("circle")}>
          <option value="trade">{t("circle_trade")}</option>
          <option value="community">{t("circle_community")}</option>
        </Select>
        <Select name="relation" label={t("relation")}>
          <option value="trained">{t("relation_trained")}</option>
          <option value="hired">{t("relation_hired")}</option>
          <option value="quarter">{t("relation_quarter")}</option>
        </Select>
      </div>
      <Field name="reason" label={t("vouchReason")} required maxLength={140} />
      <p className="text-sm text-on-surface-variant">{t("vouchWarning")}</p>
      <Notice>{error}</Notice>
      <Button type="submit" className="w-full">{t("recordVouch")}</Button>
    </form>
  );
}

function Console() {
  const { t, ref, label, trade } = useApp();
  const { data: artisans, error, reload } = useApi<Artisan[]>("/agent/artisans");
  const [open, setOpen] = useState("");
  const register = useForm("/agent/artisans", reload);
  if (error) return <Notice>{error}</Notice>;
  if (!artisans || !ref) return <Loading />;

  return (
    <>
      <Title sub={t("agentSub")}>{t("agentConsole")}</Title>

      <Card>
        <form onSubmit={register.onSubmit} className="space-y-3">
          <h2 className="text-base font-semibold">{t("registerArtisan")}</h2>
          <Field name="name" label={t("fullName")} required />
          <Field name="phone" label={t("phone")} type="tel" defaultValue="+237" required />
          <div className="grid grid-cols-2 gap-2">
            <Select name="trade" label={t("tradeLabel")}>{ref.trades.map((x) => <option key={x.id} value={x.id}>{label(x)}</option>)}</Select>
            <Select name="quarter" label={t("quarter")}>{ref.quarters.map((q) => <option key={q}>{q}</option>)}</Select>
          </div>
          <Notice>{register.error}</Notice>
          <Button type="submit" className="w-full">{t("register")}</Button>
        </form>
      </Card>

      <h2 className="pt-2 text-base font-semibold">{t("allArtisans", { n: artisans.length })}</h2>
      {artisans.map((a) => (
        <Card key={a.id}>
          <div className="flex items-center gap-3">
            <TierBadge tier={a.tier} size={36} />
            <div className="min-w-0 flex-1">
              <Link href={`/p/?a=${a.id}`} className="block truncate font-bold underline-offset-2 hover:underline">{a.name}</Link>
              <p className="truncate text-sm text-on-surface-variant">{label(trade(a.trade))} · {a.quarter} · ID {a.id} · {t("vouchCount", { n: a.vouch_count })}</p>
              <NextStep a={a} />
            </div>
            <Button variant={open === a.id ? "tonal" : "outline"} onClick={() => setOpen(open === a.id ? "" : a.id)} aria-expanded={open === a.id}>{t("vouch")}</Button>
          </div>
          {open === a.id && <VouchForm artisan={a} onDone={() => { setOpen(""); reload(); }} />}
        </Card>
      ))}
    </>
  );
}

export default function AgentPage() {
  return <Gate roles={["agent"]}><Console /></Gate>;
}
