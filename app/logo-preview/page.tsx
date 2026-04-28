import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getSession } from '@/lib/auth';
import { getUserById } from '@/lib/db';

function ConceptA({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="a-core" x1="10" y1="10" x2="54" y2="54">
          <stop stopColor="#9B8DFF" />
          <stop offset="1" stopColor="#00E5A8" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="44" height="44" rx="14" fill="#0D0D1A" />
      <rect x="10.5" y="10.5" width="43" height="43" rx="13.5" stroke="url(#a-core)" strokeOpacity="0.7" />
      <path d="M8 24C11 13 23 6 35 8" stroke="url(#a-core)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M56 40C53 51 41 58 29 56" stroke="url(#a-core)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 43V21.5L32 29L44 21.5V43" stroke="url(#a-core)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConceptB({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="b-stroke" x1="12" y1="12" x2="52" y2="52">
          <stop stopColor="#8F83FF" />
          <stop offset="1" stopColor="#25DBFF" />
        </linearGradient>
      </defs>
      <rect x="9" y="9" width="46" height="46" rx="12" fill="#0C1022" />
      <rect x="9.5" y="9.5" width="45" height="45" rx="11.5" stroke="#2A3559" />
      <path d="M20 40V24L32 36L44 24V40" stroke="url(#b-stroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 22C18 17.6 21.6 14 26 14H38C42.4 14 46 17.6 46 22" stroke="url(#b-stroke)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="22" r="2" fill="#25DBFF" />
    </svg>
  );
}

function ConceptC({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="16" fill="#120E24" />
      <rect x="8.5" y="8.5" width="47" height="47" rx="15.5" stroke="#3B2F6E" />
      <path d="M16 34C16 24 23 16 33 16H48V30C48 40 41 48 31 48H16V34Z" fill="#9B8DFF" fillOpacity="0.9" />
      <path d="M48 30V48H30C20 48 16 40 16 34C16 27 22 20 30 20H48V30Z" fill="#00E5A8" fillOpacity="0.75" />
      <path d="M22 40L30 24L38 40" stroke="#0E1020" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 25V39" stroke="#0E1020" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function ConceptD({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="d-line" x1="14" y1="14" x2="50" y2="50">
          <stop stopColor="#A497FF" />
          <stop offset="1" stopColor="#00E5A8" />
        </linearGradient>
      </defs>
      <rect x="11" y="11" width="42" height="42" rx="14" fill="#0D0D1A" />
      <rect x="11.5" y="11.5" width="41" height="41" rx="13.5" stroke="#2D2D45" />
      <path d="M20 43V30C20 23.4 25.4 18 32 18C38.6 18 44 23.4 44 30V43" stroke="url(#d-line)" strokeWidth="3.8" strokeLinecap="round" />
      <path d="M20 38L28 30L36 38L44 30" stroke="url(#d-line)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="25" r="2.5" fill="#00E5A8" />
    </svg>
  );
}

function ConceptE({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="24" fill="#111827" />
      <circle cx="32" cy="32" r="18" stroke="#F59E0B" strokeWidth="4" />
      <path d="M22 38V26L32 34L42 26V38" stroke="#FCD34D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="2.5" fill="#F59E0B" />
    </svg>
  );
}

function ConceptF({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="10" width="44" height="44" rx="8" fill="#0A0A0A" />
      <path d="M18 44L26 20L32 34L38 20L46 44" stroke="#E5E7EB" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 50H46" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ConceptG({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#052E2B" />
      <path d="M16 22L32 14L48 22V42L32 50L16 42V22Z" stroke="#34D399" strokeWidth="3" />
      <path d="M22 40V24L32 32L42 24V40" stroke="#6EE7B7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConceptH({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="16" fill="#1E1B4B" />
      <path d="M16 38C16 25 25 16 38 16H48V26C48 39 39 48 26 48H16V38Z" fill="#818CF8" />
      <path d="M22 40L30 24L38 40" stroke="#EEF2FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConceptI({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="12" fill="#3F0D12" />
      <rect x="15" y="15" width="34" height="34" rx="10" stroke="#FB7185" strokeWidth="3" />
      <path d="M22 40V24L32 32L42 24V40" stroke="#FBCFE8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="48" cy="16" r="3" fill="#FB7185" />
    </svg>
  );
}

