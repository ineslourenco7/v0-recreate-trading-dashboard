const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

// Nota: ainda não existe endpoint no backend para Liquidez.
// Implementamos uma rota proxy preparada para futuro endpoint `.../api/market/liquidity`.
export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/market/liquidity`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
    if (!res.ok) throw new Error(await res.text().catch(() => "HTTP"))
    return Response.json(await res.json())
  } catch {
    return Response.json({
      symbol: "BTCUSD",
      above: 68250,
      below: 66800,
    })
  }
}
