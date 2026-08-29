import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/live";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";
import { SanityImage } from "@/components/common/SanityImage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = (await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  })) as { data: string[] };
  return data.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = (await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    stega: false,
  })) as { data: Post | null };

  if (!data) return { title: "Post Not Found" };

  return {
    title: data.title,
    description: data.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = (await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })) as { data: Post | null };

  if (!post) notFound();

  return (
    <div className="relative">
      <div className="w-full h-[3px]" style={{ backgroundColor: "#20A160" }} />

      <article className="max-container padding-x">
        {/* Header */}
        <header className="padding-y max-w-[760px]">
          <Link
            href="/blog"
            className="no-underline inline-flex items-center gap-2 mb-6 text-sm"
            style={{ color: "#20A160", fontFamily: "var(--font-primary)" }}
          >
            ← Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "#D4EDDF",
                color: "#20A160",
                fontFamily: "var(--font-primary)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {post.category?.title ?? "Kolekta"}
            </span>
            <span
              className="text-xs"
              style={{ color: "#8A8A72", fontFamily: "var(--font-primary)" }}
            >
              {formatDate(post.publishedAt)} · {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#003020",
              lineHeight: 1.15,
            }}
          >
            {post.title}
          </h1>

          <p
            className="mt-5 text-lg"
            style={{
              fontFamily: "var(--font-primary)",
              color: "#616150",
              lineHeight: 1.7,
            }}
          >
            {post.excerpt}
          </p>

          {post.author?.name && (
            <div className="mt-6 flex items-center gap-3">
              {post.author.image?.asset?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  className="rounded-full object-cover"
                  style={{ width: 40, height: 40 }}
                />
              ) : (
                <div
                  className="rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#E8E8D0",
                    color: "#003020",
                    fontFamily: "var(--font-primary)",
                  }}
                >
                  {post.author.name.charAt(0)}
                </div>
              )}
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.875rem",
                  color: "#616150",
                }}
              >
                {post.author.name}
              </span>
            </div>
          )}
        </header>

        {/* Cover image */}
        {post.coverImage?.asset && (
          <div className="mb-12 rounded-2xl overflow-hidden relative" style={{ height: "clamp(240px, 40vw, 440px)" }}>
            <SanityImage
              value={post.coverImage}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>
        )}

        {/* Body */}
        <div className="max-w-[760px] pb-12">
          {Array.isArray(post.body) && post.body.length > 0 ? (
            <div className="blog-prose">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) =>
                      value?.asset ? (
                        <div className="my-8 rounded-xl overflow-hidden relative" style={{ height: 300 }}>
                          <SanityImage
                            value={{ asset: value.asset, alt: value.alt }}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 760px"
                          />
                        </div>
                      ) : null,
                  },
                }}
              />
            </div>
          ) : (
            <p style={{ color: "#616150", fontFamily: "var(--font-primary)" }}>
              This article is being written. Check back soon.
            </p>
          )}

          <div
            className="mt-12 pt-8 border-t"
            style={{ borderColor: "#DDDDC8" }}
          >
            <Link
              href="/blog"
              className="no-underline text-sm"
              style={{ color: "#20A160", fontFamily: "var(--font-primary)" }}
            >
              ← Back to blog
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
