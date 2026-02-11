import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "lc_access";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access page + API + Next internals + public files
  if (
    pathname === "/access" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap") ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|txt|xml)$/)
  ) {
    return NextResponse.next();
  }

  const ok = req.cookies.get(COOKIE_NAME)?.value === "1";
  if (ok) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/access";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};