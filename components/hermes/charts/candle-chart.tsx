"use client"

/**
 * CandleChart — a self-contained SVG candlestick chart for the BTCUSD panel.
 * Candle data is generated deterministically (seeded) so the render is stable
 * between server and client, while still looking like a realistic price series.
 */

type Candle = { o: number; h: number; l: number; c: number }

// Simple seeded PRNG (mulberry32) for deterministic candles.
function makeCandles(count: number): Candle[] {
  let seed = 1337
  const rand = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  const candles: Candle[] = []
  let price = 67000
  for (let i = 0; i < count; i++) {
    const drift = (rand() - 0.42) * 220
    const o = price
    const c = Math.max(66200, Math.min(69200, o + drift))
    const h = Math.max(o, c) + rand() * 120
    const l = Math.min(o, c) - rand() * 120
    candles.push({ o, h, l, c })
    price = c
  }
  return candles
}

export function CandleChart() {
  const width = 920
  const height = 360
  const padTop = 16
  const padBottom = 28
  const padRight = 64

  const candles = makeCandles(64)
  const highs = candles.map((c) => c.h)
  const lows = candles.map((c) => c.l)
  const max = Math.max(...highs)
  const min = Math.min(...lows)
  const range = max - min || 1

  const plotW = width - padRight
  const plotH = height - padTop - padBottom
  const step = plotW / candles.length
  const candleW = Math.max(3, step * 0.58)

  const y = (price: number) => padTop + (1 - (price - min) / range) * plotH

  // Horizontal reference levels.
  const liqAbove = 68250
  const liqBelow = 66800
  const lastClose = candles[candles.length - 1].c

  const priceLabels = [69000, 68500, 68000, 67500, 67000, 66500, 66000]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Gráfico de velas BTCUSD 15 minutos"
    >
      {/* horizontal grid + price axis labels */}
      {priceLabels.map((p) => (
        <g key={p}>
          <line x1={0} y1={y(p)} x2={plotW} y2={y(p)} stroke="var(--border)" strokeOpacity={0.4} strokeWidth={1} />
          <text x={width - 6} y={y(p) + 3} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 9 }}>
            {p.toLocaleString("en-US", { minimumFractionDigits: 1 })}
          </text>
        </g>
      ))}

      {/* liquidity above (red) */}
      <line x1={0} y1={y(liqAbove)} x2={plotW} y2={y(liqAbove)} stroke="var(--bear)" strokeOpacity={0.7} strokeWidth={1} strokeDasharray="4 3" />
      <text x={6} y={y(liqAbove) - 5} className="fill-bear" style={{ fontSize: 9, fontWeight: 600 }}>
        Liquidez Acima
      </text>

      {/* liquidity below (green) */}
      <line x1={0} y1={y(liqBelow)} x2={plotW} y2={y(liqBelow)} stroke="var(--bull)" strokeOpacity={0.7} strokeWidth={1} strokeDasharray="4 3" />
      <text x={6} y={y(liqBelow) + 12} className="fill-bull" style={{ fontSize: 9, fontWeight: 600 }}>
        Liquidez Abaixo
      </text>

      {/* zone of interest box */}
      <rect x={plotW * 0.7} y={y(68250)} width={plotW * 0.3} height={y(67950) - y(68250)} fill="var(--bull)" fillOpacity={0.06} stroke="var(--bull)" strokeOpacity={0.25} strokeWidth={1} />
      <text x={plotW * 0.71} y={y(68100)} className="fill-foreground" style={{ fontSize: 9 }}>
        Zona de Interesse
      </text>

      {/* candles */}
      {candles.map((c, i) => {
        const cx = i * step + step / 2
        const bull = c.c >= c.o
        const color = bull ? "var(--bull)" : "var(--bear)"
        const top = y(Math.max(c.o, c.c))
        const bottom = y(Math.min(c.o, c.c))
        return (
          <g key={i}>
            <line x1={cx} y1={y(c.h)} x2={cx} y2={y(c.l)} stroke={color} strokeWidth={1} />
            <rect
              x={cx - candleW / 2}
              y={top}
              width={candleW}
              height={Math.max(1, bottom - top)}
              fill={color}
              rx={0.5}
            />
          </g>
        )
      })}

      {/* current price marker */}
      <line x1={0} y1={y(lastClose)} x2={plotW} y2={y(lastClose)} stroke="var(--bull)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="2 2" />
      <rect x={plotW} y={y(lastClose) - 9} width={padRight} height={18} fill="var(--bull)" rx={3} />
      <text x={plotW + padRight / 2} y={y(lastClose) + 3} textAnchor="middle" className="fill-background" style={{ fontSize: 9.5, fontWeight: 700 }}>
        68,200.0
      </text>

      {/* time axis labels */}
      {["12:00", "18", "12:00", "19", "12:00", "20", "12:00", "21"].map((t, i, arr) => (
        <text
          key={i}
          x={(plotW / (arr.length - 1)) * i}
          y={height - 8}
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontSize: 9 }}
        >
          {t}
        </text>
      ))}
    </svg>
  )
}
