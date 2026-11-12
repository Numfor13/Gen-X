"use client";
import { useState } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { api, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Gate, Title } from "@/components/Shell";
import { Button, Card, Loading, Notice } from "@/components/ui";

type Event = { rule: string; severity: "high" | "medium"; subject: string; details: string; ts: number };

function Console() {
  const { t, lang } = useApp();
  const { data: events, error, reload } = useApi<Event[]>("/admin/fraud", 5000);
  const [resetError, setResetError] = useState("");
  if (error) return <Notice>{error}</Notice>;
  if (!events) return <Loading />;
  const reset = () => {
    if (confirm(t("resetConfirm"))) api("/admin/reset", {}).then(reload).catch((e: Error) => setResetError(e.message));
  };

  return (
    <>
      <Title sub={t("adminSub")}>{t("adminConsole")}</Title>
      {!events.length && <Notice kind="info">{t("noFraud")}</Notice>}
      {events.map((e) => (
        <Card key={e.ts + e.rule + e.subject} className="flex gap-3">
          <TriangleAlert className={e.severity === "high" ? "text-error" : "text-primary"} aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="font-bold">
              {t(`rule_${e.rule}` as Key)}{" "}
              <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${e.severity === "high" ? "bg-error text-on-error" : "bg-primary-fixed text-on-primary-fixed"}`}>{t(`severity_${e.severity}`)}</span>
            </p>
            <p className="text-sm">{e.details}</p>
            <p className="text-xs text-on-surface-variant">{t("subject")}: {e.subject} · {new Date(e.ts * 1000).toLocaleString(lang)}</p>
          </div>
        </Card>
      ))}
      <Notice>{resetError}</Notice>
      <Button variant="outline" className="w-full" onClick={reset}><RotateCcw size={18} aria-hidden /> {t("resetDemo")}</Button>
    </>
  );
}

export default function AdminPage() {
  return <Gate roles={["admin"]}><Console /></Gate>;
}
