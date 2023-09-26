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
    const completeLogin =
      (session.completeAuth && session.provider == "credentials") ||
      session.provider == "google";

    const completeRegister = session.registerStep == 0;

    if (!completeLogin) {
      return NextResponse.redirect(
        new URL("/login/password?wtk=false", req.url)
      );
    } else if (!completeRegister) {
      return NextResponse.redirect(
        new URL("/register?s=" + session.registerStep, req.url)
      );
    }

    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
export const config = {
  // The above middleware would only run for the "/" path
  matcher: [
    "/",
    "/dashboard",
    "/login",
    "/login/password",
    "/register"
  ],
};
