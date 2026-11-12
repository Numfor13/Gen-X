"use client";
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { Label, Ref, Session, Trade, User, useApi, useStored } from "./api";
import { dict, Key } from "./i18n";

type Lang = "en" | "fr";
type App = {
  lang: Lang;
  user: User | null;
  ref?: Ref;
  t: (key: Key, vars?: Record<string, string | number>) => string;
  label: (l?: Label) => string;
  trade: (id: string) => Trade | undefined;
  money: (band: [number, number]) => string;
  date: (ts: number) => string;
};

const Ctx = createContext<App>(null!);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const lang: Lang = useStored("lang") === "fr" ? "fr" : "en";
  const raw = useStored("session");
  const user = useMemo(() => (raw ? (JSON.parse(raw) as Session).user : null), [raw]);
  const { data: ref } = useApi<Ref>("/ref");

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const t = useCallback<App["t"]>(
    (key, vars = {}) => dict[lang][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? "")),
    [lang],
  );
  const app = useMemo<App>(() => ({
    lang, user, ref, t,
    label: (l) => l?.[lang] ?? "",
    trade: (id) => ref?.trades.find((x) => x.id === id),
    money: ([lo, hi]) => `${lo.toLocaleString(lang)} – ${hi.toLocaleString(lang)} FCFA`,
    date: (ts) => new Date(ts * 1000).toLocaleDateString(lang, { day: "numeric", month: "short", year: "numeric" }),
  }), [lang, user, ref, t]);

  return <Ctx.Provider value={app}>{children}</Ctx.Provider>;
}
