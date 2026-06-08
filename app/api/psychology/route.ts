const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/psychology`, {
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
      score: 69,
      emotional_risk: 0.31,
      revenge_risk: 0.32,
      rules: [
        "Ativar pausa obrigatória de 30 minutos após impulso de recuperar ou 2 losses.",
        "Exigir pullback confirmado após candle grande/movimento perdido.",
      ],
      learned_signals: {
        sessions_seen: 6,
        blocked_or_closed: 6,
        revenge_notes: 0,
        fomo_notes: 2,
        emotional_notes: 0,
      },
      updated_at: new Date().toISOString(),
    })
  }
}
