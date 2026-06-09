"use client"

import { useMemo, useState } from "react"
import { ModuleCard, ModulePage } from "@/components/hermes/module-page"

const assets = ["XAUUSD", "BTCUSD", "EURUSD", "NAS100"] as const

type Asset = (typeof assets)[number]

type LiquidityZone = {
  id: string
  asset: Asset
  side: "Acima" | "Abaixo"
  level: number
  strength: "Fraca" | "Média" | "Forte"
  type: string
}

const baseZones: LiquidityZone[] = [
  { id: "1", asset: "XAUUSD", side: "Acima", level: 3365, strength: "Forte", type: "Buy-side liquidity" },
  { id: "2", asset: "XAUUSD", side: "Abaixo", level: 3348, strength: "Média", type: "Sell-side liquidity" },
  { id: "3", asset: "BTCUSD", side: "Acima", level: 68400, strength: "Média", type: "High sweep zone" },
  { id: "4", asset: "BTCUSD", side: "Abaixo", level: 67250, strength: "Forte", type: "Range low liquidity" },
  { id: "5", asset: "EURUSD", side: "Acima", level: 1.0862, strength: "Fraca", type: "Session high" },
  { id: "6", asset: "NAS100", side: "Abaixo", level: 19380, strength: "Forte", type: "Previous low" },
]

export default function LiquidityPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("XAUUSD")
  const [zones, setZones] = useState(baseZones)
  const [updatedAt, setUpdatedAt] = useState("Ainda não atualizado")

  const visibleZones = useMemo(
    () => zones.filter((zone) => zone.asset === selectedAsset),
    [selectedAsset, zones],
  )

  const strongestZone = visibleZones.find((zone) => zone.strength === "Forte")

  function refreshZones() {
    setZones((current) =>
      current.map((zone) =>
        zone.asset === selectedAsset
          ? {
              ...zone,
              level: Number((zone.level + (Math.random() > 0.5 ? 1 : -1) * Math.random() * (selectedAsset === "EURUSD" ? 0.001 : 8)).toFixed(selectedAsset === "EURUSD" ? 5 : 2)),
            }
          : zone,
      ),
    )
    setUpdatedAt(new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }))
  }

  return (
    <ModulePage
      eyebrow="Módulo 03"
      title="Liquidez"
      description="Mapa de zonas onde o preço pode procurar stops, absorção ou sweep. Útil para evitar entradas antes da limpeza de liquidez."
    >
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <ModuleCard title="Mapa de zonas">
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
            {visibleZones.map((zone) => (
              <div key={zone.id} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">{zone.side} do preço</p>
                    <p className="text-xs text-muted-foreground">{zone.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-primary">{zone.level}</p>
                    <p className="text-[10px] uppercase text-muted-foreground">nível</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Força</span>
                  <span className="rounded-full border border-border/70 bg-background/60 px-2 py-1 font-bold">{zone.strength}</span>
                </div>
              </div>
            ))}
          </div>
        </ModuleCard>

        <ModuleCard title="Leitura rápida">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Ativo</p>
              <p className="mt-1 text-2xl font-black">{selectedAsset}</p>
            </div>

            <div className="rounded-xl border border-border/70 bg-background/60 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Zona principal</p>
              <p className="mt-1 font-bold">{strongestZone ? `${strongestZone.side} — ${strongestZone.level}` : "Sem zona forte"}</p>
            </div>

            <button onClick={refreshZones} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">
              Atualizar Zonas
            </button>

            <p className="text-xs text-muted-foreground">Última atualização: {updatedAt}</p>
          </div>
        </ModuleCard>
      </div>
    </ModulePage>
  )
}
