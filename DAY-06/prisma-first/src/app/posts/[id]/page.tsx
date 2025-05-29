import { PostService } from "@/lib/services/post.service";
import { notFound } from "next/navigation";


export default async function PostDetailPage({ params }: { params: Promise<{ id: string }>}) {
 
    const { id } = await params;

    const post = await PostService.getPostById(id);

    if (!post) {
        notFound();
    }
 
    return (
        <div className="container mx-auto px-4 py-8">
            
            <article className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                    <span>By {post.author.name}</span>
                    <span className="mx-2">|</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </article>

            {post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                            #{tag.name}
                        </span>
                    ))}
                </div>
            )}

            <div className="prose max-w-none mb-8">
                {post.content}
            </div>
            
            <section>
                <h2 className="text-2xl font-bold mb-4">Comments: {post.comments.length}</h2>
                <div className="space-y-4">
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-blue-200 pl-4">
                            <p className="mb-2">{comment.content}</p>
                            <div className="text-sm text-gray-600">
                                <span>By {comment.author.name}</span>
                                <span className="mx-2">|</span>
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </section>


        </div>
    );
}