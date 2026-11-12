"use client";
import { Job, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { H2, List, RowLink, TradeIcon } from "./ui";

export const STATUS_STYLE: Record<Job["status"], string> = {
  booked: "bg-secondary-container text-on-secondary-container",
  in_progress: "bg-tertiary-container text-on-tertiary-container",
  completed: "bg-surface-high text-on-surface-variant",
  locked: "bg-error-container text-on-error-container",
};

export function JobList() {
  const { t, label, trade, date } = useApp();
  const { data: jobs } = useApi<Job[]>("/jobs", 5000);
  if (!jobs?.length) return null;
  return (
    <>
      <H2>{t("myJobs")}</H2>
      <List>
        {jobs.map((j) => {
          const needsRating = j.status === "completed" && !j.reviews[j.side];
          return (
            <RowLink key={j.id} href={`/job/?id=${j.id}`} icon={<TradeIcon trade={j.trade} />}
              sub={`${label(trade(j.trade)?.problems.find((p) => p.id === j.problem))} · ${date(j.created)}`}>
              <span className="flex items-center gap-2">
                <span className="truncate">{j.side === "customer" ? j.artisan_name : j.customer_name}</span>
                <span className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${needsRating ? "bg-primary text-on-primary" : STATUS_STYLE[j.status]}`}>
                  {needsRating ? t("rateNow") : t(`status_${j.status}` as Key)}
                </span>
              </span>
            </RowLink>
          );
        })}
      </List>
    </>
  );
}