function ConceptJ({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="j-bg" x1="8" y1="8" x2="56" y2="56">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="18" fill="url(#j-bg)" />
      <path d="M18 40L25 24L32 36L39 24L46 40" stroke="#082F49" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 45H46" stroke="#0C4A6E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ConceptK({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="24" fill="#172554" />
      <path d="M20 20H44V44H20V20Z" stroke="#93C5FD" strokeWidth="3" />
      <path d="M20 44L32 28L44 44" stroke="#BFDBFE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="28" r="2.5" fill="#93C5FD" />
    </svg>
  );
}

function ConceptL({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="10" fill="#18181B" />
      <path d="M16 24H48" stroke="#A1A1AA" strokeWidth="2.5" />
      <path d="M16 32H48" stroke="#A1A1AA" strokeWidth="2.5" />
      <path d="M16 40H48" stroke="#A1A1AA" strokeWidth="2.5" />
      <path d="M20 44V20L32 32L44 20V44" stroke="#FAFAFA" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConceptM({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="16" fill="#2A0E2E" />
      <path d="M14 34C14 22.95 22.95 14 34 14H50V30C50 41.05 41.05 50 30 50H14V34Z" fill="#E879F9" fillOpacity="0.9" />
      <path d="M22 40V24L32 34L42 24V40" stroke="#FAE8FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="14" r="3" fill="#C084FC" />
    </svg>
  );
}

function ConceptN({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="8" y="8" width="48" height="48" rx="18" fill="#052E16" />
      <path d="M16 40L24 24L32 36L40 24L48 40" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 46H44" stroke="#86EFAC" strokeWidth="3" strokeLinecap="round" />
      <circle cx="16" cy="22" r="2.5" fill="#22C55E" />
      <circle cx="48" cy="22" r="2.5" fill="#22C55E" />
    </svg>
  );
}

export default async function LogoPreviewPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUserById(session.userId);
  if (!user) redirect('/login');

  const options = [
    { id: 'A', name: 'Futuristic Orbit NM', description: 'Best if you want energetic + premium.', Preview: ConceptA },
    { id: 'B', name: 'Geometric Vault Core', description: 'Best if you want clean + corporate.', Preview: ConceptB },
    { id: 'C', name: 'Playful Neon Badge', description: 'Best if you want fun + startup vibe.', Preview: ConceptC },
    { id: 'D', name: 'Minimal Lock Glyph', description: 'Best if you want modern + minimal.', Preview: ConceptD },
    { id: 'E', name: 'Amber Solar Ring', description: 'Bold warm palette, energetic and memorable.', Preview: ConceptE },
    { id: 'F', name: 'Monochrome Editorial', description: 'High-contrast black/white, timeless premium.', Preview: ConceptF },
    { id: 'G', name: 'Emerald Hex Vault', description: 'Security-first hex style with green trust tones.', Preview: ConceptG },
    { id: 'H', name: 'Indigo Blob Mark', description: 'Soft modern blob form, artistic tech feel.', Preview: ConceptH },
    { id: 'I', name: 'Rose Neon Frame', description: 'Fashion-forward magenta/rose identity.', Preview: ConceptI },
    { id: 'J', name: 'Sky Gradient Wave', description: 'Fresh cyan/blue gradient with confident feel.', Preview: ConceptJ },
    { id: 'K', name: 'Blueprint Grid', description: 'Structured engineering look, very clean.', Preview: ConceptK },
    { id: 'L', name: 'Brutalist Lines', description: 'Minimal industrial style with strong geometry.', Preview: ConceptL },
    { id: 'M', name: 'Violet Pop Badge', description: 'Playful purple mark with standout contrast.', Preview: ConceptM },
    { id: 'N', name: 'Forest Pulse', description: 'Natural green identity, calm but modern.', Preview: ConceptN },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Logo Preview</h1>
        <p className="text-[var(--muted)] mb-8">Pick one option and tell me the letter. I will apply it everywhere.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map(({ id, name, description, Preview }) => (
            <div key={id} className="card border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold tracking-[0.2em] text-[var(--subtle)]">OPTION {id}</span>
                <span className="badge text-xs border border-brand/30 bg-brand/10 text-brand">Use {id}</span>
              </div>
              <div className="rounded-xl bg-[var(--raised)] border border-[var(--border)] flex items-center justify-center h-40 mb-4">
                <Preview size={110} />
              </div>
              <h2 className="font-semibold text-lg">{name}</h2>
              <p className="text-sm text-[var(--muted)] mt-1">{description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
