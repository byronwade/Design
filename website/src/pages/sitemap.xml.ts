import { catalog } from '../data/catalog';
import { reference } from '../data/reference';
import { showcase } from '../data/showcase';
import { skills } from '../data/skills';

const site = 'https://design.byronwade.com';
const routes = [
  '/', '/blocks/', '/catalog/', '/docs/', '/evaluate/', '/lab/', '/principles/', '/reference/', '/search/', '/showcase/', '/showcase/submit/', '/skills/', '/tools/',
  ...catalog.map((item) => `/catalog/${item.slug}/`),
  ...reference.map((item) => `/reference/${item.slug}/`),
  ...showcase.map((item) => `/showcase/${item.slug}/`),
  ...skills.map((item) => `/skills/${item.slug}/`),
];

export const GET = () => {
  const urls = routes.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
