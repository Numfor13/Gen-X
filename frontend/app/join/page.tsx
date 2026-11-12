"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Handshake, KeyRound, UserRound } from "lucide-react";
import { api, Session, setStored } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Title } from "@/components/Shell";
import { Button, ButtonLink, Card, Field, Loading, Notice, Select } from "@/components/ui";

const STEPS: [typeof UserRound, Key][] = [[UserRound, "joinStep1"], [Handshake, "joinStep2"], [KeyRound, "joinStep3"]];

function Join() {
  const { t, ref, label, user } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "+237", trade: "", quarter: "" });
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!ref) return <Loading />;
  if (user?.role === "artisan") {
    return (
      <>
        <Title>{t("alreadyArtisan")}</Title>
        <ButtonLink href="/me/" size="lg" className="w-full">{t("myProfile")}</ButtonLink>
      </>
    );
  }
  if (user && user.role !== "customer") return <Notice>{t("staffCannotJoin")}</Notice>;

  const trade = form.trade || ref.trades[0].id;
  const quarter = form.quarter || user?.quarter || ref.quarters[0];
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value });
  const fail = (e: Error) => { setError(e.message); setBusy(false); };

  // turns the logged-in account into an artisan account and opens the new profile
  const register = () =>
    api<Session>("/artisans/join", { trade, quarter, name: form.name })
      .then((s) => { setStored("session", JSON.stringify(s)); router.push("/me/?welcome=1"); })
      .catch(fail);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    if (user) return register();
    if (!sent) return api("/auth/otp/start", { phone: form.phone }).then(() => { setSent(true); setBusy(false); }).catch(fail);
    api<Session>("/auth/otp/verify", { phone: form.phone, code, name: form.name, quarter })
      .then((s) => {
        setStored("session", JSON.stringify(s));
        // this phone already has an artisan account: just open it
        if (s.user.role === "artisan") return router.push("/me/");
        return register();
      })
      .catch(fail);
  };

  return (
    <>
      <Title sub={t("joinSub")}>{t("joinTitle")}</Title>

      <ol className="grid gap-3 rounded-2xl bg-surface-low p-4 text-sm">
        {STEPS.map(([Icon, key], i) => (
          <li key={key} className="flex items-start gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary-container">
              <Icon size={16} aria-hidden />
            </span>
            <span><span className="font-semibold">{i + 1}. </span>{t(key)}</span>
          </li>
        ))}
      </ol>

      <Card>
        <form className="space-y-3" onSubmit={submit}>
          <Field label={t("fullName")} required autoComplete="name" disabled={sent}
            value={form.name || (user?.name ?? "")} onChange={set("name")} />
          {!user && (
            <Field label={t("phone")} type="tel" inputMode="tel" required disabled={sent} value={form.phone} onChange={set("phone")} />
          )}
          <div className="grid grid-cols-2 gap-2">
            <Select label={t("tradeLabel")} value={trade} onChange={set("trade")} disabled={sent}>
              {ref.trades.map((x) => <option key={x.id} value={x.id}>{label(x)}</option>)}
            </Select>
            <Select label={t("quarter")} value={quarter} onChange={set("quarter")} disabled={sent}>
              {ref.quarters.map((q) => <option key={q}>{q}</option>)}
            </Select>
          </div>
          {sent && (
            <>
              <Notice kind="info">
                {t("codeSent")}{" "}
                <Link className="underline" target="_blank" href={`/sim/?phone=${encodeURIComponent(form.phone)}`}>{t("openInbox")}</Link>
              </Notice>
              <Field label={t("loginCode")} inputMode="numeric" autoComplete="one-time-code" required maxLength={6}
                autoFocus value={code} onChange={(e) => setCode(e.target.value)} />
            </>
          )}
          <Notice>{error}</Notice>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {user || sent ? t("createProfile") : t("sendCode")}
          </Button>
          <p className="text-xs text-on-surface-variant">{t("joinFree")}</p>
        </form>
      </Card>
    </>
  );
}

export default function JoinPage() {
  return <Join />;
}
