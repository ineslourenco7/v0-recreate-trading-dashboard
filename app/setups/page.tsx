"use client"

import { useEffect, useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const JOURNAL_STORAGE_KEY = "hermes-trading-journal-entries"

type JournalEntry = {
  id: string
  asset: string
  result: "Win" | "Loss" | "Breakeven" | "Sem trade"
  setup: string
  emotion: string
  note: string
}

const mockSetups = [
  { name: "Setup 123", trades: 24, winRate: 68, avgRr: 1.4, score: 84, bestAsset: "XAUUSD" },
  { name: "Pullback EMA", trades: 17, winRate: 59, avgRr: 1.2, score: 71, bestAsset: "NAS100" },
  { name: "Liquidity Sweep", trades: 12, winRate: 64, avgRr: 1.6, score: 79, bestAsset: "BTCUSD" },
  { name: "Range Reversal", trades: 9, winRate: 44, avgRr: 1.1, score: 52, bestAsset: "EURUSD" },
]

export default function SetupsPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [selectedSetup, setSelectedSetup] = useState("Setup 123")

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

  const setupStats = useMemo(() => {
    const tradeEntries = entries.filter((entry) => entry.result !== "Sem trade")

    if (!tradeEntries.length) return mockSetups

    const grouped = tradeEntries.reduce<Record<string, JournalEntry[]>>((acc, entry) => {
      const key = entry.setup || "Sem setup"
      acc[key] = acc[key] || []
      acc[key].push(entry)
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([name, group]) => {
        const wins = group.filter((entry) => entry.result === "Win").length
        const losses = group.filter((entry) => entry.result === "Loss").length
        const trades = group.length
        const winRate = Math.round((wins / trades) * 100)
        const assetScores = group.reduce<Record<string, number>>((acc, entry) => {
          acc[entry.asset] = (acc[entry.asset] || 0) + (entry.result === "Win" ? 1 : entry.result === "Loss" ? -1 : 0)
          return acc
        }, {})
        const bestAsset = Object.entries(assetScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "Sem dados"
        const score = Math.max(20, Math.min(95, Math.round(winRate * 0.8 + trades * 2 - losses * 3)))

        return {
          name,
          trades,
          winRate,
          avgRr: Number((1 + wins * 0.12).toFixed(1)),
          score,
          bestAsset,
        }
      })
      .sort((a, b) => b.score - a.score)
  }, [entries])

  const selected = setupStats.find((setup) => setup.name === selectedSetup) || setupStats[0]

  return (
    <ModulePage
      eyebrow="Módulo 08"
      title="Top Setups 30 dias"
      description="Identifica os setups com melhor performance e em que ativos eles funcionam melhor. Usa o diário local quando houver entradas guardadas."
    >
      <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <ModuleCard title="Ranking de setups">
          <div className="space-y-3">
            {setupStats.map((setup, index) => (
              <button
                key={setup.name}
                type="button"
                onClick={() => setSelectedSetup(setup.name)}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  selected?.name === setup.name
                    ? "border-primary/60 bg-primary/10"
                    : "border-border/70 bg-secondary/30 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-sm font-black text-primary">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-lg font-black">{setup.name}</p>
                      <p className="text-xs text-muted-foreground">Melhor ativo: {setup.bestAsset}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{setup.score}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">score</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-xs md:grid-cols-3">
                  <span className="rounded-lg border border-border/70 bg-background/60 p-2 text-muted-foreground">Trades: <b className="text-foreground">{setup.trades}</b></span>
                  <span className="rounded-lg border border-border/70 bg-background/60 p-2 text-muted-foreground">Win rate: <b className="text-foreground">{setup.winRate}%</b></span>
                  <span className="rounded-lg border border-border/70 bg-background/60 p-2 text-muted-foreground">Avg RR: <b className="text-foreground">{setup.avgRr}</b></span>
                </div>
              </button>
            ))}
          </div>
        </ModuleCard>

        <ModuleCard title="Análise do setup">
          {selected ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Setup selecionado</p>
                <p className="mt-1 text-2xl font-black">{selected.name}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Veredito</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {selected.score >= 75
                    ? "Setup prioritário. O Copilot deve favorecer este padrão quando o contexto de mercado estiver alinhado."
                    : selected.score >= 60
                      ? "Setup utilizável, mas precisa de confirmação adicional de liquidez e risco."
                      : "Setup fraco. Deve ser evitado ou usado apenas em modo observação."}
                </p>
              </div>
              <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Fonte</p>
                <p className="mt-1 text-sm font-bold">{entries.length ? "Diário local" : "Mock funcional 30 dias"}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sem setups para analisar.</p>
          )}
        </ModuleCard>
      </div>
    </ModulePage>
  )
}
