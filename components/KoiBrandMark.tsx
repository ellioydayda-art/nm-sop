"use client";

export default function KoiBrandMark({ size = 30 }: { size?: number }) {
  return (
    <div
      className="koiMark"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="koiWater" />
      <div className="koiFish koiFishOne">
        <svg width="18" height="11" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="23" cy="16" rx="15" ry="9.5" fill="#F7F7FF" />
          <ellipse cx="27" cy="16" rx="7" ry="4.2" fill="#8BB4FF" opacity="0.9" />
          <path d="M37 16L54 6V26L37 16Z" fill="#8BB4FF" />
          <circle cx="14" cy="14" r="1.4" fill="#0B1220" />
        </svg>
      </div>
      <div className="koiFish koiFishTwo">
        <svg width="18" height="11" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="23" cy="16" rx="15" ry="9.5" fill="#FFD8D8" />
          <ellipse cx="27" cy="16" rx="7" ry="4.2" fill="#FF8FA3" opacity="0.9" />
          <path d="M37 16L54 6V26L37 16Z" fill="#FF8FA3" />
          <circle cx="14" cy="14" r="1.4" fill="#0B1220" />
        </svg>
      </div>

      <style jsx>{`
        .koiMark {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          background: linear-gradient(160deg, #091327 0%, #0b0f1f 70%, #06080f 100%);
          border: 1px solid rgba(155, 141, 255, 0.35);
          box-shadow: inset 0 0 10px rgba(155, 141, 255, 0.16);
        }

        .koiWater {
          position: absolute;
          inset: -20%;
          background: repeating-radial-gradient(
            circle,
            rgba(255, 255, 255, 0.08) 0px,
            rgba(255, 255, 255, 0.08) 1px,
            transparent 1px,
            transparent 7px
          );
          opacity: 0.26;
          animation: waterDrift 7s linear infinite;
        }

        .koiFish {
          position: absolute;
          transform-origin: center center;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.16));
        }

        .koiFishOne {
          left: -1px;
          top: 2px;
          animation: swimOne 7s ease-in-out infinite, tailPulse 0.45s ease-in-out infinite alternate;
        }

        .koiFishTwo {
          left: 11px;
          top: 16px;
          animation: swimTwo 8s ease-in-out infinite, tailPulse 0.5s ease-in-out infinite alternate;
        }

        @keyframes waterDrift {
          from { transform: translate(0, 0); }
          to { transform: translate(-9px, 7px); }
        }

        @keyframes tailPulse {
          from { transform: scaleX(1) scaleY(1); }
          to { transform: scaleX(1.05) scaleY(0.98); }
        }

        @keyframes swimOne {
          0% { transform: translate(0, 0) rotate(18deg); }
          28% { transform: translate(8px, 1px) rotate(-25deg); }
          57% { transform: translate(9px, 9px) rotate(95deg); }
          100% { transform: translate(0, 0) rotate(210deg); }
        }

        @keyframes swimTwo {
          0% { transform: translate(0, 0) rotate(210deg); }
          33% { transform: translate(-9px, -4px) rotate(140deg); }
          66% { transform: translate(-10px, -10px) rotate(45deg); }
          100% { transform: translate(0, 0) rotate(-65deg); }
        }
      `}</style>
    </div>
  );
}
