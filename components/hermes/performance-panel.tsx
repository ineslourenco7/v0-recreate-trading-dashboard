"use client"

import { Panel } from "./panel"
import { Sparkline } from "./charts/sparkline"
import { useState, useEffect } from "react"

type Perf = { net_profit: number; win_rate: number; profit_factor: number; trades: number; updated_at?: string }

export function PerformancePanel() {
  const [data, setData] = useState<Perf | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/performance", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`)
        if (!cancelled) setData(json as Perf)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar performance")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const equity = [2, 3, 2.5, 4, 3.6, 5, 4.4, 6, 7, 6.4, 8, 9, 10]

  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Performance <span className="text-muted-foreground/70">(30 dias)</span>
      </h2>

      {loading ? (
        <p className="mt-3 text-[12px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-3 text-[12px] text-destructive">{error}</p>
      ) : (
        <>
          <p className="mt-3 text-[12px] text-muted-foreground">Lucro Líquido</p>
          <p className="text-2xl font-bold text-bull">
            {data?.net_profit != null ? `+${Number(data.net_profit).toLocaleString("pt-PT", { minimumFractionDigits: 2 })}€` : "+2,352.54€"}
          </p>

          <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
            <Stat label="Win Rate" value={data?.win_rate != null ? `${Math.round(data.win_rate * 100) / 10}%` : "62.4%"} />
            <Stat label="Profit Factor" value={data?.profit_factor != null ? String(data.profit_factor) : "1.85"} />
            <Stat label="Trades" value={data?.trades != null ? String(data.trades) : "128"} />
          </dl>
        </>
      )}

      <div className="mt-3 flex-1">
        <Sparkline data={equity} width={300} height={60} color="var(--bull)" className="h-14 w-full" />
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Diário Completo
      </button>
    </Panel>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10.5px] text-muted-foreground">{label}</dt>
      <dd className="font-mono text-sm font-bold tabular-nums">{value}</dd>
    </div>
  )
}
