# ADR-001: First-party, Sanity-backed blog comments

- **Status:** Accepted
- **Date:** 2026-10-03
- **Deciders:** Kolekta team

## Context

The blog (`frontend/app/(marketing)/blog/`) is fully Sanity-driven. Visitors should be
able to leave comments on posts. Sanity's built-in "Comments" feature is an internal
editorial collaboration tool (Growth plan; Studio-only; not publishable to site
visitors) and does not solve this. Third-party embeds (Giscus, Disqus) were considered.

## Decision

Implement comments as a first-party Sanity document type:

- New `comment` schema in `studio/schemaTypes/comment.ts`:
  `name`, `email` (private), `body`, `post` (reference), `approved` (boolean).
- New comments are created **unapproved** (`approved: false`); only approved comments
  are rendered on the site and returned by the public API.
- Submissions go through a Next.js Route Handler (`frontend/app/api/comments/route.ts`)
  that validates input, rate-limits per IP, and writes via a server-only Sanity write
  token (`SANITY_API_WRITE_TOKEN`). The token never reaches the browser.
- Moderation happens in the Studio, which has a dedicated Comments structure with
  Pending / Approved / All lists.
- Rendering uses the site's own design tokens (Kolekta green/pale palette,
  `var(--font-primary)`), so comments are fully on-brand.

## Alternatives considered

1. **Giscus (GitHub Discussions widget)** — near-zero backend work and themeable via a
   custom CSS file, but requires visitors to sign in with GitHub. Kolekta's audience is
   Kenyan creators, not developers; the login friction would suppress participation.
   Rejected for now; viable fallback if maintenance becomes a burden.
2. **Disqus** — third-party branding/ads on the free tier and heavy tracking conflict
   with our clean, custom design. Rejected.
3. **Backend-hosted comments (Express + own DB)** — the Express backend is currently a
   health-check scaffold with no database. Introducing a database just for comments adds
   operational cost with no benefit while Sanity already provides persistence, backups,
   and a query API. Rejected.

## Consequences

- **Persistence:** comments live in the Sanity Content Lake (dataset `production`), giving
  us the same durability, CDN, and query capabilities as posts.
- **Moderation cost:** a human must approve comments in the Studio before they appear.
  This is intentional (public marketing site, brand safety).
- **Spam protection layers:** (1) per-IP rate limit in the route handler, (2) input
  validation with basic spam heuristics, (3) moderation gate, (4) the write token should
  be scoped to a custom role that can only create `comment` documents (see SOP-001).
- **In-memory rate limiting** is per-instance; on serverless platforms each warm instance
  keeps its own counters. Acceptable for launch; revisit with a shared store (Upstash
  Redis or Vercel KV) if abuse occurs.
- **Privacy:** commenter emails are stored but never published or exposed via any public
  query; the public query selects `name` and `body` only.
