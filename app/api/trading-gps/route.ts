export const runtime = "nodejs"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

export async function GET() {
  try {
    const upstream = await fetch(`${BACKEND_URL}/api/trading-gps`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })

    if (!upstream.ok) {
      // Fallback controlado para não deixar o cockpit vazio.
      return Response.json({
        ok: true,
        mock: true,
        verdict: "wait",
        zones: [
          { symbol: "BTCUSD", label: "Zona de liquidez (longs)", price: 67280 },
          { symbol: "BTCUSD", label: "Área de stop hunt", direction: "short", price: 68410 },
          { symbol: "XAUUSD", label: "Cluster de ordens", price: 2341 },
          { symbol: "EURUSD", label: "Zona de rejeição", price: 1.0814 },
          { symbol: "XAUUSD", label: "Bloco de liquidez", price: 2367 },
        ],
      })
    }

    return Response.json(await upstream.json())
  } catch {
    return Response.json({
      ok: false,
      mock: true,
      zones: [
        { symbol: "BTCUSD", label: "Zona de liquidez (longs)", price: 67280 },
        { symbol: "BTCUSD", label: "Área de stop hunt", direction: "short", price: 68410 },
      ],
    })
  }
}
