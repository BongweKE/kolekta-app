# SOP-001: Blog comments — setup and moderation

## 1. One-time setup

### 1.1 Create an API token (Sanity manage)

1. Go to <https://www.sanity.io/manage> → project `998ifqep` (org `o4qckorzc`) →
   **API** → **Tokens** → **Add API token**.
2. Name it `comments-write` (the name appears in audit logs).
3. Role: **Editor**. Custom create-only roles (e.g. a `Commenter` role limited to
   creating `comment` documents) are an Enterprise-plan feature — use Editor for now.
   The token is server-side only (never a `NEXT_PUBLIC_*` var) and the API route is the
   only writer, creating unapproved `comment` documents and nothing else. If the plan
   is upgraded later, tighten this to a create-only custom role.
4. Optionally set an expiration (30/60/90-day preset or custom) and note the rotation date.
5. Copy the token immediately — Sanity shows it only once. If lost, delete the robot and
   create a new one.

```
SANITY_API_READ_TOKEN=<existing read token, if used>
SANITY_API_WRITE_TOKEN=<new comments-write token>
COMMENTS_RATE_LIMIT=5
COMMENTS_RATE_LIMIT_WINDOW_MS=60000
```

4. Also add `SANITY_API_WRITE_TOKEN` as a **secret** in the Vercel project
   (Settings → Environment Variables) so production deployments can save comments.
   In GitHub, add it as a repository secret if CI runs comment write tests.

### 1.2 Frontend deploy checklist

- `frontend/.env.example` documents all variables; keep it in sync.
- Verify after deploy:
  1. `GET /api/comments?slug=<post-slug>` returns `{"ok":true,"comments":[]}`.
  2. Submitting the form on a post returns the "awaiting moderation" message.
  3. In the Studio, the comment appears under **Comments → Pending moderation**.
  4. Approve it; it appears on the post page and via the GET endpoint.

## 2. Moderation runbook (recurring)

1. Open the Studio → **Comments → Pending moderation** (sorted newest first).
2. For each pending comment:
   - **Approve:** open the document, set `Approved` = true, publish. It is now live.
   - **Reject:** delete the document (we keep no rejected comments).
3. Check for obvious spam signals before approving: link farms, promo text, generic
   praise with links, non-English spam phrases. The API already rejects some patterns
   client-side, but the human check is the final gate.
4. Commenter emails are private. Do not copy them into other systems; they exist only
   for abuse follow-up.

## 3. Incident response — spam wave

1. If a flood of comments arrives, temporarily raise rate limiting by setting
   `COMMENTS_RATE_LIMIT=1` (and redeploy or update env in Vercel).
2. Bulk-delete pending spam in the Studio (Pending moderation list).
3. Escalate to the Sanity API if needed: with a write token you can also patch the
   API route to require an approval secret.
4. Post-incident: consider adding the offending patterns to
   `frontend/lib/comments/validate.ts` (`SPAM_PATTERNS`) and open a PR.

## 4. Persistence guarantees

- Comments are documents in the Sanity Content Lake (dataset `production`), same as
  posts — covered by Sanity's managed backups and the dataset export tooling
  (`npx sanity dataset export`).
- The public site can only ever read comments where `approved == true` (enforced in
  every public query).
