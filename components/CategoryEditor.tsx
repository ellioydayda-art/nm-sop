'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/lib/db';
import { CategoryIcon, IconEdit, IconCheck } from './Icons';

interface CategoryEditorProps {
  initialCategories: Category[];
}

export default function CategoryEditor({ initialCategories }: CategoryEditorProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function startEdit(cat: Category) {
    setEditingSlug(cat.slug);
    setEditForm({ name: cat.name, description: cat.description });
    setError('');
  }

  async function saveEdit(slug: string) {
    if (!editForm.name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name: editForm.name, description: editForm.description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      setCategories(prev =>
        prev.map(c =>
          c.slug === slug
            ? { ...c, name: editForm.name, description: editForm.description }
            : c
        )
      );
      setEditingSlug(null);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden border border-[var(--border)] rounded-2xl animate-slide-up" style={{ background: 'var(--surface)' }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]"
        style={{ background: 'linear-gradient(135deg, var(--raised) 0%, color-mix(in srgb, var(--raised) 85%, var(--accent)) 100%)' }}
      >
        <div>
          <h2 className="font-black text-[var(--text)] uppercase text-xl" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}>
            SOPs
          </h2>
          <p className="text-xs text-[var(--subtle)] mt-0.5 font-semibold uppercase tracking-widest">
            {categories.length} SOP{categories.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid px-6 py-3 border-b border-[var(--border)]" style={{ gridTemplateColumns: '40px 1fr 1fr 100px' }}>
        <span className="text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em]"></span>
        <span className="text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em]">Name</span>
        <span className="text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em]">Department</span>
        <span className="text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em]">Actions</span>
      </div>

      {/* Rows */}
      {categories.map(cat => (
        <div key={cat.slug} className="space-y-0">
          {/* Main row */}
          <div className="grid px-6 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--raised)]/40 transition-colors group"
            style={{ gridTemplateColumns: '40px 1fr 1fr 100px', alignItems: 'center' }}>

            {/* Icon */}
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${cat.accentHex}20` }}>
                <CategoryIcon slug={cat.slug} size={14} style={{ color: cat.accentHex } as React.CSSProperties} />
              </div>
            </div>

            {/* Name / Edit field */}
            <div>
              {editingSlug === cat.slug ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                  className="input text-sm"
                  placeholder="SOP name"
                />
              ) : (
                <div>
                  <p className="text-[var(--text)] font-semibold text-sm">{cat.name}</p>
                  <p className="text-[var(--muted)] text-xs mt-0.5 truncate">{cat.description}</p>
                </div>
              )}
            </div>

            {/* Department */}
            <span className="text-[var(--muted)] text-sm">{cat.department}</span>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {editingSlug === cat.slug ? (
                <>
                  <button
                    onClick={() => saveEdit(cat.slug)}
                    disabled={loading}
                    className="flex items-center gap-1 text-xs text-emerald-500 hover:text-emerald-400 px-2 py-1.5 rounded hover:bg-emerald-500/5 transition-all disabled:opacity-50"
                  >
                    <IconCheck size={12} />
                  </button>
                  <button
                    onClick={() => setEditingSlug(null)}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text)] px-2 py-1.5 rounded hover:bg-[var(--raised)] transition-all font-bold"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <button
                  onClick={() => startEdit(cat)}
                  className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--text)] px-2 py-1.5 rounded hover:bg-[var(--raised)] transition-all"
                >
                  <IconEdit size={12} /> Edit
                </button>
              )}
            </div>
          </div>

          {/* Description editor (when editing) */}
          {editingSlug === cat.slug && (
            <div className="px-6 pb-3 flex gap-2">
              <div className="w-10" />
              <div className="flex-1">
                <label className="block text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em] mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                  className="input text-sm"
                  placeholder="SOP description"
                  rows={2}
                />
                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
