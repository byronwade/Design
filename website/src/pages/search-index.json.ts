import { searchIndex } from '../data/search';

export const GET = () => new Response(JSON.stringify(searchIndex), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  },
});
