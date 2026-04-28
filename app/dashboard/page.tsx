import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { getUserById, getCategories } from '@/lib/db';
import Navbar from '@/components/Navbar';
import { CategoryIcon, IconLock, IconChevronRight, IconSettings } from '@/components/Icons';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = getUserById(session.userId);
  if (!user) redirect('/login');

  const categories = getCategories();
  const accessible = categories.filter(
    cat => user.categories.includes('*') || user.categories.includes(cat.slug)
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-brand/8 top-[-20%] right-[-15%] animate-float-slow" />
        <div className="orb w-[350px] h-[350px] bg-accent/6 bottom-[-15%] left-[-5%] animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <main className="relative max-w-6xl mx-auto px-6 py-12 z-10">

        {/* Header */}
        <div className="mb-14 animate-slide-up">
          <p className="text-[var(--subtle)] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Welcome back</p>
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">{user.name}</span>
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-0.5 w-12 rounded-full" style={{ background: 'linear-gradient(90deg, var(--brand), var(--accent))' }} />
            <p className="text-[var(--subtle)] text-[11px] font-bold tracking-[0.22em] uppercase">Knowledge Base</p>
          </div>
        </div>

        {/* Accessible SOPs */}
        {accessible.length > 0 && (
          <section className="mb-12">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-5 gradient-text">
              Your SOPs
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessible.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/sop/${cat.slug}`}
                  className="group gradient-border card card-hover p-5 cursor-pointer"
                  style={{
                    animationName: 'slideUp',
                    animationDuration: '0.4s',
                    animationFillMode: 'both',
                    animationDelay: `${i * 60}ms`,
                    animationTimingFunction: 'ease-out',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon container */}
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${cat.accentHex}14`, borderColor: `${cat.accentHex}30` }}
                    >
                      <CategoryIcon slug={cat.slug} size={18} style={{ color: cat.accentHex } as React.CSSProperties} />
                    </div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        color: cat.accentHex,
                        backgroundColor: `${cat.accentHex}14`,
                        borderColor: `${cat.accentHex}30`,
                      }}
                    >
                      {cat.department}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[var(--text)] text-base mb-1.5 leading-snug group-hover:text-brand transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
                    style={{ color: cat.accentHex }}>
                    <span>Open SOP</span>
                    <IconChevronRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {accessible.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-[var(--raised)] border border-[var(--border)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconLock size={24} className="text-[var(--subtle)]" />
            </div>
            <p className="text-[var(--text)] font-semibold">No SOPs assigned</p>
            <p className="text-[var(--muted)] text-sm mt-1">Contact your administrator to get access</p>
          </div>
        )}

        {/* Admin quick link */}
        {user.role === 'admin' && (
          <div className="mt-16 pt-6 border-t border-[var(--border)]">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              <IconSettings size={14} />
              <span>Admin Panel</span>
              <IconChevronRight size={12} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
