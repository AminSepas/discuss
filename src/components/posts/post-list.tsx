import type { PostWithData } from "@/db/queries/post";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import paths from "@/paths";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    const profileImage = (
      <Image
        src={post.user.image || ""}
        alt="user image"
        width={17}
        height={17}
        className="w-10 h-10 rounded-full"
      />
    );

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <div className="flex gap-1 text-xs text-gray-400">
              By {profileImage} {post.user.name}
            </div>
            <p className="text-xs text-gray-400">In {post.topic.slug}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
