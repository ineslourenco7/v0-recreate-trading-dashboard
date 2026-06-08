"use client"

import { Panel } from "."
import { useState, useEffect } from "react"

type Psychology = {
  score: number
  emotional_risk: number
  revenge_risk: number
  rules: string[]
  learned_signals?: { sessions_seen: number; blocked_or_closed: number; revenge_notes: number; fomo_notes: number; emotional_notes: number }
  updated_at?: string
}

export function MentorPanel() {
  const [data, setData] = useState<Psychology | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/psychology", { cache: "no-store" })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.detail || `HTTP ${res.status}`)
        if (!cancelled) setData(json as Psychology)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Falha ao carregar psychology")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const tips = data
    ? [
        ...data.rules.map((text) => ({ icon: "plus" as const, text })),
        ...(Number(data.revenge_risk) > 0.6 ? [{ icon: "minus" as const, text: "Risco de revenge trading elevado — evitar recuperação." }] : []),
        ...(Number(data.emotional_risk) > 0.6 ? [{ icon: "minus" as const, text: "Risco emocional elevado — reduzir exposição." }] : []),
      ]
    : []

  return (
    <Panel className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Mentor IA</h2>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">🧠</span>
      </div>

      <p className="mt-3 text-[15px] font-semibold">
        Olá, Inês! <span aria-hidden="true">👋</span>
      </p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
        Com base na tua performance recente, aqui está o meu feedback:
      </p>

      {loading ? (
        <p className="mt-3 text-[11px] text-muted-foreground">A carregar…</p>
      ) : error ? (
        <p className="mt-3 text-[11px] text-destructive">{error}</p>
      ) : (
        <ul className="mt-3 flex flex-1 flex-col gap-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-[12.5px] leading-relaxed">
              <span className="mt-0.5 shrink-0">{tip.icon === "plus" ? "➕" : "⚠️"}</span>
              <span>{tip.text}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Ver Análise Completa
      </button>
    </Panel>
  )
}
