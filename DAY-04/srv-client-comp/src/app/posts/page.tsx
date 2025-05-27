'use client';

import React, { useState, useCallback, useMemo } from "react";
import { Post, User } from "@/types";
import PostCard from "@/components/PostCard";
import SearchBox from "@/components/SearchBox";
import LoadingSpinner from "@/components/LoadingSpinner";



const mockPosts: Post[] = [
  {
    id: 1,
    title: 'React che passione',
    content: 'appassionati di frameworks javascript ....',
    userId: 1,
    createdAt: '2024-01-15T10:00:00Z',
    likes: 42 
  },
  {
    id: 2,
    title: 'React 19: Cosa cambia',
    content: 'Le novità di React 19 ...',
    userId: 2,
    createdAt: '2024-01-16T14:30:00Z',
    likes: 35
  },
  {
    id: 3,
    title: 'TypeScript Best Practices',
    content: 'Consigli tecnici ...',
    userId: 3,
    createdAt: '2024-01-17T09:15:00Z',
    likes: 28
  }
];

const mockUsers: User[] = [
  { id: 1, name: 'Mario Rossi'    , email: 'mario@example.com'  },
  { id: 2, name: 'Giulia Bianchi' , email: 'giulia@example.com' },
  { id: 3, name: 'Luca Verdi'     , email: 'luca@example.com'   },
];

export default function PostsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Funzione di ricerca ottimizzata con useCallBack
    const handleSearch = useCallback((query: string) => {
        setIsLoading(true);
        // simulazione chiamata asincrona
        setTimeout(() => {
            setSearchQuery(query);
            setIsLoading(false);
        }, 500);        
    }, []);


    // Funzione di ricerca ottimizzata con useMemo
    const filteredPosts = useMemo(() => {
        if (!searchQuery.trim()) return mockPosts;

        return mockPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
            ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="space-y-8">

            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Tutti i posts</h1>
                <p className="text-gray-600">
                    Usa la ricerca
                </p>
                <div className="mx-auto max-w-md">
                    <SearchBox 
                        onSearch={handleSearch}
                        placeholder="Cerca post..." 
                    />
                </div>
            </div>

            {
                isLoading ? (
                    <LoadingSpinner size="lg" message="Ricerca in corso..." />
                ) : (
                    <div className="space-y-6">

                       {
                            filteredPosts.length > 0 ? (
                                <>
                                    {searchQuery && (
                                            <p className="text-gray-600">
                                                Trovati {filteredPosts.length} posts per &quot;{searchQuery}&quot;
                                            </p>
                                    )}
                                    {filteredPosts.map(post => {
                                            const author = mockUsers.find(user => user.id === post.userId);
                                            return (<PostCard key={post.id} post={post} author={author} />);
                                        }
                                            
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 text-lg">
                                            Nessun post trovato per &quot;{searchQuery}&quot;
                                        </p>
                                        <button
                                            onClick={() => handleSearch('')}
                                            className="mt-4 btn btn-primary"
                                        >
                                            Mostra tutti i post
                                        </button>
                                    </div>
                                </>
                            )
                       } 
                    </div>
                )
            }

        </div>
    );

}


