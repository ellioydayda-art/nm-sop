import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { updateUser, deleteUser } from "@/lib/db";

/**
 * PUT /api/admin/users/[id]
 * Updates user fields. Pass `password` (plain text) to change the password.
 * Requires admin role.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    categories?: string[];
  };

  const { name, email, password, role, categories } = body;
  const updates: Parameters<typeof updateUser>[1] = {};

  if (name) updates.name = name;
  if (email) updates.email = email;
  if (role) updates.role = role === "admin" ? "admin" : "user";
  if (categories) updates.categories = categories;
  if (password) updates.password = password;

  try {
    const updated = await updateUser(params.id, updates);
    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (
      message.toLowerCase().includes("already") ||
      message.toLowerCase().includes("registered")
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/users/[id]
 * Deletes a user from Supabase Auth (cascades to their profile row).
 * Requires admin role. Prevents self-deletion.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (session.userId === params.id) {
    return NextResponse.json(
      { error: "Cannot delete your own account" },
      { status: 400 },
    );
  }

  try {
    await deleteUser(params.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
