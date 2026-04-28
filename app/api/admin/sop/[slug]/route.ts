import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';
import { getSopDocumentBySlug, upsertSopDocument } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const row = await getSopDocumentBySlug(params.slug);
    return NextResponse.json({ content: row?.content ?? null, updatedAt: row?.updated_at ?? null });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load SOP content' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || !('content' in body)) {
      return NextResponse.json({ error: 'Missing content' }, { status: 400 });
    }

    const row = await upsertSopDocument(params.slug, body.content);
    return NextResponse.json({ ok: true, updatedAt: row.updated_at });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save SOP content' },
      { status: 500 }
    );
  }
}
