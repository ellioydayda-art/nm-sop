'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/lib/db';
import { CategoryIcon, IconEdit } from './Icons';

interface CategoryEditorProps {
  initialCategories: Category[];
}

export default function CategoryEditor({ initialCategories }: CategoryEditorProps) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState('');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function startEdit(cat: Category) {
    setEditingSlug(cat.slug);
    setEditForm({ name: cat.name, description: cat.description });
    setError('');
  }

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  async function saveEdit(slug: string, formValues: { name: string; description: string }) {
    const trimmedName = formValues.name.trim();
    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }

    const currentCategory = categories.find(category => category.slug === slug);
    if (
      currentCategory &&
      currentCategory.name === trimmedName &&
      currentCategory.description === formValues.description
    ) {
      return;
    }

    setSaveState('saving');
    setError('');
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name: trimmedName, description: formValues.description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      setCategories(prev =>
        prev.map(c =>
          c.slug === slug
            ? { ...c, name: trimmedName, description: formValues.description }
            : c
        )
      );
      setEditForm({ name: trimmedName, description: formValues.description });
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1200);
      router.refresh();
    } catch (err: unknown) {
      setSaveState('idle');
      setError(err instanceof Error ? err.message : 'Update failed');
    }
  }

  function queueSave(slug: string, nextForm: { name: string; description: string }) {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      void saveEdit(slug, nextForm);
    }, 700);
  }

  function handleNameChange(slug: string, value: string) {
    const nextForm = { ...editForm, name: value };
    setEditForm(nextForm);
    setSaveState('idle');
    queueSave(slug, nextForm);
  }

  function handleDescriptionChange(slug: string, value: string) {
    const nextForm = { ...editForm, description: value };
    setEditForm(nextForm);
    setSaveState('idle');
    queueSave(slug, nextForm);
  }

  function flushSave(slug: string) {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    void saveEdit(slug, editForm);
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
                  onChange={e => handleNameChange(cat.slug, e.target.value)}
                  onBlur={() => flushSave(cat.slug)}
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
                    onClick={() => {
                      flushSave(cat.slug);
                      setEditingSlug(null);
                    }}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text)] px-2 py-1.5 rounded hover:bg-[var(--raised)] transition-all font-bold"
                  >
                    Done
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
                  onChange={e => handleDescriptionChange(cat.slug, e.target.value)}
                  onBlur={() => flushSave(cat.slug)}
                  className="input text-sm"
                  placeholder="SOP description"
                  rows={2}
                />
                <div className="mt-1 min-h-4">
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  {!error && saveState === 'saving' && <p className="text-[var(--subtle)] text-xs">Autosaving...</p>}
                  {!error && saveState === 'saved' && <p className="text-emerald-400 text-xs">Saved</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
