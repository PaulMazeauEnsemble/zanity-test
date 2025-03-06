import { groq } from 'next-sanity'
import { buildPreviewQuery } from '../app/sanity/client'
import { withPreview } from '../hooks/usePreview'

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body?: any;
  image?: any;
}

export const ALL_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  "author": author->{
    name,
    image,
    bio
  },
  categories[]->{
    _id,
    title
  }
}`

export const getPost = withPreview<Post>((preview: boolean) => 
  buildPreviewQuery(`_type == "post" && slug.current == $slug`, preview) + 
  `[0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    image
  }`
);

export const getPosts = withPreview<Post[]>((preview: boolean) => 
  buildPreviewQuery(`_type == "post" && defined(slug.current)`, preview) + 
  `| order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    image
  }`
);