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
