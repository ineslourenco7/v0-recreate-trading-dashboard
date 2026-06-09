"use client"

import Image from "next/image"
import { Check, Send } from "lucide-react"
import { Panel } from "./panel"
import { chatMessages } from "@/lib/dashboard-data"
import { useEffect, useMemo, useState } from "react"

const onlineAvatars = [
  "/avatars/trader1.png",
  "/avatars/ines.png",
  "/avatars/trader2.png",
  "/avatars/trader3.png",
  "/avatars/trader1.png",
]

const STORAGE_KEY = "hermes-trading-room-local-messages"
const ASSETS = ["GLOBAL", "XAUUSD", "BTCUSD", "EURUSD", "NAS100"] as const

type Asset = (typeof ASSETS)[number]

type RoomMessage = {
  id: string
  time: string
  avatar: string
  name: string
  text: string
  asset: Asset
  done?: boolean
}

function normalizeAsset(value: string): Asset {
  const upper = value.toUpperCase()
  return ASSETS.includes(upper as Asset) ? (upper as Asset) : "GLOBAL"
}

function createInitialMessages(): RoomMessage[] {
  return chatMessages.slice(0, 3).map((message, index) => ({
    id: `seed-${index}`,
    time: message.time,
    avatar: message.avatar,
    name: message.name,
    text: message.text,
    asset: index === 0 ? "XAUUSD" : index === 1 ? "BTCUSD" : "GLOBAL",
    done: message.done,
  }))
}

export function TradingRoomBar() {
  const initialMessages = useMemo<RoomMessage[]>(() => createInitialMessages(), [])
  const [messages, setMessages] = useState<RoomMessage[]>(initialMessages)
  const [activeAsset, setActiveAsset] = useState<Asset>("GLOBAL")
  const [text, setText] = useState("")
  const [status, setStatus] = useState<string | null>("Modo local: pronto para Socket.io")

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (!saved) return

      const parsed = JSON.parse(saved) as RoomMessage[]
      if (Array.isArray(parsed)) {
        setMessages(
          parsed.map((message) => ({
            ...message,
            asset: normalizeAsset(message.asset || "GLOBAL"),
          })),
        )
      }
    } catch {
      setStatus("Não foi possível ler o histórico local")
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      setStatus("Histórico local indisponível")
    }
  }, [messages])

  const visibleMessages = useMemo(() => {
    if (activeAsset === "GLOBAL") return messages
    return messages.filter((message) => message.asset === activeAsset || message.asset === "GLOBAL")
  }, [activeAsset, messages])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clean = text.trim()
    if (!clean) return

    const now = new Date()
    const message: RoomMessage = {
      id: `local-${now.getTime()}`,
      time: now.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }),
      avatar: "/avatars/ines.png",
      name: "Inês",
      text: clean,
      asset: activeAsset,
      done: true,
    }

    setMessages((current) => [message, ...current].slice(0, 20))
    setText("")
    setStatus(`Mensagem local em ${activeAsset}`)
  }

  return (
    <Panel className="p-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="shrink-0">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Sala Global
          </h2>
          {status && <p className="mt-1 text-[10.5px] text-muted-foreground">{status}</p>}
        </div>

        <div className="flex shrink-0 flex-wrap gap-1" aria-label="Selecionar ativo da sala">
          {ASSETS.map((asset) => (
            <button
              key={asset}
              type="button"
              onClick={() => {
                setActiveAsset(asset)
                setStatus(`Ativo selecionado: ${asset}`)
              }}
              className={`rounded-full border px-2.5 py-1 text-[10.5px] font-semibold transition ${
                activeAsset === asset
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {asset}
            </button>
          ))}
        </div>

        <ul className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-5">
          {visibleMessages.slice(0, 5).map((m) => (
            <li key={m.id} className="flex min-w-0 items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">{m.time}</span>
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[9.5px] font-bold text-muted-foreground">
                {m.asset}
              </span>
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
            placeholder={`Mensagem em ${activeAsset}...`}
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
