'use server';

import { Post, TodoItem, User } from "@/types";
import { revalidatePath } from "next/cache";

export async function fetchUsers() : Promise<User[]> {
    
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
            cache: 'no-store'
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data users');
    }

    return response.json();
}


export async function fetchPosts() : Promise<Post[]> {
    
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            cache: 'no-store'
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data posts');
    }

    return response.json();
}


export async function fetchComments() : Promise<Comment[]> {
    
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments',
        {
            cache: 'no-store'
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data comments');
    }

    return response.json();
}



export async function fetchTodos() : Promise<TodoItem[]> {
    
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
            cache: 'no-store'
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data todos');
    }

    return response.json();
}


export async function createTodo(formData: FormData) : Promise<TodoItem> {
    
    const title = formData.get('title') as string;
    const userId = parseInt(formData.get('userId') as string);

    const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                title,
                userId,
                completed: false
            })
        }
    );

    if (!response.ok) {
        throw new Error('Failed to create todo');
    }

    const newTodo = await response.json();
    revalidatePath('/todos');
    return newTodo;
}



export async function toggleTodo(id: number, completed: boolean) : Promise<TodoItem> {
    
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                completed: !completed
            })
        }
    );

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    const updateTodo = await response.json();
    revalidatePath('/todos');
    return updateTodo;
}