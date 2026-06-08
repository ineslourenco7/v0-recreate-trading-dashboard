import { ChevronDown } from "lucide-react"
import { Panel } from "./panel"
import { Donut } from "./charts/donut"

export function ScenarioPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Simulador de Cenários
      </h2>
      <button type="button" className="mt-2 flex items-center gap-1 text-sm font-semibold">
        BTCUSD <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      <p className="mt-1 text-[11px] text-muted-foreground">Analisando 10,000 cenários...</p>

      <div className="mt-3 flex items-center gap-4">
        <Donut
          size={96}
          thickness={11}
          segments={[
            { value: 62, color: "var(--bull)" },
            { value: 38, color: "var(--bear)" },
          ]}
        />
        <dl className="flex-1 space-y-1.5 text-[12px]">
          <Row label="Chance de TP" value="62%" tone="text-bull" />
          <Row label="Chance de SL" value="38%" tone="text-bear" />
          <Row label="RR Esperado" value="1.65" />
          <Row label="Duração Média" value="3h 25m" />
        </dl>
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Cenários
      </button>
    </Panel>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-mono font-semibold tabular-nums ${tone ?? "text-foreground"}`}>{value}</dd>
    </div>
  )
}
