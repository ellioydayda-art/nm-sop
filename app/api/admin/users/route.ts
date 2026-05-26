import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";
import { getUsers, createUser } from "@/lib/db";

/**
 * GET /api/admin/users
 * Returns all user profiles. Requires admin role.
 */
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await getUsers();
  return NextResponse.json({ users });
}

/**
 * POST /api/admin/users
 * Creates a new user in Supabase Auth and inserts a matching profile row.
 * Body: { email, password, name, role?, categories? }
 */
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await req.json()) as {
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    categories?: string[];
  };

  const { email, password, name, role, categories } = body;

  if (!email || !password || !name) {
    return NextResponse.json(
      { error: "email, password, and name are required" },
      { status: 400 },
    );
  }

  try {
    const user = await createUser({
      email,
      password,
      name,
      role: role === "admin" ? "admin" : "user",
      categories: categories ?? [],
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    // Supabase Auth returns "User already registered" for duplicate emails.
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
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
