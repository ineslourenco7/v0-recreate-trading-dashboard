"use client"

import { Panel } from "./panel"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type NewsItem = { time: string; title: string; impact: string; when: string }

export function NewsPanel() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/market/news-impact", { cache: "no-store" })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`)
        if (!cancelled) {
          setItems((data?.items ?? []) as NewsItem[])
          setUpdatedAt(data?.updated_at ?? null)
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar notícias")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const impactStyles: Record<string, string> = {
    ALTO: "bg-[#e05c5c]/15 text-[#e05c5c]",
    MÉDIO: "bg-[#d4a017]/15 text-[#d4a017]",
  }

  return (
    <Panel className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Notícias de Impacto</h2>
        <span aria-hidden="true" className="text-sm">⚡</span>
      </div>

      {loading ? (
        <p className="mt-3 text-[11px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-3 text-[11px] text-destructive">{error}</p>
      ) : (
        <ul className="mt-3 flex flex-1 flex-col gap-3">
          {items.map((n, i) => (
            <li key={`${n.time}-${n.title}-${i}`} className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/60 text-muted-foreground">
                <span aria-hidden="true" className="text-xs">📅</span>
              </span>
              <span className="font-mono text-[12px] text-muted-foreground">{n.time}</span>
              <span className="flex-1 text-[12.5px] leading-tight">{n.title}</span>
              <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-bold", impactStyles[n.impact] ?? "bg-secondary text-muted-foreground")}>{n.impact}</span>
              <span className="w-14 text-right text-[10.5px] text-muted-foreground">{n.when}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2 text-[10px] text-muted-foreground">Actualizado: {updatedAt ? new Date(updatedAt).toLocaleTimeString() : "—"}</p>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Calendário
      </button>
    </Panel>
  )
}
