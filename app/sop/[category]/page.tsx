import { redirect, notFound } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getUserById, userHasAccess, getCategories } from '@/lib/db';
import metaAdsSOP from '@/data/sop/meta-ads';
import salesClosingSOP from '@/data/sop/sales-closing';
import contentCreationSOP from '@/data/sop/content-creation';
import clientOnboardingSOP from '@/data/sop/client-onboarding';
import customerSupportSOP from '@/data/sop/customer-support';
import automaticsalesOverviewSOP from '@/data/sop/automaticsales-overview';
import automaticsalesSessionUpdateSOP from '@/data/sop/automaticsales-session-update';
import automaticsalesWabaSOP from '@/data/sop/automaticsales-waba';
import automaticsalesBuilderSOP from '@/data/sop/automaticsales-builder';
import automaticsalesSalesSOP from '@/data/sop/automaticsales-sales';
import automaticsalesProjectRdpSOP from '@/data/sop/automaticsales-project-rdp';
import automaticsalesProjectCaeSOP from '@/data/sop/automaticsales-project-cae';
import Navbar from '@/components/Navbar';
import SopViewer from '@/components/SopViewer';
import StraightToKillSop from '@/components/StraightToKillSop';
import CustomerSupportSop from '@/components/CustomerSupportSop';
import type { SOPDoc } from '@/data/sop/meta-ads';

const SOP_MAP: Record<string, SOPDoc> = {
  'media-buying':                  metaAdsSOP,
  'sales-closing':                 salesClosingSOP,
  'content-creation':              contentCreationSOP,
  'client-onboarding':             clientOnboardingSOP,
  'customer-support':              customerSupportSOP,
  'automaticsales-overview':       automaticsalesOverviewSOP,
  'automaticsales-session-update': automaticsalesSessionUpdateSOP,
  'automaticsales-waba':           automaticsalesWabaSOP,
  'automaticsales-builder':        automaticsalesBuilderSOP,
  'automaticsales-sales':          automaticsalesSalesSOP,
  'automaticsales-project-rdp':    automaticsalesProjectRdpSOP,
  'automaticsales-project-cae':    automaticsalesProjectCaeSOP,
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
        <StraightToKillSop category={category} />
      </div>
    );
  }

  if (params.category === 'customer-support') {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
        <CustomerSupportSop category={category} />
      </div>
    );
  }

  const sop = SOP_MAP[params.category];
  if (!sop) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
      <SopViewer sop={sop} category={category} />
    </div>
  );
}
