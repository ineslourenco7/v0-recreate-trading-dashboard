"use client"

import { useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const baseScores = [
  { symbol: "XAUUSD", score: 82, regime: "Bullish pullback", risk: "Médio", driver: "Tendência forte + liquidez acima" },
  { symbol: "BTCUSD", score: 68, regime: "Range", risk: "Médio/alto", driver: "Volatilidade alta + zona de sweep" },
  { symbol: "EURUSD", score: 59, regime: "Baixa volatilidade", risk: "Baixo", driver: "Sessão lenta + pouco volume" },
  { symbol: "NAS100", score: 73, regime: "Impulso bullish", risk: "Médio", driver: "Momentum positivo + US open" },
]

export default function MarketScorePage() {
  const [scores, setScores] = useState(baseScores)
  const [updatedAt, setUpdatedAt] = useState("Ainda não recalculado")

  function recalculate() {
    setScores((current) =>
      current.map((item) => ({
        ...item,
        score: Math.max(35, Math.min(95, item.score + Math.floor(Math.random() * 11) - 5)),
      })),
    )
    setUpdatedAt(new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }))
  }

  return (
    <ModulePage
      eyebrow="Módulo 01"
      title="Score de Mercado"
      description="Avalia rapidamente quais ativos têm melhor contexto para operar. O score combina tendência, volatilidade, liquidez e risco de notícia."
    >
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <ModuleCard title="Ranking atual">
          <div className="space-y-3">
            {scores.map((item) => (
              <div key={item.symbol} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">{item.symbol}</p>
                    <p className="text-xs text-muted-foreground">{item.regime}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{item.score}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">score</p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${item.score}%` }} />
                </div>
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
                  <p>Risco: <span className="font-semibold text-foreground">{item.risk}</span></p>
                  <p>Driver: <span className="font-semibold text-foreground">{item.driver}</span></p>
                </div>
              </div>
            ))}
          </div>
        </ModuleCard>

        <ModuleCard title="Ação rápida">
          <div className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Este módulo está em modo mock funcional. O objetivo é validar a experiência antes de ligar feeds reais.
            </p>
            <button onClick={recalculate} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Recalcular Score
            </button>
            <div className="rounded-xl border border-border/70 bg-background/60 p-4 text-sm">
              <p className="text-muted-foreground">Última atualização</p>
              <p className="mt-1 font-bold">{updatedAt}</p>
            </div>
          </div>
        </ModuleCard>
      </div>
    </ModulePage>
  )
}
