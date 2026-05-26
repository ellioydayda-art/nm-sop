import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserById } from "@/lib/db";

/**
 * GET /api/auth/me
 * Returns the current user's profile if authenticated.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ user: null }, { status: 401 });

  const profile = await getUserById(user.id);
  if (!profile) return NextResponse.json({ user: null }, { status: 401 });

  return NextResponse.json({
    user: {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role,
      categories: profile.categories,
    },
  });
}
