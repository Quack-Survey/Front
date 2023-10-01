import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("hello");
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",
  ],
};
