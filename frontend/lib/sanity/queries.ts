import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featured,
    readTime,
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt,
      hotspot,
      crop
    },
    category->{ _id, title, "slug": slug.current },
    author->{ _id, name, bio, image { asset->{ url } } }
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    featured,
    readTime,
    coverImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt,
      hotspot,
      crop
    },
    category->{ _id, title, "slug": slug.current },
    author->{ _id, name, bio, image { asset->{ url } } }
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }
`);
