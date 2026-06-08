import { ChevronUp, ChevronDown } from "lucide-react"
import { Panel } from "./panel"

export function LiquidityPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Liquidez
      </h2>
      <p className="mt-2 text-[12px] text-muted-foreground">Zonas de liquidez detectadas</p>

      <div className="mt-4 flex flex-1 flex-col justify-center gap-4">
        <div>
          <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <ChevronUp className="h-3.5 w-3.5 text-bull" /> Acima
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums text-bull">68,250.0</p>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <ChevronDown className="h-3.5 w-3.5 text-bear" /> Abaixo
          </p>
          <p className="font-mono text-2xl font-bold tabular-nums text-bear">66,800.0</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Mapa
      </button>
    </Panel>
  )
}
