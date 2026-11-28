# rude.im

Personal experiment hub for Rude Ayelo.

The homepage is currently a small header and intro prototype. Experiments are
intentionally loose: they can be static folders, Astro routes, or built output
from another framework as long as their `href` points to a working demo.

## Commands

```sh
npm run dev
npm run build
npm run preview
```

## Adding An Experiment

1. Add the demo under `public/experiments/` or create an Astro route.
2. Add visual media under `public/media/`.
3. Add an entry to `src/data/experiments.ts`.
4. Run `npm run build`.

Experiment metadata is kept in `src/data/experiments.ts` for future indexing.

## Deployment

The site is a static Astro build served by Cloudflare Workers with static
assets (worker `rude-im`, no Worker script). The config is `wrangler.jsonc`.

- Every pull request runs the `build` job in `.github/workflows/ci.yml`:
  `npm ci`, `npm run build` and `npx wrangler deploy --dry-run`.
- Every push to `main` runs `build`, then `deploy`, which runs
  `npx wrangler deploy` with the repository secrets `CLOUDFLARE_API_TOKEN`
  and `CLOUDFLARE_ACCOUNT_ID`. If either secret is missing, the job fails.
- `wrangler` is pinned as a dev dependency. Run the production setup locally
  with `npm run build && npx wrangler dev`.
- Unknown paths get `src/pages/404.astro` with HTTP 404
  (`not_found_handling: "404-page"`).
- `public/_headers` sets only security headers. Every file keeps the Workers
  default cache, `max-age=0, must-revalidate` with an ETag, so a changed
  font, logo or SDF never shows up stale next to fresh HTML. Hashed
  `/_astro/*` files get no long cache either: `_headers` matches the request
  URL, not the status, so a missing chunk's 404 page would be cached as
  immutable too.
- There is no Content-Security-Policy. The page uses inline theme scripts.
  The shader runtime imports chunks with `import()`, loads the SDF from a
  `blob:` URL, probes `new Function` and sends telemetry to `shaders.com`.
  A policy that allows all of that adds little protection, and a stricter one
  breaks the homepage.
- `rude.im` and `www.rude.im` are Worker custom domains. A Cloudflare
  redirect rule on the zone sends `www` to the apex with a 301. Assets-only
  Workers cannot redirect by hostname, so this rule is managed in the
  Cloudflare dashboard, not in this repository.
