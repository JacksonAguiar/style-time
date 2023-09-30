import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const dash = "/dashboard";
  const register = "/register";
  const start = "/"; //start
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  var protected_has_no_session = path === "/dashboard" || path == "/register";

  if (!session && protected_has_no_session) {
    console.log("go start");
    return NextResponse.redirect(new URL(start, req.url));
  } else if (session) {
    if (path == "/signin" || path == "/" || path == "/register") {
      const completeRegister = session.registerStep == 0;

      if (!completeRegister) {
        return NextResponse.redirect(
          new URL("/register?s=" + session.registerStep, req.url)
        );
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  // The above middleware would only run for the "/" path
  matcher: ["/", "/dashboard", "/signin", "/register"],
};
