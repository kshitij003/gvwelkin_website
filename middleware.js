import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; // Ensure you import NextResponse

// Define routes that are protected
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/api/webhooks(.*)', 
]);



export default clerkMiddleware(async (auth, request) => {
  // For public routes, don't require authentication
  if (isPublicRoute(request)) {
    return;
  }
else {
    // Protect all other routes (except public) with general authentication
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
