import Link from "next/link";
import { getPostsQuery } from '@/lib/queries';
import { createPreviewHandler } from '@/hooks/usePreview';

export default async function IndexPage({
  searchParams,
}: {
  searchParams?: { preview?: string };
}) {
  const previewHandler = createPreviewHandler();
  const posts = await previewHandler.getPreviewQuery(getPostsQuery(previewHandler.getPreviewStatus(searchParams)), searchParams);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post: { _id: string; slug: { current: string }; title: string; publishedAt: string }) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/${post.slug.current}${searchParams?.preview ? '?preview=true' : ''}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}