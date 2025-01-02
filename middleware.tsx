import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/" ||
    path.startsWith("/linktree/");

  const token = request.cookies.get("accessToken")?.value;

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath && !path.startsWith("/linktree/")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (path === "/linktree") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/signup",
    "/",
    "/linktree/:username",
    "/linktree",
  ],
};
