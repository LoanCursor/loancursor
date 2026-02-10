import { NextResponse } from "next/server";

const COOKIE_NAME = "lc_access";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const code = String(body?.code || "").trim();

  // Support a few env var names so local + Vercel setups don't break.
  // Recommended: set ACCESS_CODE in Vercel env.
  const expected = String(
    process.env.ACCESS_CODE ||
      process.env.COMM_CODE ||
      process.env.COMMUNITY_CODE ||
      // Safe dev fallback so you can still get in locally.
      (process.env.NODE_ENV !== "production" ? "1234" : "")
  ).trim();

  const ok = expected.length > 0 && code === expected;

  const res = NextResponse.json({ ok });

  if (ok) {
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return res;
}