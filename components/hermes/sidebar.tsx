"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Radar,
  BrainCircuit,
  GraduationCap,
  NotebookPen,
  MessagesSquare,
  Copy,
  CalendarDays,
  Globe,
  BookOpen,
  Settings,
  ShieldCheck,
} from "lucide-react"
import { navItems } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

// Map string keys from the data layer to actual icon components.
const icons = {
  LayoutDashboard,
  Radar,
  BrainCircuit,
  GraduationCap,
  NotebookPen,
  MessagesSquare,
  Copy,
  CalendarDays,
  Globe,
  BookOpen,
  Settings,
} as const

export function Sidebar() {
  const [active, setActive] = useState("Cockpit")

  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-border/70 bg-panel/40">
      {/* Brand */}
      <div className="flex h-[68px] items-center gap-2.5 px-5">
        <Logo className="h-7 w-7 text-primary" />
        <div className="leading-none">
          <p className="text-lg font-bold tracking-wide">HERMES</p>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trading Ecosystem
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons]
            const isActive = item.label === active
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setActive(item.label)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                    isActive
                      ? "bg-primary/10 text-foreground ring-1 ring-inset ring-primary/30"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium leading-tight">
                      {item.label}
                    </span>
                    <span className="block truncate text-[10.5px] leading-tight text-muted-foreground/80">
                      {item.sub}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Plan card */}
      <div className="p-3">
        <div className="rounded-xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Plano Elite</p>
              <p className="text-[11px] text-muted-foreground">Renova em 24 dias</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-3 w-full rounded-lg border border-border/70 bg-secondary/60 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Gerir Plano
          </button>
        </div>
      </div>
    </aside>
  )
}
