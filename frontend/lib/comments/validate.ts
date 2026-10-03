export interface CommentInput {
  name: string;
  email: string;
  body: string;
  postSlug: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SPAM_PATTERNS = [
  /\[url=/i,
  /https?:\/\/\S+\s*https?:\/\//i,
  /(viagra|casino|crypto\s*pump|forex\s*signals|seo\s*guest\s*post)/i,
];

export function validateComment(input: unknown): CommentInput | null {
  if (typeof input !== "object" || input === null) return null;
  const { name, email, body, postSlug } = input as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 80) return null;
  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 254) return null;
  if (typeof body !== "string" || body.trim().length < 2 || body.trim().length > 2000) return null;
  if (typeof postSlug !== "string" || !/^[a-z0-9-]+$/.test(postSlug) || postSlug.length > 96)
    return null;
  if (SPAM_PATTERNS.some((re) => re.test(body))) return null;

  return { name: name.trim(), email: email.trim(), body: body.trim(), postSlug };
}
