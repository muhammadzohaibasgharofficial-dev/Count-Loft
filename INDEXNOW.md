# IndexNow — pinging search engines after each deploy

IndexNow tells Bing, Yandex, Seznam, Naver (and others) that URLs changed.
**Google does not use IndexNow** — for Google rely on the sitemap + Search Console.

- Key: `3dc37d8c72a9122169f8782f866652ea`
- Key file (must stay live): https://countloft.site/3dc37d8c72a9122169f8782f866652ea.txt

## After every deploy
1. Make sure the new build is live on https://countloft.site
2. Run: `npm run build && npm run indexnow`
   (submits every URL in `dist/sitemap-0.xml`; HTTP 200/202 = accepted)

## Ping one URL by hand
`https://api.indexnow.org/indexnow?url=https://countloft.site/finance/loan-calculator&key=3dc37d8c72a9122169f8782f866652ea`

## Notes
- Do not delete or rename the key file in `public/`.
- To rotate the key: create a new `public/<newkey>.txt` containing only the key, and update `KEY` in `scripts/indexnow.mjs`.
