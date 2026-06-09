"use client"

import Link from "next/link"
import { ReactNode } from "react"

export type ModulePageProps = {
  title: string
  eyebrow: string
  description: string
  status?: string
  children: ReactNode
}

export function ModulePage({ title, eyebrow, description, status = "Mock funcional", children }: ModulePageProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground transition hover:text-foreground">
            ← Voltar ao Cockpit
          </Link>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {status}
          </span>
        </div>

        <section className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
        </section>

        {children}
      </div>
    </main>
  )
}

export function ModuleCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
