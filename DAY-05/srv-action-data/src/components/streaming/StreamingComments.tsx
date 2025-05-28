'use client';

import { Comment, StreamingLoading  } from "@/types";

interface StreamingCommentsProps {
    comments: Comment[],
    loading: StreamingLoading;
}

export default function StreamingComments({ comments, loading }: StreamingCommentsProps) {
    return (
        <div className="streaming-section"> 
            <h2>
                💬 Comments ({comments.length})
                {loading.comments && <div className="spinner"></div>}
            </h2>

            {
                loading.comments ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="grid">
                         {comments.slice(0, 5).map((comment) => (
                            <div key={comment.id} className="card"> 
                                <h3>{comment.name}</h3>
                                <p><strong>{comment.email}</strong></p>
                                <p>{comment.body.substring(0, 50)}....</p>
                            </div>
                        ))} 
                    </div>
                )
            }
        </div>
    )
}