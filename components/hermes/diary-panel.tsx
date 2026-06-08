"use client"

import { Panel } from "./panel"
import { Heatmap } from "./charts/heatmap"
import { useState, useEffect } from "react"

type JournalEntry = { date: string; text: string; tags: string[]; insight: string }

export function DiaryPanel() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/journal", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`)
        if (!cancelled) setEntries(json.entries ?? [])
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar diário")
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
        Diário de Trading
      </h2>

      {loading ? (
        <p className="mt-2 text-[12px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-2 text-[12px] text-destructive">{error}</p>
      ) : (
        <>
          <p className="mt-2 text-[12px] text-muted-foreground">Resumo recente</p>
          <ul className="mt-2 flex-1 space-y-2 text-[11.5px] text-muted-foreground">
            {entries.map((entry, idx) => (
              <li key={`${entry.date}-${idx}`} className="border-b border-border/50 pb-2 last:border-none">
                <p className="font-mono text-[10px] text-muted-foreground/80">
                  {entry.date ? new Date(entry.date).toLocaleString() : ""}
                </p>
                <p className="mt-0.5 leading-snug text-foreground/90">{entry.text}</p>
                {entry.insight ? <p className="mt-0.5 italic text-foreground/70">💡 {entry.insight}</p> : null}
              </li>
            ))}
          </ul>
        </>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Diário
      </button>
    </Panel>
  )
}
