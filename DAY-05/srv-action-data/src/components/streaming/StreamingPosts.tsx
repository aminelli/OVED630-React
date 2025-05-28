'use client';

import { Post, StreamingLoading  } from "@/types";

interface StreamingPostsProps {
    posts: Post[],
    loading: StreamingLoading;
}

export default function StreamingPosts({ posts, loading }: StreamingPostsProps) {
    return (
        <div className="streaming-section"> 
            <h2>
                📝 Posts ({posts.length})
                {loading.posts && <div className="spinner"></div>}
            </h2>

            {
                loading.posts ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="grid">
                         {posts.slice(0, 5).map((post) => (
                            <div key={post.id} className="card"> 
                                <h3>{post.title}</h3>
                                <p>{post.body.substring(0, 50)}....</p>
                            </div>
                        ))} 
                    </div>
                )
            }
        </div>
    )
}