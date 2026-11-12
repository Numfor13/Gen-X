"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import { Title } from "@/components/Shell";
import { Button, Card, Field } from "@/components/ui";

const PHONE_OK = /^\+\d{9,15}$/;

/** A basic-phone handset that posts the same form a real USSD aggregator would. */
function Ussd({ phone }: { phone: string }) {
  const { t } = useApp();
  const [path, setPath] = useState<string[] | null>(null); // null = not dialled yet
  const [screen, setScreen] = useState("");
  const [input, setInput] = useState("");
  const ended = screen.startsWith("END");

  const send = (next: string[]) => {
    setInput("");
    api<string>("/ussd", { sessionId: "sim", serviceCode: "*237#", phoneNumber: phone, text: next.join("*") }, true)
      .then((reply) => { setScreen(reply); setPath(reply.startsWith("END") ? null : next); })
      .catch((e: Error) => { setScreen("END " + e.message); setPath(null); });
  };

  return (
    <div className="mx-auto w-64 rounded-[36px] bg-on-surface p-4 text-surface">
      <pre aria-live="polite" className="min-h-48 whitespace-pre-wrap rounded-2xl bg-secondary-fixed p-3 font-mono text-sm text-on-secondary-fixed">
        {screen ? screen.slice(4) : t("ussdIdle")}
      </pre>
      <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); send(path === null ? [] : [...path, input]); }}>
        {path !== null && !ended && (
          <input autoFocus inputMode="numeric" required value={input} onChange={(e) => setInput(e.target.value)} aria-label={t("ussdReply")}
            className="block h-12 w-full rounded-xl bg-surface px-3 text-center font-mono text-xl text-on-surface" />
        )}
        <Button type="submit" variant="tonal" className="w-full" disabled={!PHONE_OK.test(phone)}>{path === null ? t("ussdDial") : t("ussdSend")}</Button>
      </form>
    </div>
  );
}

function Sim() {
  const { t, user, lang } = useApp();
  const [typed, setTyped] = useState(useSearchParams().get("phone"));
  const phone = (typed ?? user?.phone ?? "+237670000001").replace(/\s/g, "");
  const { data: inbox } = useApi<{ text: string; ts: number }[]>(PHONE_OK.test(phone) ? `/sim/inbox?phone=${encodeURIComponent(phone)}` : null, 3000);

  return (
    <>
      <Title sub={t("simSub")}>{t("simulator")}</Title>
      <Card><Field label={t("simPhone")} type="tel" value={phone} onChange={(e) => setTyped(e.target.value)} /></Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="mb-3 text-xl font-bold">USSD *237#</h2>
          <Ussd key={phone} phone={phone} />
        </Card>
        <Card>
          <h2 className="mb-3 text-xl font-bold">{t("smsInbox")}</h2>
          {!inbox?.length && <p className="text-on-surface-variant">{t("noSms")}</p>}
          <ul className="space-y-2">
            {inbox?.map((m, i) => (
              <li key={m.ts + "-" + i} className="rounded-[20px_20px_20px_4px] bg-surface-highest p-3 text-sm">
                {m.text}
                <span className="mt-1 block text-xs text-on-surface-variant">{new Date(m.ts * 1000).toLocaleTimeString(lang)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

export default function SimPage() {
  return <Sim />;
}
