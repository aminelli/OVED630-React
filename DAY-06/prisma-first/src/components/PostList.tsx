import { PostService } from "@/lib/services/post.service";
import Link from "next/link";


export default async function PostList() {
    
    const posts = await PostService.getAllPosts();
    

    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Latest Posts</h2>
      {posts.map(
        (post) => (
        <article key={post.id} className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">
            <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h3>
          <p className="text-gray-600 mb-4">
            {post.content?.substring(0, 150)}...
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By {post.author.name}</span>
            <span>{post._count.comments} comments</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
    );
}