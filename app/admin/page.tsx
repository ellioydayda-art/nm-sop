import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getUserById, getUsers, getCategories } from '@/lib/db';
import Navbar from '@/components/Navbar';
import AdminPanel from '@/components/AdminPanel';
import CategoryEditor from '@/components/CategoryEditor';

export default async function AdminPage() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/dashboard');

  const user = await getUserById(session.userId);
  if (!user) redirect('/login');

  const users = (await getUsers()).map(({ passwordHash: _, ...u }) => u);
  const categories = await getCategories();
  const totalAccess = users.reduce((sum, u) => sum + (u.categories.includes('*') ? categories.length : u.categories.length), 0);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-brand/6 top-[-10%] right-[-10%] animate-float-slow" />
        <div className="orb w-[300px] h-[300px] bg-red-500/4 bottom-[-10%] left-[-5%] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <main className="relative max-w-6xl mx-auto px-6 py-12 z-10">

        {/* Header */}
        <div className="mb-10 animate-slide-up">
          <p className="text-[var(--subtle)] text-xs font-black tracking-[0.2em] uppercase mb-2">NM Media Vault</p>
          <h1 className="text-4xl font-black text-[var(--text)] tracking-tight uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Admin Panel
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-0.5 w-12 rounded-full" style={{ background: 'linear-gradient(90deg, var(--brand), var(--accent))' }} />
            <p className="text-[var(--subtle)] text-[11px] font-bold tracking-[0.22em] uppercase">User Management</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-stagger-1">
          {[
            { label: 'Total Users', value: users.length, color: '#8b7ff8' },
            { label: 'SOPs Available', value: categories.length, color: '#06d6a0' },
            { label: 'Access Grants', value: totalAccess, color: '#f97316' },
          ].map(stat => (
            <div
              key={stat.label}
              className="card p-5 gradient-border"
              style={{ borderTop: `2px solid ${stat.color}` }}
            >
              <p className="text-3xl font-black text-[var(--text)]" style={{ fontFamily: 'Oswald, sans-serif' }}>{stat.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--subtle)] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="animate-stagger-2 space-y-8">
          <CategoryEditor initialCategories={categories} />
          <AdminPanel initialUsers={users} currentUserId={session.userId} categories={categories} />
        </div>
      </main>
    </div>
  );
}
