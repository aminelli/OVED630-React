
import { User, Post, Comment, TodoItem, StreamingData } from "@/types";


export async function* streamData(): AsyncGenerator<Partial<StreamingData>, void, unknown> {
    
    // Stream users
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await usersResponse.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield { users };


    // Stream posts
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await postsResponse.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield { posts };


    // Stream comments
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments: Comment[] = await commentsResponse.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield { comments };


    // Stream todos
    const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: TodoItem[] = await todosResponse.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield { todos };

}