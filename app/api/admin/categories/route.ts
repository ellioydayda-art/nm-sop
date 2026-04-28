import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getCategories, updateCategory } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json({ categories });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, name, description } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: 'Missing slug or name' }, { status: 400 });
    }

    const updated = await updateCategory(slug, { name, description });
    if (!updated) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update category' },
      { status: 500 }
    );
  }
}
