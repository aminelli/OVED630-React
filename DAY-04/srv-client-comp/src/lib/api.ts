import { User, Post, ApiResponse } from '@types';


// Simulazione di chiamata per ottenere la lista degli utenti

export async function getUsers(): Promise<ApiResponse<User[]>> {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users: User[] = [
        { id: 1, name: 'John Doe', email: 'Gt0Mw@example.com' },
        { id: 2, name: 'Jane Doe', email: 'Gt0Mw@example.com' },
        { id: 3, name: 'Joe Doe', email: 'Gt0Mw@example.com' },
    ];

    return {
        data: users,
        success: true,
        message: 'Users fetched successfully'
    } 
}


export async function getPosts(): Promise<ApiResponse<Post[]>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

     const posts: Post[] = [
         { id: 1, title: 'First Post', content: 'This is the first post', userId: 1, createdAt: '2023-01-01', likes: 10 },
         { id: 2, title: 'Second Post', content: 'This is the second post', userId: 2, createdAt: '2023-01-02', likes: 5 },
         { id: 3, title: 'Third Post', content: 'This is the third post', userId: 3, createdAt: '2023-01-03', likes: 15 },
     ];

    return {
        data: posts,
        success: true,
        message: 'Posts fetched successfully'
    } 
}


export async function getPostById(id: number): Promise<ApiResponse<Post | null>> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const posts = (await getPosts()).data;
    const post = posts.find(p => p.id === id);

    return {
        data: post,
        success: !!post,
        message: post ? 'Posts found' : "Post not found"
    } 


}

