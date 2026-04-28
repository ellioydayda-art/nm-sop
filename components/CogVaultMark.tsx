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
        <linearGradient id="cog-stroke" x1="10" y1="10" x2="54" y2="54">
          <stop stopColor="#9B8DFF" />
          <stop offset="1" stopColor="#00E5A8" />
        </linearGradient>
        <radialGradient id="cog-bg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(32)">
          <stop stopColor="#131A30" />
          <stop offset="1" stopColor="#090C16" />
        </radialGradient>
      </defs>

      <rect x="6.5" y="6.5" width="51" height="51" rx="12" fill="url(#cog-bg)" />
      <rect x="6.5" y="6.5" width="51" height="51" rx="12" stroke="#2A2D45" />

      <g stroke="url(#cog-stroke)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="17.5" />
        <circle cx="32" cy="32" r="8.2" />
        <path d="M32 14.5V20.2" />
        <path d="M32 43.8V49.5" />
        <path d="M14.5 32H20.2" />
        <path d="M43.8 32H49.5" />
        <path d="M19.3 19.3L23.3 23.3" />
        <path d="M40.7 40.7L44.7 44.7" />
        <path d="M44.7 19.3L40.7 23.3" />
        <path d="M23.3 40.7L19.3 44.7" />
      </g>

      <g stroke="url(#cog-stroke)" strokeWidth="2.6" strokeLinecap="round">
        <path d="M22 22L30.2 30.2" />
        <path d="M42 22L33.8 30.2" />
        <path d="M22 42L30.2 33.8" />
        <path d="M42 42L33.8 33.8" />
      </g>

      <circle cx="32" cy="32" r="2.3" fill="#00E5A8" />
    </svg>
  );
}
