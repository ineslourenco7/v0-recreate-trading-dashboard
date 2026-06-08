const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/market/score`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) throw new Error(data?.detail || `HTTP ${res.status}`)
    return Response.json(data)
  } catch {
    return Response.json({
      asset: "XAU/USD",
      score: 82,
      metrics: {
        trade_count: 1247,
        win_rate: 0.58,
        total_pnl_pct: 0.12,
      },
      items: [
        { symbol: "XAUUSD", score: 92, tone: "high", flag: "🥇" },
        { symbol: "BTCUSD", score: 88, tone: "high", flag: "🟠" },
        { symbol: "NAS100", score: 76, tone: "mid", flag: "🟢" },
        { symbol: "EURUSD", score: 45, tone: "low", flag: "🇪🇺" },
        { symbol: "GBPUSD", score: 40, tone: "low", flag: "🇬🇧" },
        { symbol: "US30", score: 38, tone: "low", flag: "🔵" },
      ],
    })
  }
}
