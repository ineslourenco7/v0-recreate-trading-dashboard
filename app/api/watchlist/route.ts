import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type WatchItem = {
  symbol: string
  name: string
  price: number
  changePct: number
  bias: "bullish" | "bearish" | "neutral"
}

const items: WatchItem[] = [
  { symbol: "XAUUSD", name: "Gold", price: 2341.2, changePct: 0.42, bias: "bullish" },
  { symbol: "BTCUSD", name: "Bitcoin", price: 68243, changePct: -0.18, bias: "neutral" },
  { symbol: "EURUSD", name: "Euro / Dollar", price: 1.0814, changePct: 0.08, bias: "bullish" },
  { symbol: "NAS100", name: "Nasdaq 100", price: 19420.5, changePct: -0.31, bias: "bearish" },
]

export async function GET() {
  return NextResponse.json({ items, updated_at: new Date().toISOString() })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const symbol = String(body.symbol || "").trim().toUpperCase()

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    item: {
      symbol,
      name: body.name || symbol,
      price: Number(body.price || 0),
      changePct: 0,
      bias: "neutral",
    },
  })
}
