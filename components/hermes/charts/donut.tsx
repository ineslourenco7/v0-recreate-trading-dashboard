/**
 * Donut — a lightweight two/three-segment SVG donut chart.
 * Avoids a charting dependency for these simple ratio visuals.
 */
export function Donut({
  segments,
  size = 132,
  thickness = 14,
  children,
}: {
  segments: { value: number; color: string }[]
  size?: number
  thickness?: number
  children?: React.ReactNode
}) {
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  let offset = 0

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={thickness}
        />
        {segments.map((s, i) => {
          const length = (s.value / total) * circumference
          const dash = `${length} ${circumference - length}`
          const circle = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="transition-[stroke-dasharray] duration-700 ease-out"
            />
          )
          offset += length
          return circle
        })}
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  )
}
