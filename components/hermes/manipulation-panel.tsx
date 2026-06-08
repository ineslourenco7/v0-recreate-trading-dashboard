import { Panel } from "./panel"
import { RadarScope } from "./charts/radar-scope"

export function ManipulationPanel() {
  return (
    <Panel className="flex flex-col items-center p-4 text-center">
      <h2 className="self-start text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Radar de Manipulação
      </h2>
      <p className="mt-2 self-start text-left text-[12px] text-muted-foreground">
        Probabilidade elevada de stop hunt em:
      </p>
      <p className="mb-1 mt-1 self-start text-2xl font-bold text-bear">BTCUSD</p>

      <div className="my-1">
        <RadarScope size={172} />
      </div>

      <button
        type="button"
        className="mt-2 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Zonas
      </button>
    </Panel>
  )
}
