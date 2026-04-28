"use client";

export default function CogVaultMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cog-stroke" x1="8" y1="8" x2="56" y2="56">
          <stop stopColor="#9B8DFF" />
          <stop offset="1" stopColor="#00E5A8" />
        </linearGradient>
      </defs>

      <g fill="url(#cog-stroke)">
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="30.5"
            y="3"
            width="3"
            height="8"
            rx="1"
            transform={`rotate(${i * 30} 32 32)`}
          />
        ))}
      </g>

      {/* Outer and inner gear rings */}
      <circle cx="32" cy="32" r="22" stroke="url(#cog-stroke)" strokeWidth="4" fill="none" />
      <circle cx="32" cy="32" r="13.5" stroke="url(#cog-stroke)" strokeWidth="3.6" fill="none" />

      {/* 6 spokes to mimic provided style */}
      <g stroke="url(#cog-stroke)" strokeWidth="3.8" strokeLinecap="round">
        <path d="M32 20V12.5" />
        <path d="M32 51.5V44" />
        <path d="M20 32H12.5" />
        <path d="M51.5 32H44" />
        <path d="M23.5 23.5L18 18" />
        <path d="M46 46L40.5 40.5" />
        <path d="M40.5 23.5L46 18" />
        <path d="M18 46L23.5 40.5" />
      </g>

      <circle cx="32" cy="32" r="5.6" fill="url(#cog-stroke)" />
    </svg>
  );
}
