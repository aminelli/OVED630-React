'use client';

import React, { useState, useTransition } from 'react';


interface InteractivePostActionsProps {
    postId: number;
    initialLikes: number;
}


export default function InteractivePostActions({ postId, initialLikes }: InteractivePostActionsProps) {

    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    
    const [isPending, startTransition] = useTransition();

    const handleLike = () => {
        startTransition(() => {
        if (isLiked) {
            setLikes(prev => prev - 1);
            setIsLiked(false);
        } else {
            setLikes(prev => prev + 1);
            setIsLiked(true);
        }
        });
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Post',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing post:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiato negli appunti');
        }        
    };


    return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          disabled={isPending}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
            isLiked
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likes}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <span>📤</span>
          <span>Condividi</span>
        </button>
      </div>

      <div className="text-sm text-gray-500">
        Post #{postId}
      </div>
    </div>
    );


}

