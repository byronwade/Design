import { siteTokenCss } from '../data/site-tokens';

export function GET() {
  return new Response(`${siteTokenCss}\n`, {
    headers: {
      'content-type': 'text/css; charset=utf-8',
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
}
