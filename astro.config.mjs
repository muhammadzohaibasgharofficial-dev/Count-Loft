import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Confirm actual domain before deployment. This is a development placeholder only.
  // Do not connect DNS or deploy using this URL until the owner confirms the real domain.
  site: 'https://count-loft.com',

  output: 'static',
  trailingSlash: 'never',

  integrations: [sitemap()],

  build: {
    // Inline small stylesheets for faster first paint
    inlineStylesheets: 'auto',
  },
});
