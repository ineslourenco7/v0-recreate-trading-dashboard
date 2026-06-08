"use client"

import { ChevronUp, ChevronDown } from "lucide-react"
import { Panel } from "."
import { useState, useEffect } from "react"

export function LiquidityPanel() {
  const [state, setState] = useState<{ symbol: string; above: number; below: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/market/liquidity", { cache: "no-store" })
        const data = await res.json()
        if (!res.ok) throw new Error(data ? JSON.stringify(data) : `HTTP ${res.status}`)
        if (!cancelled) setState(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar liquidez")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Liquidez
      </h2>

      {loading ? (
        <p className="mt-2 text-[12px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-2 text-[12px] text-destructive">{error}</p>
      ) : state ? (
        <>
          <p className="mt-2 text-[12px] text-muted-foreground">
            Zonas de liquidez detectadas{state.symbol ? `: ${state.symbol}` : ""}
          </p>
          <div className="mt-4 flex flex-1 flex-col justify-center gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <ChevronUp className="h-3.5 w-3.5 text-bull" /> Acima
              </p>
              <p className="font-mono text-2xl font-bold tabular-nums text-bull">
                {typeof state.above === "number" ? state.above.toLocaleString() : state.above}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                <ChevronDown className="h-3.5 w-3.5 text-bear" /> Abaixo
              </p>
              <p className="font-mono text-2xl font-bold tabular-nums text-bear">
                {typeof state.below === "number" ? state.below.toLocaleString() : state.below}
              </p>
            </div>
          </div>
        </>
      ) : null}

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Mapa
      </button>
    </Panel>
  )
}
