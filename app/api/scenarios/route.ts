export async function GET() {
  return Response.json({
    symbol: "BTCUSD",
    probability_up: 62,
    probability_down: 38,
    expected_rr: 1.65,
    avg_duration_minutes: 205,
    scenarios: [
      { name: "TP", chance: "62%" },
      { name: "SL", chance: "38%" },
    ],
    updated_at: new Date().toISOString(),
  })
}
