import { auth } from "@/lib/auth";

const loggedOutRoutes = ["/login"];
// const userRoutes = ["/profile"]; // TODO: adjust employee routes

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isLoggedOutRoute = loggedOutRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // const isUserRoute = userRoutes.some((route) => pathname.startsWith(route));
  // const isAdminRoutes = pathname.startsWith("/dashboard");
  // const isRootRoute = pathname === "/";
  // const isAdmin = req.auth?.user.role === "ADMIN";
  // const isHR = req.auth?.user.role === "HR";
  const nextUrlOrigin = req.nextUrl.origin;

  // Redirect unauthenticated users to login if they are accessing private routes
  if (!req.auth && !isLoggedOutRoute) {
    const newUrl = new URL("/login", nextUrlOrigin);
    return Response.redirect(newUrl);
  }

  // Redirect authenticated users away from loggedOutRoutes
  // if (req.auth && isLoggedOutRoute) {
  //   const newUrl = new URL(isAdmin || isHR ? "/dashboard" : "/", nextUrlOrigin);
  //   return Response.redirect(newUrl);
  // }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
