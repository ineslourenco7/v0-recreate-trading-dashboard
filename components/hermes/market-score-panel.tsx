"use client"

import { Panel, PanelHeader } from "./panel"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const ringTone: Record<string, string> = {
  high: "var(--bull)",
  mid: "var(--warn)",
  low: "var(--bear)",
}

const textTone: Record<string, string> = {
  high: "text-bull",
  mid: "text-warn",
  low: "text-bear",
}

function ScoreRing({ value, color }: { value: number; color: string }) {
  const size = 26
  const stroke = 3
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = (value / 100) * c
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--secondary)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeLinecap="round"
        className="transition-[stroke-dasharray] duration-700"
      />
    </svg>
  )
}

export function MarketScorePanel() {
  const [items, setItems] = useState<Array<{ symbol: string; score: number; tone: string; flag: string }>>([])
  const [asset, setAsset] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          const mapped = ((data?.items ?? data) as any[]).map((m) => ({
            symbol: m.symbol,
            score: m.score,
            tone: m.tone,
            flag: m.flag,
          }))
          setItems(mapped)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar score")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <Panel className="flex flex-col p-3.5">
      <PanelHeader
        title="Score de Mercado"
        action={
          <span className="text-[11px] font-mono text-muted-foreground">{asset ? asset.toUpperCase() : ""}</span>
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
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/60 text-xs" aria-hidden="true">
                {m.flag}
              </span>
              <span className="flex-1 text-[13px] font-medium">{m.symbol}</span>
              <ScoreRing value={m.score} color={ringTone[m.tone] ?? "var(--warn)"} />
              <span className={cn("w-7 text-right font-mono text-[13px] font-semibold tabular-nums", textTone[m.tone] ?? "text-foreground")}>{m.score}</span>
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
