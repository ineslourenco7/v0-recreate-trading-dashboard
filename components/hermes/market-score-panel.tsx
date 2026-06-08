"use client"

import { X } from "lucide-react"
import { Panel, PanelHeader } from "./panel"
import { marketScore } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const ringTone: Record<string, string> = {
  high: "var(--bull)",
  mid: "var(--warn)",
  low: "var(--bear)",
}

const textTone: Record<string, string> = {
  high: "text-bull",
  mid: "text-warn",
  low: "text-bear",
}

export function MarketScorePanel() {
  return (
    <Panel className="flex flex-col p-3.5">
      <PanelHeader
        title="Score de Mercado"
        action={
          <button type="button" aria-label="Fechar painel" className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        }
      />
      <ul className="mt-3 flex flex-col gap-2.5">
        {marketScore.map((m) => (
          <li key={m.symbol} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/60 text-xs" aria-hidden="true">
              {m.flag}
            </span>
            <span className="flex-1 text-[13px] font-medium">{m.symbol}</span>
            <ScoreRing value={m.score} color={ringTone[m.tone]} />
            <span className={cn("w-7 text-right font-mono text-[13px] font-semibold tabular-nums", textTone[m.tone])}>
              {m.score}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-3.5 w-full rounded-lg border border-border/70 bg-secondary/40 py-2 text-xs font-medium transition-colors hover:bg-secondary"
      >
        Ver todos
      </button>
    </Panel>
  )
}

function ScoreRing({ value, color }: { value: number; color: string }) {
  const size = 26
  const stroke = 3
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dash = (value / 100) * c
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--secondary)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeLinecap="round"
        className="transition-[stroke-dasharray] duration-700"
      />
    </svg>
  )
}
