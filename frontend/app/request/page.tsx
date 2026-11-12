"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock, Flame, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Gate, Title } from "@/components/Shell";
import { Button, Choice, Loading, Notice, TradeIcon } from "@/components/ui";

const URGENCY = [["now", Flame], ["today", Clock], ["week", CalendarDays]] as const;

function Flow() {
  const { t, ref, label, trade: tradeOf, user } = useApp();
  const router = useRouter();
  const [trade, setTrade] = useState(useSearchParams().get("trade") ?? "");
  const [problem, setProblem] = useState("");
  const [quarter, setQuarter] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!ref) return <Loading />;
  const tr = tradeOf(trade);
  // one question per screen; the step is whatever is still unanswered
  const step = !tr ? 0 : !problem ? 1 : !quarter ? 2 : 3;
  const back = [() => router.push("/"), () => setTrade(""), () => setProblem(""), () => setQuarter("")][step];
  const submit = (urgency: string) => {
    setBusy(true);
    api<{ id: string }>("/requests", { trade, problem, quarter, urgency })
      .then((r) => router.push(`/match/?req=${r.id}`))
      .catch((e: Error) => { setError(e.message); setBusy(false); });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="text" onClick={back} aria-label={t("back")} className="px-3!"><ArrowLeft size={20} aria-hidden /></Button>
        <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1}>
          {[0, 1, 2, 3].map((i) => <span key={i} className={`h-2 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-surface-highest"}`} />)}
        </div>
      </div>

      {step === 0 && (
        <>
          <Title>{t("pickTrade")}</Title>
          <div className="grid gap-2">
            {ref.trades.map((x) => <Choice key={x.id} className="min-h-16 text-lg" onClick={() => setTrade(x.id)}><TradeIcon trade={x.id} /> {label(x)}</Choice>)}
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <Title sub={label(tr)}>{t("whatProblem")}</Title>
          <div className="grid gap-2">
            {tr!.problems.map((p) => <Choice key={p.id} className="min-h-16 text-lg" onClick={() => setProblem(p.id)}>{label(p)}</Choice>)}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <Title>{t("whichQuarter")}</Title>
          <div className="flex flex-wrap gap-2">
            {[...ref.quarters].sort((a, b) => +(b === user?.quarter) - +(a === user?.quarter)).map((q) => (
              <Choice key={q} onClick={() => setQuarter(q)}><MapPin size={16} aria-hidden /> {q}</Choice>
            ))}
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <Title sub={`${label(tr)} · ${quarter}`}>{t("howUrgent")}</Title>
          <div className="grid gap-2">
            {URGENCY.map(([u, Icon]) => (
              <Choice key={u} disabled={busy} className="min-h-16 text-lg" onClick={() => submit(u)}><Icon size={22} aria-hidden /> {t(`urgency_${u}`)}</Choice>
            ))}
          </div>
        </>
      )}
      <Notice>{error}</Notice>
    </>
  );
}

export default function RequestPage() {
  return <Gate><Flow /></Gate>;
}
