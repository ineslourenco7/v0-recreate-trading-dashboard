import { Panel } from "./panel"
import { Heatmap } from "./charts/heatmap"

export function DiaryPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Diário de Trading
      </h2>
      <p className="mt-2 text-[12px] text-muted-foreground">Resumo rápido</p>

      <div className="mt-3 flex-1">
        <Heatmap />
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Diário
      </button>
    </Panel>
  )
}
