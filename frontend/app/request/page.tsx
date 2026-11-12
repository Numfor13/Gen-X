"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock, MapPin, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Gate, Title } from "@/components/Shell";
import { Button, Choice, List, Loading, Notice, RowButton, TradeIcon } from "@/components/ui";

const URGENCY = [["now", Zap], ["today", Clock], ["week", CalendarDays]] as const;

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
      <div className="-ml-2 flex items-center gap-2">
        <Button variant="text" onClick={back} aria-label={t("back")} className="px-3!"><ArrowLeft size={20} aria-hidden /></Button>
        <div className="flex flex-1 gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1}>
          {[0, 1, 2, 3].map((i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-surface-highest"}`} />)}
        </div>
        <span className="text-sm tabular-nums text-on-surface-variant">{step + 1}/4</span>
      </div>

      {step === 0 && (
        <>
          <Title>{t("pickTrade")}</Title>
          <List>{ref.trades.map((x) => <RowButton key={x.id} icon={<TradeIcon trade={x.id} />} onClick={() => setTrade(x.id)}>{label(x)}</RowButton>)}</List>
        </>
      )}
      {step === 1 && (
        <>
          <Title sub={label(tr)}>{t("whatProblem")}</Title>
          <List>{tr!.problems.map((p) => <RowButton key={p.id} onClick={() => setProblem(p.id)}>{label(p)}</RowButton>)}</List>
        </>
      )}
      {step === 2 && (
        <>
          <Title sub={label(tr)}>{t("whichQuarter")}</Title>
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
          <List>
            {URGENCY.map(([u, Icon]) => (
              <RowButton key={u} disabled={busy} icon={<Icon size={20} aria-hidden />} onClick={() => submit(u)}>{t(`urgency_${u}`)}</RowButton>
            ))}
          </List>
        </>
      )}
      <Notice>{error}</Notice>
    </>
  );
}

export default function RequestPage() {
  return <Gate><Flow /></Gate>;
}
