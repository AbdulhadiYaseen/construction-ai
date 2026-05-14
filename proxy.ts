import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Extract persistent authorization token from request cookies
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Identify accessible non-authenticated gateway targets
  const isPublicPath = 
    pathname === "/login" || 
    pathname === "/signup" || 
    pathname.startsWith("/api/auth");

  // If an active user requests authorization screens, automatically bounce them to operational view
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If an unverified request targets internal workspace tools, securely redirect to login prompt
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Target specific route parameter matches to intercept
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/projects/:path*",
    "/planner/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
  ],
};
