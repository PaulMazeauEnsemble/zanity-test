import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";
import Link from "next/link";
import Image from 'next/image';
import { getPostQuery } from '@/lib/queries'
import { createPreviewHandler } from '@/hooks/usePreview';


const builder = imageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => builder.image(source);

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { preview?: string };
}) {
  const previewHandler = createPreviewHandler();
  const post = await previewHandler.getPreviewQuery(
    getPostQuery(params.slug, previewHandler.getPreviewStatus(searchParams)),
    searchParams
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link 
        href={`/${searchParams?.preview ? '?preview=true' : ''}`} 
        className="hover:underline"
      >
        ← Back to posts
      </Link>
      
      {post.image && (
        <div className="relative aspect-video w-full">
          <Image
            loading="eager"
            decoding="sync"
            src={urlFor(post.image).width(550).height(310).url()}
            alt={post.title}
            className="rounded-xl object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 550px"
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}