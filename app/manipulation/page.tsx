"use client"

import { useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const assets = ["XAUUSD", "BTCUSD", "EURUSD", "NAS100"] as const

type Asset = (typeof assets)[number]

type ManipulationSignal = {
  id: string
  asset: Asset
  type: string
  probability: number
  direction: "Alta" | "Baixa" | "Neutro"
  level: string
  evidence: string[]
}

const baseSignals: ManipulationSignal[] = [
  {
    id: "xau-sweep-high",
    asset: "XAUUSD",
    type: "Stop hunt acima",
    probability: 72,
    direction: "Alta",
    level: "3365 - 3370",
    evidence: ["Máximos iguais acima", "Preço perto de liquidez buy-side", "Volume a aumentar antes da zona"],
  },
  {
    id: "xau-fake-break",
    asset: "XAUUSD",
    type: "Fake breakout",
    probability: 61,
    direction: "Neutro",
    level: "3348 - 3351",
    evidence: ["Range estreito", "Rejeições repetidas", "Sem confirmação de continuação"],
  },
  {
    id: "btc-low-sweep",
    asset: "BTCUSD",
    type: "Sweep de fundo de range",
    probability: 78,
    direction: "Baixa",
    level: "67250 - 67100",
    evidence: ["Fundo de range visível", "Stops abaixo do preço", "Volatilidade elevada"],
  },
  {
    id: "eur-low-volume",
    asset: "EURUSD",
    type: "Manipulação de baixa liquidez",
    probability: 54,
    direction: "Neutro",
    level: "1.0830 - 1.0860",
    evidence: ["Sessão lenta", "Baixo volume", "Movimentos curtos e erráticos"],
  },
  {
    id: "nas-open-spike",
    asset: "NAS100",
    type: "Spike de abertura",
    probability: 69,
    direction: "Alta",
    level: "19420 - 19480",
    evidence: ["US open próxima", "Liquidez acima", "Impulso inicial sem pullback"],
  },
]

function riskLabel(probability: number) {
  if (probability >= 75) return "Risco elevado"
  if (probability >= 60) return "Risco médio"
  return "Risco moderado"
}

export default function ManipulationPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("XAUUSD")
  const [signals, setSignals] = useState(baseSignals)
  const [lastAction, setLastAction] = useState("Aguardando leitura")

  const visibleSignals = useMemo(
    () => signals.filter((signal) => signal.asset === selectedAsset),
    [selectedAsset, signals],
  )

  const mainSignal = visibleSignals.reduce<ManipulationSignal | null>((best, signal) => {
    if (!best || signal.probability > best.probability) return signal
    return best
  }, null)

  function scanZones() {
    setSignals((current) =>
      current.map((signal) =>
        signal.asset === selectedAsset
          ? {
              ...signal,
              probability: Math.max(35, Math.min(92, signal.probability + Math.floor(Math.random() * 13) - 6)),
            }
          : signal,
      ),
    )
    setLastAction(`Radar atualizado às ${new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}`)
  }

  return (
    <ModulePage
      eyebrow="Módulo 04"
      title="Radar de Manipulação"
      description="Deteta zonas onde o mercado pode fazer sweep, fakeout ou stop hunt. A leitura é probabilística: serve para gerir risco, não para afirmar certezas."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <ModuleCard title="Sinais detetados">
          <div className="mb-4 flex flex-wrap gap-2">
            {assets.map((asset) => (
              <button
                key={asset}
                type="button"
                onClick={() => setSelectedAsset(asset)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  selectedAsset === asset
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground"
                }`}
              >
                {asset}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visibleSignals.map((signal) => (
              <div key={signal.id} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">{signal.type}</p>
                    <p className="text-xs text-muted-foreground">Zona: {signal.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">{signal.probability}%</p>
                    <p className="text-[10px] uppercase text-muted-foreground">probabilidade</p>
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${signal.probability}%` }} />
                </div>

                <div className="mt-4 grid gap-2 md:grid-cols-3">
                  <div className="rounded-lg border border-border/70 bg-background/50 p-3">
                    <p className="text-[10px] uppercase text-muted-foreground">Direção</p>
                    <p className="mt-1 text-sm font-bold">{signal.direction}</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/50 p-3 md:col-span-2">
                    <p className="text-[10px] uppercase text-muted-foreground">Evidência</p>
                    <p className="mt-1 text-sm font-bold">{signal.evidence[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ModuleCard>

        <ModuleCard title="Veredito do radar">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Ativo</p>
              <p className="mt-1 text-2xl font-black">{selectedAsset}</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Risco atual</p>
              <p className="mt-1 text-xl font-black">{mainSignal ? riskLabel(mainSignal.probability) : "Sem leitura"}</p>
              {mainSignal && <p className="mt-2 text-sm text-muted-foreground">Principal zona: {mainSignal.level}</p>}
            </div>

            <button onClick={scanZones} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Ver Zonas / Atualizar Radar
            </button>

            <div className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-sm text-muted-foreground">
              {lastAction}
            </div>
          </div>
        </ModuleCard>
      </div>
    </ModulePage>
  )
}
