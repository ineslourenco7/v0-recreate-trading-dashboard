"use client"

import { useState } from "react"
import { Panel } from "./panel"
import { RadarScope } from "./charts/radar-scope"

export function ManipulationPanel() {
  const [loading, setLoading] = useState(false)
  const [zones, setZones] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    setZones(null)
    try {
      // A Vercel serve o próprio Next.js; usamos rota relativa para não depender de localhost.
      const response = await fetch("/api/trading-gps", { cache: "no-store" })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.detail || `Erro HTTP ${response.status}`)
      }
      const list = Array.isArray(data?.zones) ? (data.zones as unknown[]).slice(0, 5) : []
      const formatted = list.map((item, idx) => {
        if (typeof item === "string") return `${idx + 1}. ${item}`
        const raw = item as Record<string, unknown>
        const label =
          typeof raw.label === "string"
            ? raw.label
            : typeof raw.zone === "string"
              ? raw.zone
              : typeof raw.direction === "string"
                ? `${raw.symbol ?? ""} ${raw.direction ?? ""}`.trim() || `Zona ${idx + 1}`
                : `Zona ${idx + 1}`
        const price = typeof raw.price === "number" || typeof raw.price === "string" ? ` @ ${raw.price}` : ""
        const strength = typeof raw.strength === "number" || typeof raw.strength === "string" ? ` (${raw.strength})` : ""
        return `${idx + 1}. ${label}${price}${strength}`
      })
      setZones(formatted.join("\n") || "Nenhuma zona detectada.")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Falha ao carregar zonas."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel className="flex flex-col p-4 text-center xl:h-full">
      <h2 className="self-start text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Radar de Manipulação
      </h2>
      <p className="mt-2 self-start text-left text-[12px] text-muted-foreground">
        Probabilidade elevada de stop hunt em:
      </p>
      <p className="text-self-start mt-1 self-start text-2xl font-bold text-bear">BTCUSD</p>

      <div className="my-1 flex w-full justify-center">
        <RadarScope size={172} />
      </div>

      <button
        type="button"
        onClick={handleClick}
        className="mt-2 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        {loading ? "A carregar…" : "Ver Zonas"}
      </button>

      <div className="mt-2 text-left text-[11px]">
        {zones && <pre className="whitespace-pre-wrap text-bear">{zones}</pre>}
        {error && <p className="text-destructive">{error}</p>}
      </div>
    </Panel>
  )
}
