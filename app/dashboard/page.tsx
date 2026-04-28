import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getUserById, getCategories } from '@/lib/db';
import DashboardContent from '@/components/DashboardContent';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUserById(session.userId);
  if (!user) redirect('/login');

  const categories = await getCategories();
  const accessible = categories.filter(
    cat => user.categories.includes('*') || user.categories.includes(cat.slug)
  );

  return <DashboardContent user={{ name: user.name, email: user.email, role: user.role, categories: user.categories }} initialCategories={accessible} />;
}
