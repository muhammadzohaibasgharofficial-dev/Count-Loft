/**
 * Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the built sitemap.
 * Usage (after deploy):  npm run indexnow
 * Needs network access and the site to be live on https://countloft.site
 */
import { readFile } from 'node:fs/promises';

const HOST = 'countloft.site';
const KEY = '3dc37d8c72a9122169f8782f866652ea';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const xml = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error('No URLs found in dist/sitemap-0.xml — run "npm run build" first.');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
