"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const STORAGE_KEY = "hermes-trading-journal-entries"
const assets = ["XAUUSD", "BTCUSD", "EURUSD", "NAS100"] as const
const results = ["Win", "Loss", "Breakeven", "Sem trade"] as const
const emotions = ["Calma", "FOMO", "Revenge", "Confiante", "Ansiosa"] as const

type Asset = (typeof assets)[number]
type Result = (typeof results)[number]
type Emotion = (typeof emotions)[number]

type JournalEntry = {
  id: string
  createdAt: string
  asset: Asset
  result: Result
  emotion: Emotion
  setup: string
  note: string
}

const seedEntries: JournalEntry[] = [
  {
    id: "seed-1",
    createdAt: "Hoje 09:30",
    asset: "XAUUSD",
    result: "Sem trade",
    emotion: "Calma",
    setup: "Setup 123",
    note: "Esperei a limpeza de liquidez antes de considerar entrada. Boa disciplina.",
  },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(seedEntries)
  const [asset, setAsset] = useState<Asset>("XAUUSD")
  const [result, setResult] = useState<Result>("Sem trade")
  const [emotion, setEmotion] = useState<Emotion>("Calma")
  const [setup, setSetup] = useState("Setup 123")
  const [note, setNote] = useState("")
  const [status, setStatus] = useState("Diário em modo local")

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as JournalEntry[]
        if (Array.isArray(parsed)) setEntries(parsed)
      }
    } catch {
      setStatus("Não foi possível carregar o diário local")
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {
      setStatus("Não foi possível guardar no histórico local")
    }
  }, [entries])

  const stats = useMemo(() => {
    const wins = entries.filter((entry) => entry.result === "Win").length
    const losses = entries.filter((entry) => entry.result === "Loss").length
    const trades = wins + losses + entries.filter((entry) => entry.result === "Breakeven").length
    const fomo = entries.filter((entry) => entry.emotion === "FOMO" || entry.emotion === "Revenge").length

    return {
      total: entries.length,
      trades,
      wins,
      losses,
      winRate: trades ? Math.round((wins / trades) * 100) : 0,
      fomo,
    }
  }, [entries])

  function addEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanNote = note.trim()
    if (!cleanNote) {
      setStatus("Escreve uma nota antes de guardar")
      return
    }

    const now = new Date()
    const entry: JournalEntry = {
      id: `entry-${now.getTime()}`,
      createdAt: now.toLocaleString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      asset,
      result,
      emotion,
      setup,
      note: cleanNote,
    }

    setEntries((current) => [entry, ...current].slice(0, 50))
    setNote("")
    setStatus("Entrada guardada no diário local")
  }

  function clearJournal() {
    setEntries([])
    setStatus("Diário local limpo")
  }

  return (
    <ModulePage
      eyebrow="Módulo 06"
      title="Diário de Trading"
      description="Regista decisões, emoções, setups e resultados. Este é o módulo que permite ao Copilot deixar de ser genérico e começar a aprender o teu comportamento."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <ModuleCard title="Nova entrada">
          <form onSubmit={addEntry} className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Ativo
                <select value={asset} onChange={(event) => setAsset(event.target.value as Asset)} className="h-11 w-full rounded-xl border border-border/70 bg-secondary/40 px-3 text-sm text-foreground outline-none">
                  {assets.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="space-y-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Resultado
                <select value={result} onChange={(event) => setResult(event.target.value as Result)} className="h-11 w-full rounded-xl border border-border/70 bg-secondary/40 px-3 text-sm text-foreground outline-none">
                  {results.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="space-y-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Emoção
                <select value={emotion} onChange={(event) => setEmotion(event.target.value as Emotion)} className="h-11 w-full rounded-xl border border-border/70 bg-secondary/40 px-3 text-sm text-foreground outline-none">
                  {emotions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label className="space-y-1 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Setup
                <input value={setup} onChange={(event) => setSetup(event.target.value)} className="h-11 w-full rounded-xl border border-border/70 bg-secondary/40 px-3 text-sm outline-none" />
              </label>
            </div>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="O que aconteceu? Segui o plano? Houve FOMO? Onde estava a liquidez?"
              className="min-h-32 w-full rounded-xl border border-border/70 bg-secondary/40 p-4 text-sm outline-none transition focus:border-primary/50"
            />

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
                Guardar Entrada
              </button>
              <button type="button" onClick={clearJournal} className="rounded-xl border border-border/70 bg-secondary/40 px-5 py-3 text-sm font-bold text-muted-foreground transition hover:text-foreground">
                Limpar Local
              </button>
              <span className="text-xs text-muted-foreground">{status}</span>
            </div>
          </form>
        </ModuleCard>

        <ModuleCard title="Resumo rápido">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Entradas</p>
              <p className="mt-1 text-2xl font-black">{stats.total}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Win rate</p>
              <p className="mt-1 text-2xl font-black text-primary">{stats.winRate}%</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Wins / Losses</p>
              <p className="mt-1 text-lg font-black">{stats.wins} / {stats.losses}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Alertas emocionais</p>
              <p className="mt-1 text-lg font-black">{stats.fomo}</p>
            </div>
          </div>
        </ModuleCard>
      </div>

      <ModuleCard title="Entradas recentes">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ainda não existem entradas no diário.</p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <article key={entry.id} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-primary/15 px-2 py-1 text-xs font-bold text-primary">{entry.asset}</span>
                    <span className="rounded bg-background/60 px-2 py-1 text-xs font-bold text-muted-foreground">{entry.result}</span>
                    <span className="rounded bg-background/60 px-2 py-1 text-xs font-bold text-muted-foreground">{entry.emotion}</span>
                    <span className="rounded bg-background/60 px-2 py-1 text-xs font-bold text-muted-foreground">{entry.setup}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{entry.createdAt}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.note}</p>
              </article>
            ))}
          </div>
        )}
      </ModuleCard>
    </ModulePage>
  )
}
