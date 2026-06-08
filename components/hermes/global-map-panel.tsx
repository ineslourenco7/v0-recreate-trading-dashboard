import { Panel } from "./panel"
import { Donut } from "./charts/donut"

export function GlobalMapPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Mapa Global de Traders
        </h2>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm font-semibold">BTCUSD</span>
        <span className="text-[10.5px] text-muted-foreground">Dados em tempo real</span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-bull">56%</p>
          <p className="text-[11px] text-muted-foreground">Comprados</p>
        </div>
        <Donut
          size={120}
          thickness={13}
          segments={[
            { value: 56, color: "var(--bull)" },
            { value: 44, color: "var(--bear)" },
          ]}
        />
        <div className="text-center">
          <p className="text-2xl font-bold text-bear">44%</p>
          <p className="text-[11px] text-muted-foreground">Vendidos</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3">
        <div>
          <p className="text-[11px] text-muted-foreground">Lucro Médio</p>
          <p className="text-lg font-bold text-bull">1.82%</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground">Perda Média</p>
          <p className="text-lg font-bold text-bear">-1.35%</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver todos ativos
      </button>
    </Panel>
  )
}
