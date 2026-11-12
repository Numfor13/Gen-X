"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, Lock, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";
import { api, Job, Rating, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Gate, Title } from "@/components/Shell";
import { Button, ButtonLink, Card, Choice, Loading, Notice } from "@/components/ui";

const TAGS = {
  customer: ["on_time", "price_kept", "clean", "respectful", "hire_again"],
  artisan: ["paid_as_agreed", "respectful", "safe_site"],
};
const STEPS = ["booked", "in_progress", "completed"] as const;

function Stars({ r, who }: { r: Rating; who: string }) {
  const { t } = useApp();
  return (
    <div className="flex items-start gap-3">
      {r.thumb === "up" ? <ThumbsUp className="text-primary" aria-label={t("thumbsUp")} /> : <ThumbsDown className="text-error" aria-label={t("thumbsDown")} />}
      <div>
        <p className="font-semibold">{who}</p>
        {!!r.tags.length && <p className="text-sm">{r.tags.map((tag) => t(`tag_${tag}` as Key)).join(" · ")}</p>}
      </div>
    </div>
  );
}

function RateForm({ job, onSubmit }: { job: Job; onSubmit: (thumb: string, tags: string[]) => void }) {
  const { t } = useApp();
  const [thumb, setThumb] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const other = job.side === "customer" ? job.artisan_name : job.customer_name;
  const pick = (v: string) => { navigator.vibrate?.(30); setThumb(v); if (v === "down") setTags([]); };
  return (
    <Card className="space-y-4">
      <h2 className="text-base font-semibold">{t("rateTitle", { name: other })}</h2>
      <div className="grid grid-cols-2 gap-3">
        <Choice selected={thumb === "up"} onClick={() => pick("up")} className="min-h-20 justify-center rounded-2xl" aria-label={t("thumbsUp")}><ThumbsUp size={32} aria-hidden /></Choice>
        <Choice selected={thumb === "down"} onClick={() => pick("down")} className="min-h-20 justify-center rounded-2xl" aria-label={t("thumbsDown")}><ThumbsDown size={32} aria-hidden /></Choice>
      </div>
      {thumb === "up" && (
        <div className="flex flex-wrap gap-2">
          {TAGS[job.side].map((tag) => (
            <Choice key={tag} selected={tags.includes(tag)} onClick={() => setTags(tags.includes(tag) ? tags.filter((x) => x !== tag) : [...tags, tag])}>
              {t(`tag_${tag}` as Key)}
            </Choice>
          ))}
        </div>
      )}
      <p className="text-sm text-on-surface-variant">{t("blindNote")}</p>
      <Button size="lg" className="w-full" disabled={!thumb} onClick={() => onSubmit(thumb, tags)}>{t("sendRating")}</Button>
    </Card>
  );
}

function JobView() {
  const { t, label, trade, money } = useApp();
  const id = useSearchParams().get("id");
  const { data: job, error, set } = useApi<Job>(id && `/jobs/${id}`, 4000);
  const [actError, setActError] = useState("");
  const [code, setCode] = useState("");

  if (error) return <Notice>{error}</Notice>;
  if (!job) return <Loading />;
  const mine = job.side === "customer";
  const act = (path: string, body: unknown = {}) => {
    setActError("");
    api<Job>(`/jobs/${job.id}/${path}`, body).then(set).catch((e: Error) => setActError(e.message));
  };
  const stepIndex = STEPS.indexOf(job.status as (typeof STEPS)[number]);
  const myRating = job.reviews[job.side];
  const theirRating = job.reviews[mine ? "artisan" : "customer"];

  return (
    <>
      <Title sub={`${label(trade(job.trade)?.problems.find((p) => p.id === job.problem))} · ${job.quarter}`}>
        {mine ? job.artisan_name : job.customer_name}
      </Title>

      <ol className="flex gap-1">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === stepIndex ? "step" : undefined}
            className={`flex-1 border-t-4 pt-1.5 text-xs font-semibold ${i <= stepIndex ? "border-primary text-on-surface" : "border-surface-highest text-on-surface-variant"}`}>
            {t(`status_${s}`)}
          </li>
        ))}
      </ol>

      {job.status === "locked" && <Notice><Lock size={16} className="mr-1 inline" aria-hidden />{t("jobLocked")}</Notice>}

      {job.status === "booked" && mine && (
        <Card className="space-y-3 border-transparent! bg-primary-container! text-center text-on-primary-container">
          <p className="font-semibold">{t("yourCode")}</p>
          <p className="flex justify-center gap-2" aria-label={job.code!.split("").join(" ")}>
            {job.code!.split("").map((d, i) => (
              <span key={i} aria-hidden style={{ animationDelay: `${i * 90}ms` }}
                className="pop grid h-20 w-16 place-items-center rounded-xl bg-surface-lowest text-5xl font-bold text-primary">{d}</span>
            ))}
          </p>
          <p className="font-medium">{t("codeRule", { name: job.artisan_name })}</p>
          <p className="text-sm">{t("codeNever")}</p>
        </Card>
      )}

      {job.status === "booked" && !mine && (
        <Card>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); act("start", { code }); setCode(""); }}>
            <h2 className="text-base font-semibold">{t("enterCode", { name: job.customer_name })}</h2>
            <input inputMode="numeric" pattern="\d{4}" maxLength={4} required value={code} aria-label={t("jobCode")}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="block h-20 w-full rounded-xl border border-outline bg-surface-lowest text-center text-5xl font-bold tracking-[0.5em] focus:outline-2 focus:outline-primary" />
            {job.attempts_left < 5 && <p className="text-sm font-semibold text-error">{t("triesLeft", { n: job.attempts_left })}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={code.length !== 4}>{t("confirmArrival")}</Button>
          </form>
        </Card>
      )}

      {job.status === "in_progress" && (
        <Card className="space-y-3">
          <p className="flex items-center gap-2 text-lg font-bold text-primary"><ShieldCheck aria-hidden /> {t("codeConfirmed")}</p>
          <p className="text-sm text-on-surface-variant">{t("fairPrice")}: <strong className="text-on-surface">{money(job.band)}</strong></p>
          {mine
            ? <Button size="lg" className="w-full" onClick={() => act("complete")}><Check size={20} aria-hidden /> {t("workDone")}</Button>
            : <p>{t("waitCustomer", { name: job.customer_name })}</p>}
        </Card>
      )}

      {job.status === "completed" && !myRating && <RateForm job={job} onSubmit={(thumb, tags) => act("review", { thumb, tags })} />}

      {job.status === "completed" && myRating && (
        <Card className="space-y-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary"><ShieldCheck size={18} aria-hidden /> {t("verifiedJob")}</p>
          <Stars r={myRating} who={t("yourRating")} />
          {theirRating
            ? <Stars r={theirRating} who={t("theirRating", { name: mine ? job.artisan_name : job.customer_name })} />
            : <Notice kind="info">{t("waitingReveal")}</Notice>}
        </Card>
      )}

      <Notice>{actError}</Notice>
      <div className="grid gap-2">
        {mine && <ButtonLink variant="outline" href={`/p/?a=${job.artisan_id}`}>{t("seeProfile")}</ButtonLink>}
        <ButtonLink variant="text" href={mine ? "/" : "/me/"}>{t("backToJobs")}</ButtonLink>
      </div>
    </>
  );
}

export default function JobPage() {
  return <Gate><JobView /></Gate>;
}
