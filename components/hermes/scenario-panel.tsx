"use client"

import { ChevronDown } from "lucide-react"
import { Panel } from "./panel"
import { Donut } from "./charts/donut"
import { useState, useEffect } from "react"

type Scenario = {
  symbol: string
  probability_up: number
  expected_rr: number
  avg_duration_minutes: number
  scenarios: { name: string; chance: string }[]
  updated_at?: string
}

export function ScenarioPanel() {
  const [data, setData] = useState<Scenario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/scenarios", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`)
        if (!cancelled) setData(json as Scenario)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar cenários")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const probabilityUp = data?.probability_up ?? 0
  const segments = [
    { value: probabilityUp, color: "var(--bull)" },
    { value: 100 - probabilityUp, color: "var(--bear)" },
  ]

  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Simulador de Cenários
      </h2>

      {loading ? (
        <p className="mt-2 text-[11px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-2 text-[11px] text-destructive">{error}</p>
      ) : (
        <>
          <button type="button" className="mt-2 flex items-center gap-1 text-sm font-semibold">
            {data?.symbol ?? "BTCUSD"} <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {data ? `Analisando cenários — actualizado ${new Date(data.updated_at ?? Date.now()).toLocaleTimeString()}` : "Sem dados"}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <Donut size={96} thickness={11} segments={segments} />
            <dl className="flex-1 space-y-1.5 text-[12px]">
              <Row label="Chance de TP" value={`${probabilityUp}%`} tone="text-bull" />
              <Row label="Chance de SL" value={`${100 - probabilityUp}%`} tone="text-bear" />
              <Row label="RR Esperado" value={data?.expected_rr ? String(data.expected_rr) : "—"} />
              <Row label="Duração Média" value={data?.avg_duration_minutes ? `${data.avg_duration_minutes} min` : "—"} />
            </dl>
          </div>
        </>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Cenários
      </button>
    </Panel>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-mono font-semibold tabular-nums ${tone ?? "text-foreground"}`}>{value}</dd>
    </div>
  )
}
