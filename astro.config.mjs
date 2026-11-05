import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getLastmod, normalizePath } from './src/data/content-dates.mjs';

const SITE = 'https://countloft.site';

/**
 * @astrojs/sitemap only emits /sitemap-index.xml and /sitemap-0.xml.
 * Many tools (and people) request /sitemap.xml, which would otherwise fall
 * through to the homepage on static hosts. This integration publishes a real
 * /sitemap.xml (a copy of the index) after the sitemap integration has run.
 */
const sitemapXmlAlias = () => ({
  name: 'sitemap-xml-alias',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const outDir = fileURLToPath(dir);
      try {
        await copyFile(join(outDir, 'sitemap-index.xml'), join(outDir, 'sitemap.xml'));
        logger.info('Created /sitemap.xml (copy of sitemap-index.xml)');
      } catch (err) {
        logger.warn(`Could not create /sitemap.xml: ${err.message}`);
      }
    },
  },
});

// https://astro.build/config
export default defineConfig({
  // Production domain. Keep in sync with src/lib/seo/site.ts
  site: SITE,

  output: 'static',
  trailingSlash: 'never',

  integrations: [
    // 404 page is noindex, so keep it out of the sitemap
    sitemap({
      // Keep noindex pages (404, search results, embed views) out of the sitemap
      filter: (page) => {
        const path = normalizePath(page);
        return path !== '/404' && path !== '/search' && !path.startsWith('/embed');
      },
      // One URL format everywhere: no trailing slash (root stays "/"),
      // plus a real <lastmod> taken from src/data/content-dates.mjs
      serialize(item) {
        const path = normalizePath(item.url);
        item.url = path === '/' ? `${SITE}/` : `${SITE}${path}`;
        item.lastmod = new Date(`${getLastmod(path)}T00:00:00Z`).toISOString();
        return item;
      },
    }),
    // must come AFTER sitemap() so sitemap-index.xml already exists
    sitemapXmlAlias(),
  ],

  build: {
    // Inline small stylesheets for faster first paint
    inlineStylesheets: 'auto',
  },
});
