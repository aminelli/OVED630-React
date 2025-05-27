export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt: string;
    likes: number;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}




