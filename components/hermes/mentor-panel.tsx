import { Bot, Plus, Minus, RotateCcw } from "lucide-react"
import { Panel } from "./panel"
import { mentorTips } from "@/lib/dashboard-data"

export function MentorPanel() {
  return (
    <Panel className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          Mentor IA
        </h2>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
          <Bot className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-3 text-[15px] font-semibold">
        Olá, Inês! <span aria-hidden="true">👋</span>
      </p>
      <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
        Com base na tua performance recente, aqui está o meu feedback:
      </p>

      <ul className="mt-3 flex flex-1 flex-col gap-2.5">
        {mentorTips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-[12.5px] leading-relaxed">
            <span className="mt-0.5 shrink-0">
              {tip.icon === "plus" ? (
                <Plus className="h-3.5 w-3.5 text-bull" />
              ) : tip.icon === "minus" ? (
                <Minus className="h-3.5 w-3.5 text-warn" />
              ) : (
                <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </span>
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Ver Análise Completa
      </button>
    </Panel>
  )
}
