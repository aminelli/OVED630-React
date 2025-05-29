import { User, Post, Comment, Tag, Role } from '@prisma/client';

export type UserWithPosts = User & {
    posts: Post[];
};

export type PostWithAuthor = Post & {
    author: Partial<User>;
    tags: Tag[];
    comments: CommentWithAuthor[];
};


export type CommentWithAuthor = Comment & {
    author: Partial<User>;
};


export type CreateUserInput = {
    name?: string;
    email: string;
    password: string;
    role?: Role;
};


export type CreatePostInput = {
    title: string;
    content?: string;
    authorId: string;
    published?: boolean;
    tags?: string[];
}


export type UpdatePostInput = Partial<CreatePostInput> & {
    id: string;
}


export interface APIResponse<T = any> {
    success: boolean
    data?: T;
    error?: string;
    message?: string
}






