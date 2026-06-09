"use client"

import { useEffect, useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const JOURNAL_STORAGE_KEY = "hermes-trading-journal-entries"

type JournalEntry = {
  id: string
  createdAt: string
  asset: string
  result: "Win" | "Loss" | "Breakeven" | "Sem trade"
  emotion: string
  setup: string
  note: string
}

const mockTrades = [
  { day: "D-6", pnl: 1.2, asset: "XAUUSD", setup: "Setup 123" },
  { day: "D-5", pnl: -0.6, asset: "BTCUSD", setup: "Breakout" },
  { day: "D-4", pnl: 0.8, asset: "XAUUSD", setup: "Pullback" },
  { day: "D-3", pnl: 1.6, asset: "NAS100", setup: "Momentum" },
  { day: "D-2", pnl: -0.4, asset: "EURUSD", setup: "Range" },
  { day: "D-1", pnl: 0.9, asset: "XAUUSD", setup: "Setup 123" },
  { day: "Hoje", pnl: 0.3, asset: "XAUUSD", setup: "Setup 123" },
]

export default function PerformancePage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [window, setWindow] = useState<"7D" | "30D" | "90D">("30D")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY)
      if (!saved) return
      const parsed = JSON.parse(saved) as JournalEntry[]
      if (Array.isArray(parsed)) setEntries(parsed)
    } catch {
      setEntries([])
    }
  }, [])

  const metrics = useMemo(() => {
    const winsFromJournal = entries.filter((entry) => entry.result === "Win").length
    const lossesFromJournal = entries.filter((entry) => entry.result === "Loss").length
    const breakevenFromJournal = entries.filter((entry) => entry.result === "Breakeven").length
    const journalTrades = winsFromJournal + lossesFromJournal + breakevenFromJournal

    const mockWins = mockTrades.filter((trade) => trade.pnl > 0).length
    const mockLosses = mockTrades.filter((trade) => trade.pnl < 0).length
    const totalTrades = journalTrades || mockTrades.length
    const wins = journalTrades ? winsFromJournal : mockWins
    const losses = journalTrades ? lossesFromJournal : mockLosses
    const pnl = journalTrades ? wins * 1.1 - losses * 0.7 : mockTrades.reduce((sum, trade) => sum + trade.pnl, 0)
    const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) : 0
    const grossWin = journalTrades ? wins * 1.1 : mockTrades.filter((trade) => trade.pnl > 0).reduce((sum, trade) => sum + trade.pnl, 0)
    const grossLoss = Math.abs(journalTrades ? losses * 0.7 : mockTrades.filter((trade) => trade.pnl < 0).reduce((sum, trade) => sum + trade.pnl, 0))
    const profitFactor = grossLoss ? (grossWin / grossLoss).toFixed(2) : "∞"

    return {
      totalTrades,
      wins,
      losses,
      pnl: pnl.toFixed(2),
      winRate,
      profitFactor,
      source: journalTrades ? "Diário local" : "Mock 30 dias",
    }
  }, [entries])

  const bestAsset = useMemo(() => {
    const source = entries.length
      ? entries.map((entry) => ({ asset: entry.asset, score: entry.result === "Win" ? 1 : entry.result === "Loss" ? -1 : 0 }))
      : mockTrades.map((trade) => ({ asset: trade.asset, score: trade.pnl }))

    const grouped = source.reduce<Record<string, number>>((acc, item) => {
      acc[item.asset] = (acc[item.asset] || 0) + item.score
      return acc
    }, {})

    return Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sem dados"
  }, [entries])

  return (
    <ModulePage
      eyebrow="Módulo 09"
      title="Performance 30 dias"
      description="Resumo de performance para perceber se estás a melhorar ou só a operar mais. Usa o diário local quando existir; caso contrário mostra mock funcional."
    >
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <ModuleCard title="Métricas principais">
          <div className="mb-4 flex flex-wrap gap-2">
            {["7D", "30D", "90D"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setWindow(item as "7D" | "30D" | "90D")}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  window === item
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">PnL</p>
              <p className="mt-2 text-3xl font-black text-primary">{metrics.pnl}%</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Win Rate</p>
              <p className="mt-2 text-3xl font-black">{metrics.winRate}%</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Profit Factor</p>
              <p className="mt-2 text-3xl font-black">{metrics.profitFactor}</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-border/70 bg-background/60 p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Curva simplificada</span>
              <span>{metrics.source}</span>
            </div>
            <div className="flex h-40 items-end gap-2">
              {mockTrades.map((trade) => (
                <div key={trade.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg bg-primary/70"
                    style={{ height: `${Math.max(12, Math.abs(trade.pnl) * 55)}px`, opacity: trade.pnl < 0 ? 0.35 : 1 }}
                    title={`${trade.day}: ${trade.pnl}%`}
                  />
                  <span className="text-[10px] text-muted-foreground">{trade.day}</span>
                </div>
              ))}
            </div>
          </div>
        </ModuleCard>

        <ModuleCard title="Diagnóstico">
          <div className="space-y-3">
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Trades analisados</p>
              <p className="mt-1 text-2xl font-black">{metrics.totalTrades}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Wins / Losses</p>
              <p className="mt-1 text-xl font-black">{metrics.wins} / {metrics.losses}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Melhor ativo</p>
              <p className="mt-1 text-xl font-black text-primary">{bestAsset}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-sm leading-6 text-muted-foreground">
              {Number(metrics.pnl) >= 0
                ? "Performance positiva. Mantém foco nos setups com melhor retorno e evita aumentar risco depois de wins."
                : "Performance negativa. Reduz frequência e revê entradas com emoção elevada no diário."}
            </div>
          </div>
        </ModuleCard>
      </div>
    </ModulePage>
  )
}
