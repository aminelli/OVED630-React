export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    phone: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}


export interface TodoItem {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}


export interface StreamingLoading {
    users: boolean,
    posts: boolean,
    comments: boolean,
    todos: boolean
}

export type StreamingData = {
    users: User[];
    posts: Post[];
    comments: Comment[];
    todos: TodoItem[];
}


