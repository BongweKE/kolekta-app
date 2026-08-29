# KOLEKTA — Project Agent Guide

Tax compliance web application for Kenya's independent workers and creatives.

## Repo Layout
- `frontend/` — Next.js app (App Router, TS). See `frontend/AGENTS.md` for Next.js-specific rules.
- `backend/` — Express API server
- `studio/` — Sanity Studio (standalone, repo root; sibling to `frontend/`)
- `docs/` — Internal documentation

## Sanity CMS
- **Project:** kolekta — id `pg78qsiy` (org `ow02tlfnv`)
- **Dataset:** `production`
- **Studio:** standalone at repo root `studio/`. Keep it standalone — do NOT embed into the app.
- **Auth:** use a robot API token for CLI/API work. It is stored locally in the repo-root
  `.env.local` (gitignored) as `SANITY_AUTH_TOKEN`. The CLI picks it up automatically as
  the `kolekta-cli` robot user — run CLI/`sanity` commands from the repo root (or any dir)
  with the env var exported (`set -a && source .env.local && set +a`).
  - The OAuth account (`lyricsngori@gmail.com` / "Pro Grammar") has **no** project access;
    do not rely on `sanity login` OAuth for this project.
- **Old project `u0bts60c`** (pre-existing `studio/` config) is NOT accessible with the
  robot token — treat its schema/config as stale; its blog-post topic ideas were carried
  over into the new Sanity-backed posts.

## Frontend (Next.js)
- Next.js 16.x App Router; `@/*` path alias → repo root of `frontend/` (no `src/` dir).
- **Sanity integration** lives in `frontend/lib/sanity/` (`client.ts`, `live.ts`, `queries.ts`,
  `image.ts`, `types.ts`). Blog is fully CMS-driven:
  - `/blog` listing (`app/(marketing)/blog/page.tsx`) and `/blog/[slug]` detail
    (`app/(marketing)/blog/[slug]/page.tsx`, uses `generateStaticParams` + PortableText).
  - Uses `next-sanity` (v13) + `@sanity/image-url`. Covers served via `next/image` from
    `cdn.sanity.io` (whitelisted in `frontend/next.config.ts` `images.remotePatterns`).
  - Env (`frontend/.env.local`, gitignored): `NEXT_PUBLIC_SANITY_PROJECT_ID=pg78qsiy`,
    `NEXT_PUBLIC_SANITY_DATASET=production`, optional `SANITY_API_READ_TOKEN` for live content.
  - `<SanityLive />` is mounted in `app/layout.tsx`.
- **Gotchas learned here:**
  - `next-sanity` v13 does NOT export `SanityDocument`; type results yourself
    (`lib/sanity/types.ts`). Without TypeGen, `sanityFetch` data is `unknown` — cast the result.
  - `@sanity/icons` v3+ only supports root imports (`import {UserIcon} from '@sanity/icons'`),
    NOT subpaths like `@sanity/icons/User`.
  - `@sanity/image-url` — use the named export `createImageUrlBuilder`, not the deprecated default.
  - Sanity API `client.create` writes **published** docs directly (no draft). String slugs are
    stored as plain strings — always send `slug: {_type:'slug', current}` so `defined(slug.current)`
    queries work.
  - `npx sanity debug`/`projects list` only shows projects for the *authenticated* identity; with
    `SANITY_AUTH_TOKEN` it reports the robot user and "No project found" — use the API token via
    curl to verify project access instead.
  - Seed/publish scripts: `studio/scripts/seed-blog.cjs` + `studio/scripts/publish-drafts.cjs`
    (run from repo root with `SANITY_AUTH_TOKEN` exported). Temporary stock photos live in
    gitignored `.seed-images/`.
- Marketing/blog content was previously hardcoded placeholders; the blog is now Sanity-backed.
- Run lint: `npm run lint` (eslint). Run dev: `npm run dev` (port 3000).
