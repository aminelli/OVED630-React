'use client';

import { useEffect, useState } from 'react';
import { Post, TodoItem, User, Comment } from '../../types/index';
import StreamingUsers from './StreamingUsers';
import StreamingPosts from './StreamingPosts';
import StreamingComments from './StreamingComments';
import StreamingTodos from './StreamingTodos';
import { streamData } from '@/lib/streaming';


export default function StreamingDemo() {

    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [todos, setTodos] = useState<TodoItem[]>([]);

    const [loading, setLoading] = useState({
        users: true,
        posts: true,
        comments: true,
        todos: true
    });

    /*
    useEffect(
        () => {
            const streamData2 = async () => {
                try {

                    // Obiettivo: simulare uno streaming sequenziale

                    // Caricamento users
                    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
                    const usersData: User[] = await usersResponse.json();
                    setUsers(usersData);
                    setLoading(prev => ({...prev, users: false}));

                    // Facciamo attendere un secondo prima del prossimo stream
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Caricamento posts
                    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
                    const postsData: Post[] = await postsResponse.json();
                    setPosts(postsData);
                    setLoading(prev => ({...prev, posts: false}));

                    // Facciamo attendere un secondo prima del prossimo stream
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Caricamento comments
                    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
                    const commentsData: Comment[] = await commentsResponse.json();
                    setComments(commentsData);
                    setLoading(prev => ({...prev, comments: false}));

                    // Facciamo attendere un secondo prima del prossimo stream
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Caricamento todos
                    const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
                    const todosData: TodoItem[] = await todosResponse.json();
                    setTodos(todosData);
                    setLoading(prev => ({...prev, todos: false}));


                } catch (error) {
                    console.error('Errore nel caricamento dei dati',error);   
                }
            };
            streamData2();            
        },
        []
    );
    */

    useEffect(
        () => {
            const handleStreaming = async () => {
                try {

                    for await (const chunk of streamData()) {

                        if (chunk.users) {
                            setUsers(chunk.users);
                            setLoading(prev => ({ ...prev, users: false }));
                        }

                        if (chunk.posts) {
                            setPosts(chunk.posts);
                            setLoading(prev => ({ ...prev, posts: false }));

                        }
                        if (chunk.comments) {
                            setComments(chunk.comments);
                            setLoading(prev => ({ ...prev, comments: false }));

                        }
                        if (chunk.todos) {
                            setTodos(chunk.todos);
                            setLoading(prev => ({ ...prev, todos: false }));

                        }
                    }


                } catch (error) {
                    console.error('Errore nel caricamento dei dati', error);
                }
            };
            handleStreaming();
        },
        []
    );

    return (
        <div className='streaming-container'>
            <StreamingUsers users={users} loading={loading} />
            <StreamingPosts posts={posts} loading={loading} />
            <StreamingComments comments={comments} loading={loading} />
            <StreamingTodos todos={todos} loading={loading} />

        </div>

    );



}