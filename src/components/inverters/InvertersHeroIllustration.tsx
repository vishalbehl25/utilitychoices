'use client';

import { cn } from '@/lib/cn';

const FAN_PIVOT = { x: 242.674, y: 194.451 };

/** Wix LottieEmbed comp-m6ugusr8 — inverter hero (fan spin + bolt flicker) */
export function InvertersHeroIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inverters-hero-lottie relative aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px]',
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        className="inverters-hero-lottie__animation size-full overflow-visible"
      >
        <defs>
          <clipPath id="inverters-hero-clip">
            <rect width="500" height="500" x="0" y="0" />
          </clipPath>
        </defs>
        <g clipPath="url(#inverters-hero-clip)">
          {/* Base */}
          <g transform="translate(248.048 380.504)">
            <path
              fill="none"
              stroke="#000"
              strokeWidth={16}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M106.845,-42.496 C106.845,-42.496 106.845,42.496 106.845,42.496 C106.845,42.496 -106.845,42.496 -106.845,42.496 C-106.845,42.496 -106.845,-42.496 -106.845,-42.496"
            />
            <g className="inverters-hero-base-dots" fill="#FF6A00">
              <circle cx={-54} cy={0} r={8} />
              <circle cx={-18} cy={0} r={8} />
              <circle cx={18} cy={0} r={8} />
              <circle cx={54} cy={0} r={8} />
            </g>
          </g>

          {/* Inverter shell */}
          <g transform="translate(243.798 207.57)">
            <path
              className="inverters-hero-body"
              fill="none"
              stroke="#000"
              strokeWidth={16}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M130.914,-89.937 C130.914,-89.937 130.914,128.937 130.914,128.937 C130.914,128.937 -130.914,128.937 -130.914,128.937 C-130.914,128.937 -130.914,-128.937 -130.914,-128.937 C-130.914,-128.937 61.585,-128.937 61.585,-128.937 C61.585,-128.937 95.087,-81.506 95.087,-81.506 C95.087,-81.506 130.914,-89.937 130.914,-89.937z"
            />
          </g>

          <g transform="translate(130.073 293.664)">
            <path
              fill="none"
              stroke="#000"
              strokeWidth={16}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M-8.882,0 C-8.882,0 8.882,0 8.882,0"
            />
          </g>

          {/* Fan — continuous clockwise rotation (Wix Lottie) */}
          <g transform={`translate(${FAN_PIVOT.x} ${FAN_PIVOT.y})`}>
            <g className="inverters-hero-fan">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="4s"
                repeatCount="indefinite"
              />
              <g transform={`translate(${-FAN_PIVOT.x} ${-FAN_PIVOT.y})`}>
                <g transform="translate(33.126 -0.5)">
                  <g transform="translate(209.548 194.951)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M70.593,0 C70.593,38.987 38.987,70.593 0,70.593 C-38.987,70.593 -70.593,38.987 -70.593,0 C-70.593,-38.987 -38.987,-70.593 0,-70.593 C38.987,-70.593 70.593,-38.987 70.593,0z"
                    />
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0,27.929 C-15.4,27.929 -27.929,15.4 -27.929,0 C-27.929,-15.4 -15.4,-27.929 0,-27.929 C15.4,-27.929 27.929,-15.4 27.929,0 C27.929,15.4 15.4,27.929 0,27.929z"
                    />
                  </g>
                  <g transform="translate(244.38 229.783)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.084,15.084 C15.084,15.084 -15.084,-15.084 -15.084,-15.084"
                    />
                  </g>
                  <g transform="translate(174.715 160.118)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.084,15.084 C15.084,15.084 -15.084,-15.084 -15.084,-15.084"
                    />
                  </g>
                  <g transform="translate(258.808 194.951)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.332,0 C21.332,0 -21.332,0 -21.332,0"
                    />
                  </g>
                  <g transform="translate(160.287 194.951)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.332,0 C21.332,0 -21.332,0 -21.332,0"
                    />
                  </g>
                  <g transform="translate(244.38 160.118)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.084,-15.084 C15.084,-15.084 -15.084,15.084 -15.084,15.084"
                    />
                  </g>
                  <g transform="translate(174.715 229.783)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.084,-15.084 C15.084,-15.084 -15.084,15.084 -15.084,15.084"
                    />
                  </g>
                  <g transform="translate(209.548 145.69)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0,-21.332 C0,-21.332 0,21.332 0,21.332"
                    />
                  </g>
                  <g transform="translate(209.548 244.212)">
                    <path
                      fill="none"
                      stroke="#FF6A00"
                      strokeWidth={16}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M0,-21.332 C0,-21.332 0,21.332 0,21.332"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>

          {/* Lightning bolt + sparks — flicker like Wix Lottie */}
          <g
            className="inverters-hero-bolt-group"
            transform="translate(430.136 106.72)"
          >
            <g className="inverters-hero-bolt">
              <path
                fill="none"
                stroke="#FF6A00"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.73,-31.952 C16.73,-31.952 -13.713,-1.509 -13.713,-1.509 C-13.713,-1.509 16.731,-1.509 16.731,-1.509 C16.731,-1.509 -16.731,31.952 -16.731,31.952"
              />
            </g>
            <g className="inverters-hero-sparks" fill="#FF6A00">
              <circle
                className="inverters-hero-spark inverters-hero-spark--1"
                cx={38}
                cy={-28}
                r={7}
              />
              <circle
                className="inverters-hero-spark inverters-hero-spark--2"
                cx={52}
                cy={-8}
                r={5}
              />
              <circle
                className="inverters-hero-spark inverters-hero-spark--3"
                cx={44}
                cy={12}
                r={6}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
