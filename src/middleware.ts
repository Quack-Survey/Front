import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const username = request.cookies.get("username");

  if (
    username &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    !username &&
    !(
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup"
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images).*)",
  ],
};
