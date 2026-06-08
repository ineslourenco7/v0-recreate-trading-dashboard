"use client"

/**
 * Heatmap — a GitHub-style contribution grid representing daily trading activity.
 * Values are generated deterministically for a stable, realistic-looking pattern.
 */
export function Heatmap() {
  const weeks = 13
  const days = 7

  // Deterministic intensity values 0..4.
  const cells: number[] = []
  let seed = 7
  for (let i = 0; i < weeks * days; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    const v = seed / 0x7fffffff
    cells.push(v > 0.78 ? 4 : v > 0.6 ? 3 : v > 0.4 ? 2 : v > 0.18 ? 1 : 0)
  }

  const tones = [
    "var(--secondary)",
    "color-mix(in oklch, var(--bull) 28%, var(--secondary))",
    "color-mix(in oklch, var(--bull) 52%, var(--secondary))",
    "color-mix(in oklch, var(--bull) 78%, var(--secondary))",
    "var(--bull)",
  ]

  return (
    <div>
      <div className="mb-1.5 flex gap-3 pl-5 text-[10px] text-muted-foreground">
        <span>Mai</span>
        <span>Jun</span>
        <span>Jul</span>
      </div>
      <div className="flex gap-1">
        {/* weekday labels */}
        <div className="flex flex-col justify-between py-0.5 pr-0.5 text-[8px] text-muted-foreground">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
            <span key={i} className="leading-none">{d}</span>
          ))}
        </div>
        {/* grid */}
        <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
          {cells.map((v, i) => (
            <span
              key={i}
              className="h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125"
              style={{ backgroundColor: tones[v] }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
        <span>Menos</span>
        {tones.map((t, i) => (
          <span key={i} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: t }} />
        ))}
        <span>Mais</span>
      </div>
    </div>
  )
}
