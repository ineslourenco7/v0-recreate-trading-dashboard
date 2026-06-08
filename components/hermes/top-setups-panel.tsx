"use client"

import { Panel } from "./panel"
import { useState, useEffect } from "react"
import { Sparkline } from "./charts/sparkline"

type Setup = { rank: number; name: string; rate: string; count: number }

export function TopSetupsPanel() {
  const [items, setItems] = useState<Setup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/setups", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`)
        if (!cancelled) setItems((json.items ?? []) as Setup[])
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar setups")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Top Setups <span className="text-muted-foreground/70">(30 dias)</span>
      </h2>

      {loading ? (
        <p className="mt-3 text-[11px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-3 text-[11px] text-destructive">{error}</p>
      ) : (
        <>
          <div className="mt-3 flex items-center justify-end gap-3 text-[10px] text-muted-foreground">
            <span>Taxa de Acerto</span>
          </div>
          <ul className="mt-1 flex flex-1 flex-col gap-3">
            {items.map((s) => (
              <li key={s.rank} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary/60 text-[11px] font-bold text-muted-foreground">
                  {s.rank}
                </span>
                <span className="flex-1 text-[13px] font-medium">{s.name}</span>
                <span className="font-mono text-[12.5px] font-semibold text-bull">{s.rate}</span>
                <span className="w-7 text-right font-mono text-[12px] text-muted-foreground">{s.count}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Todos
      </button>
    </Panel>
  )
}
