import { Panel } from "./panel"
import { Sparkline } from "./charts/sparkline"

const equity = [2, 3, 2.5, 4, 3.6, 5, 4.4, 6, 7, 6.4, 8, 9, 10]

export function PerformancePanel() {
  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Performance <span className="text-muted-foreground/70">(30 dias)</span>
      </h2>

      <p className="mt-3 text-[12px] text-muted-foreground">Lucro Líquido</p>
      <p className="text-2xl font-bold text-bull">+2,352.54€</p>

      <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
        <Stat label="Win Rate" value="62.4%" />
        <Stat label="Profit Factor" value="1.85" />
        <Stat label="Trades" value="128" />
      </dl>

      <div className="mt-3 flex-1">
        <Sparkline data={equity} width={300} height={60} color="var(--bull)" className="h-14 w-full" />
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Diário Completo
      </button>
    </Panel>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10.5px] text-muted-foreground">{label}</dt>
      <dd className="font-mono text-sm font-bold tabular-nums">{value}</dd>
    </div>
  )
}
