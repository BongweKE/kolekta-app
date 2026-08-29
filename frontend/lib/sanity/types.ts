import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { bottom: number; left: number; right: number; top: number };
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  bio?: string;
  image?: { asset?: { url?: string } };
}

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  featured?: boolean;
  readTime?: string;
  coverImage?: SanityImage | null;
  category?: SanityCategory | null;
  author?: SanityAuthor | null;
}

export interface Post extends PostSummary {
  body?: PortableTextBlock[] | null;
}
