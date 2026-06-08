import { Sidebar } from "@/components/hermes/sidebar"
import { TopBar } from "@/components/hermes/top-bar"
import { MarketScorePanel } from "@/components/hermes/market-score-panel"
import { ManipulationPanel } from "@/components/hermes/manipulation-panel"
import { LiquidityPanel } from "@/components/hermes/liquidity-panel"
import { NewsPanel } from "@/components/hermes/news-panel"
import { GlobalMapPanel } from "@/components/hermes/global-map-panel"
import { ChartPanel } from "@/components/hermes/chart-panel"
import { MentorPanel } from "@/components/hermes/mentor-panel"
import { ScenarioPanel } from "@/components/hermes/scenario-panel"
import { DiaryPanel } from "@/components/hermes/diary-panel"
import { TopSetupsPanel } from "@/components/hermes/top-setups-panel"
import { CopyTradingPanel } from "@/components/hermes/copy-trading-panel"
import { PerformancePanel } from "@/components/hermes/performance-panel"
import { TradingRoomBar } from "@/components/hermes/trading-room-bar"

export default function CockpitPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Sidebar — collapses on small screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <main className="scrollbar-thin flex-1 overflow-y-auto p-3 lg:p-4">
          {/* Page heading */}
          <div className="mb-3">
            <h1 className="text-lg font-bold tracking-wide text-balance">
              COCKPIT <span className="text-muted-foreground">· CENTRO DE GUERRA</span>
            </h1>
            <p className="text-[12px] text-muted-foreground">Visão global do mercado em tempo real</p>
          </div>

          {/*
            Main cockpit grid — 12 columns on xl to mirror the "war room" layout:
            • left rail (2): market score
            • center (7): top stat row, chart, and the four analysis panels
            • right rail (3): global map, mentor, performance
          */}
          {/*
            Region 1 — "war room" header band:
            • left rail (2): market score
            • center (7): top stat row + chart
            • right rail (3): global map + mentor
          */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-12">
            {/* Left rail */}
            <div className="flex flex-col gap-3 xl:col-span-2">
              <MarketScorePanel />
            </div>

            {/* Center column */}
            <div className="flex flex-col gap-3 lg:col-span-2 xl:col-span-7">
              {/* Top stat row */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <ManipulationPanel />
                <LiquidityPanel />
                <NewsPanel />
              </div>

              {/* Chart */}
              <ChartPanel />
            </div>

            {/* Right rail */}
            <div className="flex flex-col gap-3 lg:col-span-2 xl:col-span-3">
              <GlobalMapPanel />
              <MentorPanel />
            </div>
          </div>

          {/*
            Region 2 — analysis band:
            • the four analysis panels span the left 9 columns
            • performance aligns to the right 3 columns (mirrors the original)
          */}
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-12">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 lg:col-span-9">
              <ScenarioPanel />
              <DiaryPanel />
              <TopSetupsPanel />
              <CopyTradingPanel />
            </div>
            <div className="lg:col-span-3">
              <PerformancePanel />
            </div>
          </div>

          {/* Trading room bar */}
          <div className="mt-3">
            <TradingRoomBar />
          </div>
        </main>
      </div>
    </div>
  )
}
