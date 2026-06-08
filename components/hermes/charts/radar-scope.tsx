"use client"

/**
 * RadarScope — the "manipulation radar" visual: concentric rings, a rotating
 * sweep line, a central blip, and a few scattered detection dots.
 */
export function RadarScope({ size = 200 }: { size?: number }) {
  const center = size / 2
  const rings = [0.25, 0.5, 0.75, 1]
  // Scattered detections (relative coords -1..1 from center)
  const blips = [
    { x: 0.55, y: -0.35, r: 2.5 },
    { x: -0.4, y: 0.5, r: 2 },
    { x: 0.2, y: 0.62, r: 1.6 },
    { x: -0.62, y: -0.2, r: 1.8 },
    { x: 0.7, y: 0.18, r: 1.4 },
  ]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Radar de manipulação de mercado"
    >
      <defs>
        <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--bear)" stopOpacity="0.25" />
          <stop offset="70%" stopColor="var(--bear)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--bear)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="radar-sweep" x1="50%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="var(--bear)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--bear)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx={center} cy={center} r={center - 2} fill="url(#radar-glow)" />

      {/* concentric rings */}
      {rings.map((r, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={(center - 6) * r}
          fill="none"
          stroke="var(--bear)"
          strokeOpacity={0.18}
          strokeWidth={1}
        />
      ))}

      {/* cross hairs */}
      <line x1={center} y1={6} x2={center} y2={size - 6} stroke="var(--bear)" strokeOpacity={0.12} />
      <line x1={6} y1={center} x2={size - 6} y2={center} stroke="var(--bear)" strokeOpacity={0.12} />

      {/* rotating sweep */}
      <g className="animate-radar" style={{ transformOrigin: "center" }}>
        <path
          d={`M${center} ${center} L${size - 6} ${center} A${center - 6} ${center - 6} 0 0 0 ${center} 6 Z`}
          fill="url(#radar-sweep)"
        />
        <line x1={center} y1={center} x2={size - 6} y2={center} stroke="var(--bear)" strokeOpacity={0.5} strokeWidth={1.5} />
      </g>

      {/* detection blips */}
      {blips.map((b, i) => (
        <circle
          key={i}
          cx={center + b.x * (center - 14)}
          cy={center + b.y * (center - 14)}
          r={b.r}
          fill="var(--bull)"
          opacity={0.8}
        />
      ))}

      {/* center target */}
      <circle cx={center} cy={center} r={4} fill="var(--bear)" />
      <circle cx={center} cy={center} r={4} fill="none" stroke="var(--bear)" strokeWidth={1.5} className="animate-pulse-ring" style={{ transformOrigin: "center" }} />
    </svg>
  )
}
