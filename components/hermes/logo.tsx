import type * as React from "react"

/**
 * HERMES brand mark — an abstract winged "H" rendered as inline SVG so it
 * inherits currentColor and stays crisp at any size.
 */
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* wings */}
      <path
        d="M24 12c-4-4-11-6-20-5 6 2 9 4 11 7-5-1-9-1-13 1 5 1 9 2 12 5-3 0-6 1-9 3 6 0 12-2 19-7Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M24 12c4-4 11-6 20-5-6 2-9 4-11 7 5-1 9-1 13 1-5 1-9 2-12 5 3 0 6 1 9 3-6 0-12-2-19-7Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* central crest */}
      <path
        d="M19 18h3v6h4v-6h3v18h-3v-9h-4v9h-3V18Z"
        fill="currentColor"
      />
    </svg>
  )
}
