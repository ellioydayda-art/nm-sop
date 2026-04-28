'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CategoryIcon, IconLock, IconChevronRight, IconSettings } from '@/components/Icons';
import type { Category } from '@/lib/db';
import { createClient } from '@supabase/supabase-js';

interface DashboardContentProps {
  user: { name: string; email: string; role: string; categories: string[] };
  initialCategories: Category[];
}

interface CategoryRealtimeRow {
  slug: string;
  name: string;
  department: string;
  description: string;
  accent_hex: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function DashboardContent({ user, initialCategories }: DashboardContentProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    if (!supabaseUrl || !supabaseAnonKey) return;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const channel = supabase
      .channel('categories-live')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'categories' },
        payload => {
          const next = payload.new as CategoryRealtimeRow;
          if (!user.categories.includes('*') && !user.categories.includes(next.slug)) return;
          setCategories(prev => {
            const exists = prev.some(cat => cat.slug === next.slug);
            const mapped: Category = {
              slug: next.slug,
              name: next.name,
              department: next.department,
              description: next.description,
              accentHex: next.accent_hex,
            };
            if (!exists) return [...prev, mapped];
            return prev.map(cat => (cat.slug === next.slug ? mapped : cat));
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.categories]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetch('/api/admin/categories')
        .then(response => response.json())
        .then(data => {
          const nextCategories = Array.isArray(data.categories) ? (data.categories as Category[]) : [];
          const visible = nextCategories.filter(category => user.categories.includes('*') || user.categories.includes(category.slug));
          setCategories(visible);
        })
        .catch(() => {
          // Ignore periodic sync failures; live state keeps previous data.
        });
    }, 15000);

    return () => clearInterval(interval);
  }, [user.categories]);

  const grouped = useMemo(() => {
    const groupMap = new Map<string, Category[]>();
    categories.forEach(category => {
      const key = category.department;
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      const list = groupMap.get(key);
      if (list) {
        list.push(category);
      }
    });

    return Array.from(groupMap.entries())
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([department, list]) => ({
        department,
        items: [...list].sort((left, right) => left.name.localeCompare(right.name)),
      }));
  }, [categories]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-brand/8 top-[-20%] right-[-15%] animate-float-slow" />
        <div className="orb w-[350px] h-[350px] bg-accent/6 bottom-[-15%] left-[-5%] animate-float" style={{ animationDelay: '-4s' }} />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(155,141,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(155,141,255,0.7) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,229,168,0.75) 0px, rgba(0,229,168,0.75) 1px, transparent 1px, transparent 36px)",
          }}
        />
      </div>

      <main className="relative max-w-6xl mx-auto px-6 py-12 z-10">
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

        {categories.length > 0 && (
          <section className="mb-12 space-y-10">
            {grouped.map(group => (
              <div key={group.department}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-4 gradient-text">
                  {group.department}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((cat, i) => (
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

                      <div className="mt-5 flex items-center gap-1 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0" style={{ color: cat.accentHex }}>
                        <span>Open SOP</span>
                        <IconChevronRight size={12} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {categories.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-[var(--raised)] border border-[var(--border)] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconLock size={24} className="text-[var(--subtle)]" />
            </div>
            <p className="text-[var(--text)] font-semibold">No SOPs assigned</p>
            <p className="text-[var(--muted)] text-sm mt-1">Contact your administrator to get access</p>
          </div>
        )}

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
