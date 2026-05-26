import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

/**
 * Shape of the session data available throughout the app.
 * Role comes from auth.users app_metadata (set by the admin API) so it
 * is server-controlled and safe to trust without a DB round-trip.
 */
export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Returns the current session from the Supabase Auth cookie.
 * Safe to call from Server Components, Server Actions, and Route Handlers.
 * Returns null when the user is unauthenticated or the token is expired.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignore — middleware handles cookie writes.
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const role =
    typeof user.app_metadata?.role === "string"
      ? user.app_metadata.role
      : "user";

  return {
    userId: user.id,
    email: user.email ?? "",
    role,
  };
}

/**
 * Reads the session from a NextRequest object (for use in middleware and
 * Route Handlers where next/headers cookies() is not available).
 */
export async function getSessionFromRequest(
  req: NextRequest,
): Promise<SessionPayload | null> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll() {
          // Cookie writes from middleware must go through the response object,
          // not here. The middleware.ts updateSession helper handles that.
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const role =
    typeof user.app_metadata?.role === "string"
      ? user.app_metadata.role
      : "user";

  return {
    userId: user.id,
    email: user.email ?? "",
    role,
  };
}
