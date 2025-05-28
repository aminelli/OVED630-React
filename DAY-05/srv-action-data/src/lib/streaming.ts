
import { User, Post, Comment, TodoItem, StreamingData } from "@/types";


export async function* streamData(): AsyncGenerator<Partial<StreamingData>, void, unknown> {
    
    // Stream users
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await usersResponse.json();
    yield { users };


    // Stream posts
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: Post[] = await postsResponse.json();
    yield { posts };


    // Stream comments
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments: Comment[] = await commentsResponse.json();
    yield { comments };


    // Stream todos
    const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos: TodoItem[] = await todosResponse.json();
    yield { todos };

}