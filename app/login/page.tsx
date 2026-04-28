'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconWarning } from '@/components/Icons';
import BrandMark from '@/components/BrandMark';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse at 60% 20%, #16103a 0%, #06060e 55%, #03080f 100%)' }}
    >

      {/* Vivid background orbs */}
      <div className="orb w-[600px] h-[600px] top-[-20%] right-[-15%] animate-float-slow"
        style={{ background: 'radial-gradient(circle, rgba(124,111,245,0.28) 0%, transparent 70%)' }} />
      <div className="orb w-[450px] h-[450px] bottom-[-15%] left-[-10%] animate-float"
        style={{ animationDelay: '-3s', background: 'radial-gradient(circle, rgba(0,212,154,0.18) 0%, transparent 70%)' }} />
      <div className="orb w-[300px] h-[300px] top-[35%] left-[10%] animate-float-slow"
        style={{ animationDelay: '-6s', background: 'radial-gradient(circle, rgba(255,107,107,0.10) 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(155,141,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(155,141,255,0.6) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Diagonal accent stripe */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(155,141,255,0.5) 0px, rgba(155,141,255,0.5) 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative w-full max-w-sm z-10">

        {/* Brand mark */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="mx-auto mb-6 w-20 h-20 rounded-[22px] flex items-center justify-center bg-[#0d0d1a]/85 border border-[#9b8dff]/25 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
            <BrandMark size={68} className="drop-shadow-[0_0_16px_rgba(155,141,255,0.35)]" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl font-black text-white tracking-tight">
              NM MEDIA{' '}
              <span
                style={{
                  background: 'linear-gradient(120deg, #9b8dff, #00e5a8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                VAULT
              </span>
            </h1>
            <p className="text-[#7070a0] text-sm font-medium tracking-wide">Internal SOP Knowledge Base</p>
          </div>
        </div>

        {/* Glass card */}
        <div
          className="rounded-2xl p-7 animate-stagger-1"
          style={{
            background: 'linear-gradient(145deg, rgba(20,18,45,0.85) 0%, rgba(14,12,30,0.9) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(155,141,255,0.2)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(155,141,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-[#6060a0] mb-2 tracking-[0.2em] uppercase">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#404060] focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(155,141,255,0.2)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,141,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(155,141,255,0.12), inset 0 1px 3px rgba(0,0,0,0.3)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(155,141,255,0.2)'; e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'; }}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#6060a0] mb-2 tracking-[0.2em] uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#404060] focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(155,141,255,0.2)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(155,141,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(155,141,255,0.12), inset 0 1px 3px rgba(0,0,0,0.3)'; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(155,141,255,0.2)'; e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'; }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm animate-fade-in"
                style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', color: '#ff8080' }}>
                <IconWarning size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all duration-200 active:scale-95 mt-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c6ff5 0%, #00d49a 100%)',
                boxShadow: '0 0 24px rgba(124,111,245,0.45), 0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <span
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #9b8dff 0%, #00e5a8 100%)' }}
              />
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in
                  </span>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </form>
        </div>

        <p className="text-center text-[#404060] text-xs mt-6 tracking-wide">
          Contact your administrator to get access
        </p>
      </div>
    </div>
  );
}
