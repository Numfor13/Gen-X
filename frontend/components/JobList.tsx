"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Job, useApi } from "@/lib/api";
import { useApp } from "@/lib/app";
import type { Key } from "@/lib/i18n";
import { Card, TradeIcon } from "./ui";

const STATUS_STYLE: Record<Job["status"], string> = {
  booked: "bg-tertiary-fixed text-on-tertiary-fixed",
  in_progress: "bg-primary-fixed text-on-primary-fixed",
  completed: "bg-secondary-fixed text-on-secondary-fixed",
  locked: "bg-error-container text-on-error-container",
};

export function JobList() {
  const { t, label, trade, date } = useApp();
  const { data: jobs } = useApi<Job[]>("/jobs", 5000);
  if (!jobs?.length) return null;
  return (
    <Card>
      <h2 className="mb-2 text-xl font-bold">{t("myJobs")}</h2>
      <ul className="divide-y divide-outline-variant">
        {jobs.map((j) => {
          const needsRating = j.status === "completed" && !j.reviews[j.side];
          return (
            <li key={j.id}>
              <Link href={`/job/?id=${j.id}`} className="flex min-h-16 items-center gap-3 py-2">
                <TradeIcon trade={j.trade} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{j.side === "customer" ? j.artisan_name : j.customer_name}</span>
                  <span className="block truncate text-sm text-on-surface-variant">
                    {label(trade(j.trade)?.problems.find((p) => p.id === j.problem))} · {date(j.created)}
                  </span>
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${needsRating ? "bg-gold text-on-surface" : STATUS_STYLE[j.status]}`}>
                  {needsRating ? t("rateNow") : t(`status_${j.status}` as Key)}
                </span>
                <ChevronRight size={18} aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
