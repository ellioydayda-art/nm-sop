import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Public paths that do not require authentication.
 * The /api/auth/login endpoint is kept public so the login page can POST to it.
 */
const PUBLIC_PATHS = ["/login", "/api/auth/login", "/api/auth/logout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through public routes without touching the session.
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Refresh the Supabase Auth session and get the current user.
  const { supabaseResponse, user } = await updateSession(request);

  // Redirect unauthenticated requests to the login page.
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Restrict admin routes to users with the admin role in app_metadata.
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin")
  ) {
    const role =
      typeof user.app_metadata?.role === "string"
        ? user.app_metadata.role
        : "user";

    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: return the supabaseResponse so Set-Cookie headers are forwarded.
  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static  (static assets)
     * - _next/image   (image optimisation)
     * - favicon.ico
     * - sop-assets    (public screenshot directory)
     * - common image file extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|sop-assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
