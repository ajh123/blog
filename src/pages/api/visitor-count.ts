import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

// instantiate once
const redis = new Redis({
  url:   import.meta.env.KV_REST_API_URL!,
  token: import.meta.env.KV_REST_API_TOKEN!,
});

export const GET: APIRoute = async () => {
    // read + bump in one request cycle
    const count = (await redis.get<number>('visitorCount')) || 0;
    await redis.set('visitorCount', count + 1);
    return new Response(
        JSON.stringify({ count }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
};
