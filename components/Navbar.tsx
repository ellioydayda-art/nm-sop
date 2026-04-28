'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { IconVault, IconSettings, IconSun, IconMoon, IconLogOut, IconUser } from './Icons';

interface NavbarProps {
  user: { name: string; email: string; role: string };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const { theme, toggle } = useTheme();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:bg-brand/20">
            <IconVault className="text-brand" size={15} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[var(--text)] text-sm tracking-tight">NM MEDIA</span>
            <span className="text-[10px] font-semibold tracking-[0.15em] gradient-text">VAULT</span>
          </div>
        </Link>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--raised)] transition-all duration-200"
          >
            {theme === 'dark'
              ? <IconSun size={15} />
              : <IconMoon size={15} />
            }
          </button>

          {/* Admin link */}
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--raised)] transition-all duration-200"
              aria-label="Admin panel"
            >
              <IconSettings size={15} />
            </Link>
          )}

          {/* Divider */}
          <div className="w-px h-5 bg-[var(--border)] mx-1" />

          {/* User avatar */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand/20 rounded-full flex items-center justify-center text-xs font-bold text-brand">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-[var(--muted)] hidden sm:block">{user.name}</span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            aria-label="Sign out"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <IconLogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}
