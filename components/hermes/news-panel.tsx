import { Calendar, Activity } from "lucide-react"
import { Panel } from "./panel"
import { newsItems } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

export function NewsPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Notícias de Impacto
        </h2>
        <Activity className="h-4 w-4 text-primary" />
      </div>

      <ul className="mt-3 flex flex-1 flex-col gap-3">
        {newsItems.map((n, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary/60 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
            </span>
            <span className="font-mono text-[12px] text-muted-foreground">{n.time}</span>
            <span className="flex-1 text-[12.5px] leading-tight">{n.title}</span>
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[10px] font-bold",
                n.impact === "ALTO" ? "bg-bear/15 text-bear" : "bg-warn/15 text-warn",
              )}
            >
              {n.impact}
            </span>
            <span className="w-14 text-right text-[10.5px] text-muted-foreground">{n.when}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver Calendário
      </button>
    </Panel>
  )
}
