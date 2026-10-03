import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";
import { COMMENTS_QUERY } from "@/lib/sanity/queries";
import { sanityFetch } from "@/lib/sanity/live";
import { validateComment } from "@/lib/comments/validate";
import { rateLimit, clientIpFromHeaders } from "@/lib/comments/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = clientIpFromHeaders(request.headers);
  const { allowed, retryAfterSeconds } = rateLimit(`comment:${ip}`);

  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const input = validateComment(payload);
  if (!input) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please provide a name (2-80 characters), a valid email, and a comment (2-2000 characters).",
      },
      { status: 422 },
    );
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Comments are not configured on this deployment." },
      { status: 503 },
    );
  }

  try {
    const { data: postId } = (await sanityFetch({
      query: `*[_type == "post" && slug.current == $slug][0]._id`,
      params: { slug: input.postSlug },
      perspective: "published",
      stega: false,
    })) as { data: string | null };

    if (!postId) {
      return NextResponse.json({ ok: false, error: "Unknown post." }, { status: 404 });
    }

    await writeClient.create({
      _type: "comment",
      name: input.name,
      email: input.email,
      body: input.body,
      post: { _type: "reference", _ref: postId },
      approved: false,
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks! Your comment is awaiting moderation.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your comment right now. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ ok: false, error: "Invalid slug." }, { status: 400 });
  }

  const { data: comments } = (await sanityFetch({
    query: COMMENTS_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  })) as { data: { _id: string; _createdAt: string; name: string; body: string }[] };

  return NextResponse.json({ ok: true, comments });
}
