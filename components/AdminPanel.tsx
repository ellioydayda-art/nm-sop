'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryIcon, IconPlus, IconEdit, IconTrash, IconCheck, IconLock } from './Icons';
import type { User, Category } from '@/lib/db';

type SafeUser = Omit<User, 'passwordHash'>;

interface AdminPanelProps {
  initialUsers: SafeUser[];
  currentUserId: string;
  categories?: Category[];
}

interface UserForm {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  categories: string[];
}

const EMPTY_FORM: UserForm = {
  email: '',
  password: '',
  name: '',
  role: 'user',
  categories: [],
};

export default function AdminPanel({ initialUsers, currentUserId, categories = [] }: AdminPanelProps) {
  const router = useRouter();
  const [users, setUsers] = useState<SafeUser[]>(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<SafeUser | null>(null);
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function openCreate() {
    setEditingUser(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowModal(true);
  }

  function openEdit(user: SafeUser) {
    setEditingUser(user);
    setForm({ email: user.email, password: '', name: user.name, role: user.role, categories: [...user.categories] });
    setError('');
    setShowModal(true);
  }

  function toggleCategory(slug: string) {
    setForm(prev => {
      if (prev.categories.includes('*')) return prev;
      return {
        ...prev,
        categories: prev.categories.includes(slug)
          ? prev.categories.filter(c => c !== slug)
          : [...prev.categories, slug],
      };
    });
  }

  function toggleAllAccess() {
    setForm(prev => ({ ...prev, categories: prev.categories.includes('*') ? [] : ['*'] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingUser) {
        const body: Record<string, unknown> = { name: form.name, email: form.email, role: form.role, categories: form.categories };
        if (form.password) body.password = form.password;
        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUsers(prev => prev.map(u => (u.id === editingUser.id ? data.user : u)));
      } else {
        const res = await fetch('/api/admin/users', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUsers(prev => [...prev, data.user]);
      }
      setShowModal(false);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setUsers(prev => prev.filter(u => u.id !== id));
      setDeleteConfirm(null);
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Users table */}
      <div className="overflow-hidden border border-[var(--border)] rounded-2xl animate-slide-up" style={{ background: 'var(--surface)' }}>

        {/* Table header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]"
          style={{ background: 'linear-gradient(135deg, var(--raised) 0%, color-mix(in srgb, var(--raised) 85%, var(--brand)) 100%)' }}
        >
          <div>
            <h2
              className="font-black text-[var(--text)] uppercase text-xl"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.5px' }}
            >
              Users
            </h2>
            <p className="text-xs text-[var(--subtle)] mt-0.5 font-semibold uppercase tracking-widest">
              {users.length} account{users.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
          >
            <IconPlus size={14} />
            Add user
          </button>
        </div>

        {/* Column headers */}
        <div className="grid px-6 py-3 border-b border-[var(--border)]"
          style={{ gridTemplateColumns: '1fr 1.5fr 100px 1fr 100px' }}>
          {['Name', 'Email', 'Role', 'SOP Access', 'Actions'].map(h => (
            <span key={h} className="text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em]">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {users.map((user, idx) => (
          <div
            key={user.id}
            className="grid px-6 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[var(--raised)]/40 transition-colors group"
            style={{ gridTemplateColumns: '1fr 1.5fr 100px 1fr 100px', alignItems: 'center' }}
          >
            {/* Name */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
                style={{
                  background: `${['#8b7ff8','#06d6a0','#f97316','#ec4899','#0ea5e9'][idx % 5]}20`,
                  color: ['#8b7ff8','#06d6a0','#f97316','#ec4899','#0ea5e9'][idx % 5],
                  fontFamily: 'Oswald, sans-serif',
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-[var(--text)] font-semibold text-sm">{user.name}</span>
            </div>

            {/* Email */}
            <span className="text-[var(--muted)] text-sm truncate pr-4">{user.email}</span>

            {/* Role */}
            <div>
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded"
                style={user.role === 'admin'
                  ? { color: '#9b8dff', background: '#9b8dff20' }
                  : { color: 'var(--muted)', background: 'var(--raised)' }
                }
              >
                {user.role}
              </span>
            </div>

            {/* SOP Access */}
            <div className="pr-4">
              {user.categories.includes('*') ? (
                <span className="text-xs text-emerald-500 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <IconCheck size={11} /> All SOPs
                </span>
              ) : user.categories.length === 0 ? (
                <span className="text-xs text-[var(--subtle)] flex items-center gap-1">
                  <IconLock size={11} /> No access
                </span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {user.categories.map((slug: string) => {
                    const cat = categories.find((c: Category) => c.slug === slug);
                    return (
                      <span
                        key={slug}
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ color: cat?.accentHex, background: `${cat?.accentHex}18` }}
                      >
                        {cat?.name ?? slug}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => openEdit(user)}
                className="flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--text)] px-2 py-1.5 rounded hover:bg-[var(--raised)] transition-all"
              >
                <IconEdit size={12} /> Edit
              </button>
              {user.id !== currentUserId && (
                <button
                  onClick={() => setDeleteConfirm(user.id)}
                  className="flex items-center gap-1 text-xs text-red-500/60 hover:text-red-400 px-2 py-1.5 rounded hover:bg-red-500/5 transition-all"
                >
                  <IconTrash size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div
            className="relative w-full max-w-md p-6 animate-slide-up border border-[var(--border)] rounded-2xl"
            style={{
              background: 'var(--surface)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,127,248,0.1)',
            }}
          >
            {/* Modal header */}
            <div className="mb-6 pb-4 border-b border-[var(--border)]">
              <h3
                className="text-xl font-black text-[var(--text)] uppercase"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {editingUser ? 'Edit User' : 'New User'}
              </h3>
              <div className="h-0.5 w-10 rounded-full mt-2" style={{ background: 'linear-gradient(90deg, var(--brand), var(--accent))' }} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Name">
                <input className="input" placeholder="Full name" value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
              </Field>

              <Field label="Email">
                <input type="email" className="input" placeholder="user@email.com" value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
              </Field>

              <Field label={editingUser ? 'New Password (blank = keep current)' : 'Password'}>
                <input type="password" className="input" placeholder="••••••••" value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required={!editingUser} />
              </Field>

              <Field label="Role">
                <select className="input" value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value as 'admin' | 'user' }))}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </Field>

              <Field label="SOP Access">
                <div className="space-y-1.5 p-3 bg-[var(--raised)] rounded-xl border border-[var(--border)]">
                  <AccessRow
                    checked={form.categories.includes('*')}
                    onToggle={toggleAllAccess}
                    color="var(--brand)"
                    label="All SOPs"
                    sub="Full access"
                  />
                  {!form.categories.includes('*') && (
                    <div className="pt-1.5 border-t border-[var(--border)] space-y-1">
                      {categories.map(cat => (
                        <AccessRow
                          key={cat.slug}
                          checked={form.categories.includes(cat.slug)}
                          onToggle={() => toggleCategory(cat.slug)}
                          color={cat.accentHex}
                          label={cat.name}
                          sub={cat.department}
                          icon={<CategoryIcon slug={cat.slug} size={12} style={{ color: cat.accentHex } as React.CSSProperties} />}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Field>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5 text-sm disabled:opacity-50">
                  {loading ? 'Saving…' : editingUser ? 'Save changes' : 'Create user'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-ghost text-sm px-4 py-2.5">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div
            className="relative w-full max-w-sm p-6 animate-slide-up border border-[var(--border)] rounded-2xl"
            style={{ background: 'var(--surface)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <IconTrash size={16} className="text-red-400" />
            </div>
            <h3 className="text-base font-bold text-[var(--text)] mb-1">Delete this user?</h3>
            <p className="text-[var(--muted)] text-sm mb-5">This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => handleDelete(deleteConfirm)} disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50">
                {loading ? 'Deleting…' : 'Delete'}
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost text-sm py-2.5">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-black text-[var(--subtle)] uppercase tracking-[0.18em] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function AccessRow({ checked, onToggle, color, label, sub, icon }: {
  checked: boolean; onToggle: () => void;
  color: string; label: string; sub: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-2.5 text-left px-2 py-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors"
    >
      <div
        className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all"
        style={checked ? { background: color, borderColor: color } : { borderColor: 'var(--border)' }}
      >
        {checked && <IconCheck size={10} className="text-white" />}
      </div>
      {icon}
      <span className="text-sm text-[var(--text)] font-medium flex-1">{label}</span>
      <span className="text-[10px] text-[var(--subtle)]">{sub}</span>
    </button>
  );
}
