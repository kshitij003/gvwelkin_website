import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from "@/utils/db";
import { Points } from "@/utils/schema";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error('Missing SIGNING_SECRET environment variable');
  }

  // Initialize Svix webhook with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get required headers from request
  const headerPayload = headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // Validate headers exist
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing Svix headers', { status: 400 });
  }

  // Get raw body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid signature', { status: 401 });
  }

  // Extract Clerk user ID from webhook payload
  const { id: userId } = evt.data;

  if (!userId) {
    return new Response('Unauthorized - Missing user ID', { status: 401 });
  }

  try {
    // Insert user into points database
    const result = await db.insert(Points).values({
      name: userId,
      point: 0,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User initialized with 0 points',
        data: result,
      }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Database operation failed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Database operation failed',
      }),
      { status: 500 }
    );
  }
}