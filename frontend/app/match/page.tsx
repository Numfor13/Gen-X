"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MapPin, Sprout, Users } from "lucide-react";
import { api, Artisan, Job, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Gate, Title } from "@/components/Shell";
import { Avatar, Button, ButtonLink, Card, Loading, Notice, TierChip, TrustLine } from "@/components/ui";

type Matches = { request: { id: string; trade: string; problem: string; quarter: string; job_id?: string }; band: [number, number]; matches: Artisan[] };

function Results() {
  const { t, label, trade, money } = useApp();
  const router = useRouter();
  const req = useSearchParams().get("req");
  const { data, error } = useApi<Matches>(req && `/requests/${req}/matches`);
  const [bookError, setBookError] = useState("");
  const [busy, setBusy] = useState(false);

  if (error) return <Notice>{error}</Notice>;
  if (!data) return <Loading />;
  const { request, band, matches } = data;
  const tr = trade(request.trade);
  const book = (artisan_id: string) => {
    setBusy(true);
    api<Job>("/jobs", { request_id: request.id, artisan_id })
      .then((job) => router.push(`/job/?id=${job.id}`))
      .catch((e: Error) => { setBookError(e.message); setBusy(false); });
  };

  return (
    <>
      <Title sub={`${label(tr?.problems.find((p) => p.id === request.problem))} · ${request.quarter}`}>
        {matches.length ? t("matchTitle", { n: matches.length }) : t("noMatch")}
      </Title>

      <div className="rounded-2xl bg-surface-low px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">{t("fairPrice")}</p>
        <p className="text-xl font-bold">{money(band)}</p>
        <p className="text-sm text-on-surface-variant">{t("fairPriceNote")}</p>
      </div>

      {request.job_id && <ButtonLink href={`/job/?id=${request.job_id}`} size="lg" className="w-full">{t("alreadyBooked")}</ButtonLink>}
      {!matches.length && <ButtonLink href="/request/" variant="tonal" className="w-full">{t("tryAgain")}</ButtonLink>}
      <Notice>{bookError}</Notice>

      {matches.map((a) => (
        <Card key={a.id} className="space-y-3">
          <div className="flex items-center gap-3">
            <Avatar name={a.name} />
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold leading-tight">{a.name}</h2>
              <TierChip tier={a.tier} />
            </div>
          </div>
          <TrustLine a={a} />
          {/* why this match: every reason is a fact the customer can check */}
          <ul className="space-y-1.5 border-t border-outline-variant/50 pt-3 text-sm text-on-surface-variant">
            <li className="flex items-center gap-2"><MapPin size={16} aria-hidden />
              {a.quarter === request.quarter ? t("inYourQuarter", { q: a.quarter }) : t("kmAway", { q: a.quarter, km: a.km! })}</li>
            {!!a.neighbours && <li className="flex items-center gap-2"><Users size={16} aria-hidden />{t("neighbours", { n: a.neighbours, q: request.quarter })}</li>}
            {a.newcomer && <li className="flex items-center gap-2"><Sprout size={16} aria-hidden />{t("newcomer")}</li>}
          </ul>
          {!request.job_id && (
            <div className="grid grid-cols-2 gap-2">
              <ButtonLink variant="outline" href={`/p/?a=${a.id}`}>{t("seeProfile")}</ButtonLink>
              <Button disabled={busy} onClick={() => book(a.id)}>{t("book")}</Button>
            </div>
          )}
        </Card>
      ))}
    </>
  );
}

export default function MatchPage() {
  return <Gate><Results /></Gate>;
}
