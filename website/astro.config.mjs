import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://design.byronwade.com',
  trailingSlash: 'ignore',
  compressHTML: true,
  server: {
    host: true,
  },
  build: {
    format: 'directory',
  },
});
