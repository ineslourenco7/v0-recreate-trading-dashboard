"use client"

import { Panel, PanelHeader } from "."
import { useState, useEffect, useId } from "react"
import { ScoreRing } from "./(sections)/score-ring"
import { cn } from "@/lib/utils"

type MarketItem = {
  symbol: string
  score: number
  tone: "high" | "mid" | "low"
  flag: string
}

const toneToColor: Record<string, string> = {
  high: "var(--bull)",
  mid: "var(--warn)",
  low: "var(--bear)",
}
const toneToText: Record<string, string> = {
  high: "text-bull",
  mid: "text-warn",
  low: "text-bear",
}

export function MarketScorePanel() {
  const [items, setItems] = useState<MarketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [asset, setAsset] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/market/score", { cache: "no-store" })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`)
        if (!cancelled) {
          setAsset(data?.asset ?? null)
          const list = Array.isArray(data?.items) ? (data.items as MarketItem[]) : []
          setItems(list)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar score")
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
    <Panel className="flex flex-col p-3.5">
      <PanelHeader
        title="Score de Mercado"
        action={
          <span className="text-[11px] font-mono text-muted-foreground">
            {asset ? asset.toUpperCase() : ""}
          </span>
        }
      />

      {loading ? (
        <p className="mt-3 text-[11px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-3 text-[11px] text-destructive">{error}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2.5">
          {items.map((m) => (
            <li key={m.symbol} className="flex items-center gap-3">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/60 text-xs"
                aria-hidden="true"
              >
                {m.flag}
              </span>
              <span className="flex-1 text-[13px] font-medium">{m.symbol}</span>
              <ScoreRing value={m.score} color={toneToColor[m.tone] ?? "var(--warn)"} />
              <span
                className={cn(
                  "w-7 text-right font-mono text-[13px] font-semibold tabular-nums",
                  toneToText[m.tone] ?? "text-foreground",
                )}
              >
                {m.score}
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="mt-3.5 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver todos
      </button>
    </Panel>
  )
}
