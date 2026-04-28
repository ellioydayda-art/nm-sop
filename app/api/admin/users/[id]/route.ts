import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getSessionFromRequest } from '@/lib/auth';
import { updateUser, deleteUser, getUserById, getUserByEmail } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { name, email, password, role, categories } = await req.json();
  const updates: Record<string, unknown> = {};

  if (name) updates.name = name;
  if (email) {
    const existing = await getUserByEmail(email);
    if (existing && existing.id !== params.id) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    updates.email = email;
  }
  if (role) updates.role = role;
  if (categories) updates.categories = categories;
  if (password) updates.passwordHash = await bcrypt.hash(password, 10);

  const updated = await updateUser(params.id, updates);
  if (!updated) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const { passwordHash: _, ...safe } = updated;
  return NextResponse.json({ user: safe });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Prevent deleting self
  if (session.userId === params.id) {
    return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
  }

  const ok = await deleteUser(params.id);
  if (!ok) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ ok: true });
}
