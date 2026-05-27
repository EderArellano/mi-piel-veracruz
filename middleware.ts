import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

const PUBLIC_ROUTES = ["/", "/servicios", "/precios", "/nosotros", "/blog", "/contacto", "/agendar", "/login", "/register", "/forgot-password"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const ADMIN_ROUTES = ["/admin"];
const EMPLOYEE_ROUTES = ["/empleado"];

export default auth((req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  const isPublic = PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
  const isAuth = AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isEmployee = EMPLOYEE_ROUTES.some((r) => pathname.startsWith(r));

  if (isAuth && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!isPublic && !session) {
    return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }

  if (isAdmin && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isEmployee && !["ADMIN", "EMPLOYEE"].includes(session?.user?.role ?? "")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
