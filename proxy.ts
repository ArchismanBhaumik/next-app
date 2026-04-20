import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "/profile"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*"],
};
