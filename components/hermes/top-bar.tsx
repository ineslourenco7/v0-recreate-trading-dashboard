"use client"

import Image from "next/image"
import { Search, Bell, Mail, Settings, ChevronDown } from "lucide-react"
import { tickers } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

export function TopBar() {
  return (
    <header className="flex h-[68px] shrink-0 items-center gap-4 border-b border-border/70 bg-panel/40 px-4 lg:px-6">
      {/* Search */}
      <div className="relative hidden w-full max-w-[280px] shrink-0 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Procurar ativo..."
          aria-label="Procurar ativo"
          className="h-9 w-full rounded-lg border border-border/70 bg-secondary/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Live tickers */}
      <ul className="scrollbar-thin flex flex-1 items-center gap-5 overflow-x-auto lg:gap-7">
        {tickers.map((t) => (
          <li key={t.symbol} className="flex shrink-0 flex-col leading-tight">
            <span className="flex items-center gap-2 text-[11px]">
              <span className="font-semibold tracking-wide text-foreground">{t.symbol}</span>
              <span className={cn("font-medium", t.dir === "up" ? "text-bull" : "text-bear")}>
                {t.change}
              </span>
            </span>
            <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
              {t.price}
            </span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1.5">
        <IconButton label="Notificações" badge="12">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
        <IconButton label="Mensagens">
          <Mail className="h-[18px] w-[18px]" />
        </IconButton>
        <IconButton label="Definições">
          <Settings className="h-[18px] w-[18px]" />
        </IconButton>

        {/* Profile */}
        <button
          type="button"
          className="ml-1 flex items-center gap-2.5 rounded-lg border border-border/70 bg-secondary/50 py-1.5 pl-1.5 pr-2 transition-colors hover:bg-secondary"
        >
          <Image
            src="/avatars/ines.png"
            alt="Foto de perfil de Inês Traders"
            width={32}
            height={32}
            className="h-8 w-8 rounded-md object-cover"
          />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[13px] font-semibold">Inês Traders</span>
            <span className="block text-[10.5px] text-muted-foreground">Conta Real · MT5</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  )
}

function IconButton({
  children,
  label,
  badge,
}: {
  children: React.ReactNode
  label: string
  badge?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
    >
      {children}
      {badge && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-bear px-1 text-[9px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  )
}
