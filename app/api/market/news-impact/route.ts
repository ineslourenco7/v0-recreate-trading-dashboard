const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/market/news-impact`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new Error(body?.detail || `HTTP ${res.status}`)
    }
    return Response.json(await res.json())
  } catch {
    return Response.json({
      items: [
        { event: "CPI m/m (MoM)", impact: "ALTO", time: "14:30" },
        { event: "Fed Chair Powell", impact: "ALTO", time: "19:00" },
        { event: "GDP QoQ", impact: "MÉDIO", time: "08:30" },
      ],
      updated_at: new Date().toISOString(),
    })
  }
}
