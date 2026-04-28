"use client";

function KoiFish({
  className,
  bodyColor,
  finColor,
}: {
  className: string;
  bodyColor: string;
  finColor: string;
}) {
  return (
    <div className={className}>
      <svg width="28" height="16" viewBox="0 0 56 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="23" cy="16" rx="15" ry="9.5" fill={bodyColor} />
        <ellipse cx="27" cy="16" rx="7" ry="4.2" fill={finColor} opacity="0.9" />
        <path d="M37 16L54 6V26L37 16Z" fill={finColor} />
        <circle cx="14" cy="14" r="1.4" fill="#0B1220" />
      </svg>
    </div>
  );
}

function ElegantKoiBox() {
  return (
    <div className="koiBox koiElegant">
      <div className="waterGlow" />
      <KoiFish className="koi koiOne" bodyColor="#f7f7ff" finColor="#8bb4ff" />
      <KoiFish className="koi koiTwo" bodyColor="#ffd8d8" finColor="#ff8fa3" />
    </div>
  );
}

function PlayfulKoiBox() {
  return (
    <div className="koiBox koiPlayful">
      <div className="waterGlow" />
      <KoiFish className="koi koiThree" bodyColor="#ffe38a" finColor="#ff8f3d" />
      <KoiFish className="koi koiFour" bodyColor="#c9fff1" finColor="#28d6b7" />
    </div>
  );
}

export default function KoiLogoConcepts() {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-2">Animated Koi Concepts</h2>
      <p className="text-[var(--muted)] mb-6">Two live animated concepts (inside a box) so you can feel the movement style.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--subtle)]">KOI A</span>
            <span className="badge text-xs border border-brand/30 bg-brand/10 text-brand">Elegant</span>
          </div>
          <div className="rounded-xl bg-[var(--raised)] border border-[var(--border)] flex items-center justify-center h-44 mb-4">
            <ElegantKoiBox />
          </div>
          <h3 className="font-semibold text-lg">Premium Calm Koi</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Smooth, slower paths with subtle glow and restrained colors.</p>
        </div>

        <div className="card border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-bold tracking-[0.2em] text-[var(--subtle)]">KOI B</span>
            <span className="badge text-xs border border-brand/30 bg-brand/10 text-brand">Playful</span>
          </div>
          <div className="rounded-xl bg-[var(--raised)] border border-[var(--border)] flex items-center justify-center h-44 mb-4">
            <PlayfulKoiBox />
          </div>
          <h3 className="font-semibold text-lg">Vivid Active Koi</h3>
          <p className="text-sm text-[var(--muted)] mt-1">Faster and brighter movement with a more energetic personality.</p>
        </div>
      </div>

      <style jsx>{`
        .koiBox {
          position: relative;
          width: 128px;
          height: 128px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(155, 141, 255, 0.35);
          background: radial-gradient(circle at 30% 20%, rgba(155, 141, 255, 0.25), transparent 55%),
            linear-gradient(160deg, #091327 0%, #0b0f1f 70%, #06080f 100%);
          box-shadow: inset 0 0 24px rgba(155, 141, 255, 0.12), 0 10px 24px rgba(0, 0, 0, 0.3);
        }

        .koiPlayful {
          border-color: rgba(0, 229, 168, 0.42);
          background: radial-gradient(circle at 70% 20%, rgba(0, 229, 168, 0.28), transparent 55%),
            linear-gradient(160deg, #08181f 0%, #0b1222 70%, #06080f 100%);
        }

        .waterGlow {
          position: absolute;
          inset: -20%;
          background: repeating-radial-gradient(circle, rgba(255, 255, 255, 0.06) 0px, rgba(255, 255, 255, 0.06) 1px, transparent 1px, transparent 7px);
          opacity: 0.2;
          animation: waterDrift 8s linear infinite;
        }

        .koi {
          position: absolute;
          transform-origin: center center;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.15));
          animation-name: tailPulse;
          animation-duration: 0.45s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in-out;
        }

        .koiOne {
          left: 10px;
          top: 18px;
          animation: swimOne 10s ease-in-out infinite, tailPulse 0.45s ease-in-out infinite alternate;
        }

        .koiTwo {
          left: 82px;
          top: 78px;
          animation: swimTwo 11.5s ease-in-out infinite, tailPulse 0.5s ease-in-out infinite alternate;
        }

        .koiThree {
          left: 16px;
          top: 84px;
          animation: swimThree 8.5s ease-in-out infinite, tailPulse 0.36s ease-in-out infinite alternate;
        }

        .koiFour {
          left: 84px;
          top: 14px;
          animation: swimFour 9.25s ease-in-out infinite, tailPulse 0.38s ease-in-out infinite alternate;
        }

        @keyframes tailPulse {
          from {
            transform: scaleX(1) scaleY(1);
          }
          to {
            transform: scaleX(1.05) scaleY(0.98);
          }
        }

        @keyframes waterDrift {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(-12px, 10px);
          }
        }

        @keyframes swimOne {
          0% { transform: translate(0, 0) rotate(20deg); }
          22% { transform: translate(56px, -12px) rotate(-35deg); }
          46% { transform: translate(72px, 36px) rotate(110deg); }
          73% { transform: translate(20px, 62px) rotate(190deg); }
          100% { transform: translate(0, 0) rotate(380deg); }
        }

        @keyframes swimTwo {
          0% { transform: translate(0, 0) rotate(210deg); }
          30% { transform: translate(-62px, -22px) rotate(140deg); }
          55% { transform: translate(-74px, -60px) rotate(40deg); }
          82% { transform: translate(-12px, -86px) rotate(-50deg); }
          100% { transform: translate(0, 0) rotate(-150deg); }
        }

        @keyframes swimThree {
          0% { transform: translate(0, 0) rotate(250deg); }
          25% { transform: translate(64px, -40px) rotate(170deg); }
          52% { transform: translate(54px, -88px) rotate(75deg); }
          77% { transform: translate(-8px, -78px) rotate(-20deg); }
          100% { transform: translate(0, 0) rotate(-90deg); }
        }

        @keyframes swimFour {
          0% { transform: translate(0, 0) rotate(30deg); }
          20% { transform: translate(-48px, 6px) rotate(90deg); }
          43% { transform: translate(-74px, 56px) rotate(170deg); }
          68% { transform: translate(-22px, 92px) rotate(250deg); }
          100% { transform: translate(0, 0) rotate(340deg); }
        }
      `}</style>
    </section>
  );
}
