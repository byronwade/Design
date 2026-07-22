export const GET = () => new Response('User-agent: *\nAllow: /\nSitemap: https://design.byronwade.com/sitemap.xml\n', {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' },
});
