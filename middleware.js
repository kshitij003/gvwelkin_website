import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (isPublicRoute(request)) {
    return NextResponse.next(); // Allow public routes
  }

  const { userId } = auth();

  if (!userId) {
    // User is not authenticated → redirect to sign-in
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next(); // Authenticated → allow access
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // everything except static files
  ],
};
