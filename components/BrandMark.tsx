interface BrandMarkProps {
  size?: number;
  className?: string;
}

export default function BrandMark({ size = 44, className = "" }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nm-core" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9B8DFF" />
          <stop offset="1" stopColor="#00E5A8" />
        </linearGradient>
        <linearGradient id="nm-orbit" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C6BCFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#00E5A8" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="44" height="44" rx="15" fill="#0D0D1A" />
      <rect x="10.5" y="10.5" width="43" height="43" rx="14.5" stroke="url(#nm-core)" strokeOpacity="0.65" />

      <path d="M8 24C11 13 23 6 35 8" stroke="url(#nm-orbit)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56 40C53 51 41 58 29 56" stroke="url(#nm-orbit)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="39.5" cy="10" r="3.2" fill="#00E5A8" />
      <circle cx="24.5" cy="54" r="2.8" fill="#9B8DFF" />

      <path
        d="M20 43V21.5C20 20.7 20.9 20.2 21.6 20.6L31.9 27.5L42.4 20.6C43.1 20.2 44 20.7 44 21.5V43"
        stroke="url(#nm-core)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
