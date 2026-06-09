"use client"

import Image from "next/image"
import { Check, Send } from "lucide-react"
import { Panel } from "./panel"
import { chatMessages } from "@/lib/dashboard-data"
import { useMemo, useState } from "react"

const onlineAvatars = [
  "/avatars/trader1.png",
  "/avatars/ines.png",
  "/avatars/trader2.png",
  "/avatars/trader3.png",
  "/avatars/trader1.png",
]

type RoomMessage = {
  time: string
  avatar: string
  name: string
  text: string
  done?: boolean
}

export function TradingRoomBar() {
  const initialMessages = useMemo<RoomMessage[]>(() => chatMessages.slice(0, 3), [])
  const [messages, setMessages] = useState<RoomMessage[]>(initialMessages)
  const [text, setText] = useState("")
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clean = text.trim()
    if (!clean) return

    const now = new Date()
    const message: RoomMessage = {
      time: now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      avatar: "/avatars/ines.png",
      name: "Inês",
      text: clean,
      done: true,
    }

    setMessages((current) => [message, ...current].slice(0, 5))
    setText("")
    setStatus("Mensagem registada localmente")

    try {
      await fetch("/api/room/messages", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: clean }),
      })
      setStatus("Mensagem enviada para a sala")
    } catch {
      setStatus("Sem servidor persistente: ficou guardada nesta sessão")
    }
  }

  return (
    <Panel className="p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="shrink-0">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Sala de Trading
          </h2>
          {status && <p className="mt-1 text-[10.5px] text-muted-foreground">{status}</p>}
        </div>

        <ul className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
          {messages.map((m, i) => (
            <li key={`${m.time}-${i}`} className="flex min-w-0 items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">{m.time}</span>
              <Image
                src={m.avatar || "/placeholder.svg"}
                alt={`Avatar de ${m.name}`}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span className="shrink-0 text-[12px] font-semibold">{m.name}</span>
              <span className="truncate text-[12px] text-muted-foreground">{m.text}</span>
              {m.done && <Check className="h-3.5 w-3.5 shrink-0 text-bull" />}
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p className="text-[10.5px] text-muted-foreground">Membros Online</p>
            <p className="text-sm font-bold text-bull">1,248</p>
          </div>
          <div className="flex -space-x-2" aria-hidden="true">
            {onlineAvatars.map((src, i) => (
              <Image
                key={i}
                src={src || "/placeholder.svg"}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border-2 border-background object-cover"
              />
            ))}
            <span className="flex h-6 items-center rounded-full border-2 border-background bg-secondary px-2 text-[10px] font-medium text-muted-foreground">
              +1242
            </span>
          </div>
        </div>

        <form className="flex shrink-0 items-center gap-2" aria-label="Enviar mensagem" onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escrever mensagem..."
            aria-label="Escrever mensagem"
            className="h-9 w-full min-w-[180px] rounded-lg border border-border/70 bg-secondary/50 px-3 text-sm outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/30 xl:w-56"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Panel>
  )
}
