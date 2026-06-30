/** Wix about-section brand mark (overlapping circles + wordmark) */
export function AboutBrandMark() {
  return (
    <div
      id="about-brand-mark-inner"
      className="relative flex w-full max-w-[160px] items-center justify-center py-2 select-none max-[374px]:max-w-[140px] sm:max-w-[200px] md:-top-[10px] md:max-w-[220px] md:py-4"
      aria-hidden
    >
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Utility Choices"
        className="h-auto w-full max-w-[140px] sm:max-w-[200px] md:max-w-[220px]"
      >
        <g>
          <path
            fill="#fffdf2"
            d="M11.772 3.434c.64.64.377 1.941-.587 2.906-.965.965-2.266 1.227-2.906.587S7.9 4.985 8.866 4.02c.964-.965 2.265-1.228 2.906-.587"
          />
          <path
            d="M10.93 3.29q.42 0 .81.12a2.799 2.799 0 1 0-5.36 1.62c.27.89.97 1.59 1.87 1.87a2.8 2.8 0 0 1 2.68-3.61"
            fill="#1c62af"
          />
          <path
            d="M11.75 3.41A2.799 2.799 0 0 1 8.26 6.9a2.799 2.799 0 1 0 5.36-1.62c-.27-.89-.97-1.59-1.87-1.87"
            fill="#f26322"
          />
          <text
            transform="matrix(1.08 0 0 1 2.75 13.77)"
            fill="#101921"
            fontFamily="var(--font-nunito), 'Nunito Sans', sans-serif"
            fontSize="4.7"
            fontWeight="700"
          >
            <tspan y="0" x="0">
              Utili
            </tspan>
            <tspan y="0" x="9.05" letterSpacing=".01em">
              t
            </tspan>
            <tspan y="0" x="10.92" letterSpacing="0">
              y
            </tspan>
          </text>
          <text
            transform="matrix(1.08 0 0 1 2.63 17.74)"
            fill="#101921"
            fontFamily="var(--font-nunito), 'Nunito Sans', sans-serif"
            fontSize="3.88"
          >
            <tspan y="0" x="0">
              Choices
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
