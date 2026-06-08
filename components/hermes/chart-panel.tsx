"use client"

import {
  Plus,
  Minus,
  TrendingUp,
  BarChart3,
  Type,
  Clock,
  Ruler,
  Search,
  Magnet,
  Undo2,
  Redo2,
  SlidersHorizontal,
  Settings2,
  Camera,
  Maximize2,
  GitCompareArrows,
} from "lucide-react"
import { Panel } from "./panel"
import { CandleChart } from "./charts/candle-chart"

const drawingTools = [Plus, TrendingUp, BarChart3, SlidersHorizontal, Magnet, TrendingUp, Type, Clock, Ruler, Search, Magnet]
const timeframes = ["1D", "5D", "1M", "3M", "6M", "YTD", "1A", "5A", "Todos"]

export function ChartPanel() {
  return (
    <Panel className="flex flex-col overflow-hidden p-0">
      {/* Chart header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">
            BTCUSD <span className="text-muted-foreground">· 15m · Binance</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <button type="button" aria-label="Indicadores" className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] hover:bg-secondary/60 hover:text-foreground">
            <GitCompareArrows className="h-3.5 w-3.5" /> Indicadores
          </button>
          {[Undo2, Redo2, Settings2, Camera, Maximize2].map((Icon, i) => (
            <button key={i} type="button" aria-label="Ferramenta do gráfico" className="rounded-md p-1 hover:bg-secondary/60 hover:text-foreground">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* OHLC line */}
      <div className="border-b border-border/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
        O <span className="text-foreground">68,210.5</span> H <span className="text-foreground">68,255.0</span> L{" "}
        <span className="text-foreground">68,190.0</span> C <span className="text-foreground">68,243.0</span>{" "}
        <span className="text-bull">+32.5 (+0.05%)</span>
      </div>

      {/* Chart body with vertical toolbar */}
      <div className="flex min-h-[300px] flex-1">
        <div className="flex w-10 shrink-0 flex-col items-center gap-1 border-r border-border/60 py-2 text-muted-foreground">
          {drawingTools.map((Icon, i) => (
            <button key={i} type="button" aria-label="Ferramenta de desenho" className="rounded-md p-1.5 hover:bg-secondary/60 hover:text-foreground">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 p-1">
          <CandleChart />
        </div>
      </div>

      {/* Footer: timeframes */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 px-3 py-1.5">
        <div className="flex items-center gap-0.5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              className="rounded px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span>11:45:15 (UTC+0)</span>
          <span className="hidden sm:inline">%</span>
          <span className="hidden sm:inline">log</span>
          <span className="hidden sm:inline">auto</span>
        </div>
      </div>
    </Panel>
  )
}
