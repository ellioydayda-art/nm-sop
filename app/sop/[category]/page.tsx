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
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H3',location:'app/sop/[category]/page.tsx:entry',message:'Entered SOP route',data:{category:params.category},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

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

  const baseSop = SOP_MAP[params.category];
  let override: Awaited<ReturnType<typeof getSopDocumentBySlug>> = null;
  try {
    override = await getSopDocumentBySlug(params.category);
  } catch (error: unknown) {
    // #region agent log
    fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H1',location:'app/sop/[category]/page.tsx:getSopDocumentBySlug:catch',message:'Error while loading override SOP content',data:{category:params.category,errorMessage:error instanceof Error ? error.message : 'unknown'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    throw error;
  }
  const sop = (override?.content as SOPDoc | undefined) ?? baseSop;
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H4',location:'app/sop/[category]/page.tsx:sop-selected',message:'Resolved SOP source',data:{category:params.category,hasBaseSop:Boolean(baseSop),hasOverride:Boolean(override?.content),resolved:Boolean(sop)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!sop) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar user={{ name: user.name, email: user.email, role: user.role }} />
      <SopViewer sop={sop} category={category} isAdmin={user.role === 'admin'} />
    </div>
  );
}
