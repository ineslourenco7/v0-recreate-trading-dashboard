const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8128"

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/journal`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new Error(body?.detail || `HTTP ${res.status}`)
    }
    const data = await res.json()
    const entries = Array.isArray(data?.entries) ? data.entries : []
    const mapped = entries.slice(0, 6).map((e: any) => ({
      date: e.created_at ?? new Date().toISOString(),
      text: e.text ?? "",
      tags: Array.isArray(e.tags) ? e.tags : [],
      insight: e.insight ?? "",
    }))
    return Response.json({ entries: mapped, updated_at: data?.updated_at ?? new Date().toISOString() })
  } catch {
    return Response.json({
      entries: [
        { date: new Date(Date.now() - 86400000).toISOString(), text: "Hoje controla o risco. Menos setups, mais rigor.", tags: ["risk", "discipline"], insight: "" },
        { date: new Date(Date.now() - 172800000).toISOString(), text: "Lucro consistente na sessão de Londres.", tags: ["win"], insight: "Manter stop curto no último setup." },
        { date: new Date(Date.now() - 259200000).toISOString(), text: "Recuperação após perda: respeitar pausa obrigatória.", tags: ["psychology"], insight: "" },
      ],
      updated_at: new Date().toISOString(),
    })
  }
}
