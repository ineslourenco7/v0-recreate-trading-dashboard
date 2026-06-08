import Image from "next/image"
import { Panel } from "./panel"
import { Sparkline } from "./charts/sparkline"
import { copyTraders } from "@/lib/dashboard-data"

// Tiny equity-curve series for each trader's mini chart.
const curves = [
  [4, 5, 4.5, 6, 7, 6.5, 8, 9],
  [3, 4, 3.8, 5, 4.6, 6, 7, 7.5],
  [2, 3, 4, 3.5, 5, 6, 5.5, 7],
]

export function CopyTradingPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Copy Trading <span className="text-muted-foreground/70">- Top Traders</span>
      </h2>

      <ul className="mt-3 flex flex-1 flex-col gap-3">
        {copyTraders.map((t, i) => (
          <li key={t.name} className="flex items-center gap-3">
            <Image
              src={t.avatar || "/placeholder.svg"}
              alt={`Avatar de ${t.name}`}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold">{t.name}</p>
              <p className="text-[11px] font-medium text-bull">{t.change}</p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Sparkline data={curves[i]} width={56} height={28} fill={false} />
              <span className="hidden text-[10.5px] text-muted-foreground sm:block">{t.risk}</span>
              <button
                type="button"
                className="rounded-lg border border-border/70 bg-secondary/50 px-3 py-1.5 text-[11px] font-medium transition-colors hover:bg-secondary"
              >
                Seguir
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Todos Traders
      </button>
    </Panel>
  )
}
