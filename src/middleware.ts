import { auth } from "@/lib/auth";

const loggedOutRoutes = ["/login"];
const employeeRoutes = ["/profile"]; // TODO: adjust employee routes

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLoggedOutRoute = loggedOutRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isEmployeeRoute = employeeRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoutes = pathname.startsWith("/dashboard");
  const isRootRoute = pathname === "/";
  const isSuperAdmin = req.auth?.user.role === "SUPER_ADMIN";
  const nextUrlOrigin = req.nextUrl.origin;

  // Redirect unauthenticated users to login if they are accessing private routes
  if (!req.auth && !isLoggedOutRoute) {
    const newUrl = new URL("/login", nextUrlOrigin);
    return Response.redirect(newUrl);
  }

  // Redirect non-super-admin users away from /dashboard
  if (isAdminRoutes && !isSuperAdmin) {
    const newUrl = new URL("/", nextUrlOrigin);
    return Response.redirect(newUrl);
  }

  // Redirect super-admin users away from employee routes and root route
  if ((isEmployeeRoute || isRootRoute) && isSuperAdmin) {
    const newUrl = new URL("/dashboard", nextUrlOrigin);
    return Response.redirect(newUrl);
  }

  // Redirect authenticated users away from loggedOutRoutes
  if (req.auth && isLoggedOutRoute) {
    const newUrl = new URL(isSuperAdmin ? "/dashboard" : "/", nextUrlOrigin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
