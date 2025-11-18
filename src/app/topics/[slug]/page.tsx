import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { notFound } from 'next/navigation'
import { db } from "@/db";
import { fetchPostsByTopicSlug } from "@/db/queries/post";

interface TopicShowProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowProps) {
  const { slug } = await params;
  const topic = await db.topic.findFirst({
    where: { slug }
  })

  if (!topic) {
    notFound()
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <p className="p-4 text-lg">{topic.description}</p>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
