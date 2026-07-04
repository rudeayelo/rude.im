# Project Notes

This is Rude Ayelo's personal experiment hub. Keep the homepage small,
visual, and durable; experiments may use any technology that can be linked
from the grid.

## Commands

- `npm run dev` starts local development.
- `npm run build` verifies the static build.
- `npm run preview` serves the built output.

## Experiments

- The homepage is the only standardized layer.
- Experiment entries live in `src/data/experiments.ts`.
- Required metadata: `title`, `description`, `href`, `status`, `tags`,
  `size`, and `media`.
- Optional metadata: `source`.
- Experiments can be plain folders under `public/experiments/`, Astro pages,
  or generated framework builds, as long as `href` works in production.
- Tiles show media and description only; `title` and `tags` are metadata.

## Commits

Use small, frequent conventional commits, for example:

- `chore: scaffold astro site`
- `docs: add project guidance`
- `feat: add experiment grid`
- `fix: improve theme toggle contrast`
