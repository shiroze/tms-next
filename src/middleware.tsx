import { auth } from "~/libs/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from the login page
  if (req.auth && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Protect specific routes (e.g., /protected)
  if (!req.auth && pathname.startsWith("/admin")) {
    const callbackUrl = pathname;
    return NextResponse.redirect(new URL("/login?callbackUrl="+callbackUrl, req.url));
  }
  
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  // Allow other requests to proceed
  return NextResponse.next();
});


export const config = {
  matcher: ["/", "/login", "/admin/:path*"], // Apply middleware to these routes
};

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
// };