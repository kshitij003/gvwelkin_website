import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server'; 

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/api/webhooks(.*)', 
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return NextResponse.next(); // Explicitly allow public routes
  }

  try {
    await auth().protect(); // Ensure this is correctly awaited
    return NextResponse.next(); // Continue the request after authentication
  } catch (error) {
    console.error("Authentication Error:", error);
    return new NextResponse("Unauthorized", { status: 401 }); // Handle errors properly
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
