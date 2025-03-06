import { groq } from 'next-sanity'
import { buildPreviewQuery } from '../app/sanity/client'

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

export const getPostQuery = (slug: string, preview: boolean) => groq`
  ${buildPreviewQuery(`_type == "post" && slug.current == "${slug}"`, preview)}[0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    image
  }
`;

export const getPostsQuery = (preview: boolean) => groq`
  ${buildPreviewQuery(`_type == "post" && defined(slug.current)`, preview)}
  | order(publishedAt desc)[0...12] {
    _id,
    title,
    slug,
    publishedAt,
    image
  }
`; 