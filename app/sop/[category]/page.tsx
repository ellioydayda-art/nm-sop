import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getUserById, userHasAccess, getCategories, getSopDocumentBySlug } from '@/lib/db';
import metaAdsSOP from '@/data/sop/meta-ads';
import salesClosingSOP from '@/data/sop/sales-closing';
import contentCreationSOP from '@/data/sop/content-creation';
import clientOnboardingSOP from '@/data/sop/client-onboarding';
import Navbar from '@/components/Navbar';
import SopViewer from '@/components/SopViewer';
import StraightToKillSop from '@/components/StraightToKillSop';
import type { SOPDoc } from '@/data/sop/meta-ads';

const SOP_MAP: Record<string, SOPDoc> = {
  'media-buying':      metaAdsSOP,
  'sales-closing':     salesClosingSOP,
  'content-creation':  contentCreationSOP,
  'client-onboarding': clientOnboardingSOP,
};

export default async function SopPage({ params }: { params: { category: string } }) {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUserById(session.userId);
  if (!user) redirect('/login');

  const categories = await getCategories();
  const category = categories.find(c => c.slug === params.category);
  if (!category) notFound();

  if (!userHasAccess(user, params.category)) redirect('/dashboard');

  if (params.category === 'image-ads') {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
        <StraightToKillSop category={category} isAdmin={user.role === 'admin'} />
      </div>
    );
  }

  const baseSop = SOP_MAP[params.category];
  let override: Awaited<ReturnType<typeof getSopDocumentBySlug>> = null;
  try {
    override = await getSopDocumentBySlug(params.category);
  } catch {
    // Fail open: if the editable override store is unavailable,
    // still render the bundled SOP instead of crashing the page.
    override = null;
  }
  const sop = (override?.content as SOPDoc | undefined) ?? baseSop;
  if (!sop) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
      <SopViewer sop={sop} category={category} isAdmin={user.role === 'admin'} />
    </div>
  );
}
