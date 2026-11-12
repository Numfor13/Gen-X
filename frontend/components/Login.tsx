"use client";
import Link from "next/link";
import { useState } from "react";
import { api, Session, setStored } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Button, Card, Field, Notice } from "./ui";

const PERSONAS = ["customer", "artisan", "agent", "admin"] as const;

export function Login({ only }: { only?: string[] }) {
  const { t } = useApp();
  const [error, setError] = useState("");
  const [passcode, setPasscode] = useState<string | null>(null); // null = admin field hidden
  const [phone, setPhone] = useState("+237");
  const [sent, setSent] = useState<{ known: boolean } | null>(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const run = (call: Promise<Session>) =>
    call.then((s) => setStored("session", JSON.stringify(s))).catch((e: Error) => setError(e.message));
  const persona = (role: string) => {
    setError("");
    if (role === "admin" && passcode === null) return setPasscode("");
    run(api<Session>("/auth/persona", { role, passcode: passcode ?? "" }));
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-xl font-bold">{t("demoLogins")}</h2>
      <div className="grid grid-cols-2 gap-2">
        {PERSONAS.filter((r) => !only || only.includes(r)).map((r) => (
          <Button key={r} variant="tonal" onClick={() => persona(r)}>{t(`role_${r}` as Key)}</Button>
        ))}
      </div>
      {passcode !== null && (
        <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); persona("admin"); }}>
          <div className="flex-1"><Field label={t("adminPasscode")} type="password" autoFocus value={passcode} onChange={(e) => setPasscode(e.target.value)} /></div>
          <Button type="submit">{t("go")}</Button>
        </form>
      )}

      {!only && (
        <form className="space-y-3 border-t border-outline-variant pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            setError("");
            if (!sent) api<{ known: boolean }>("/auth/otp/start", { phone }).then(setSent).catch((er: Error) => setError(er.message));
            else run(api<Session>("/auth/otp/verify", { phone, code, name }));
          }}>
          <h2 className="text-xl font-bold">{t("phoneLogin")}</h2>
          <Field label={t("phone")} type="tel" inputMode="tel" required value={phone} disabled={!!sent} onChange={(e) => setPhone(e.target.value)} />
          {sent && (
            <>
              <Notice kind="info">
                {t("codeSent")}{" "}
                <Link className="underline" target="_blank" href={`/sim/?phone=${encodeURIComponent(phone)}`}>{t("openInbox")}</Link>
              </Notice>
              <Field label={t("loginCode")} inputMode="numeric" autoComplete="one-time-code" required maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} />
              {!sent.known && <Field label={t("yourName")} required value={name} onChange={(e) => setName(e.target.value)} />}
            </>
          )}
          <Button type="submit" variant="outline" className="w-full">{sent ? t("login") : t("sendCode")}</Button>
        </form>
      )}
      <Notice>{error}</Notice>
    </Card>
  );
}
