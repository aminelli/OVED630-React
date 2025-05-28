import { fetchPosts, fetchUsers } from '@/lib/actions';


export default async function PostsPage() {

    const [ posts, users] = await Promise.all([
        fetchPosts(), 
        fetchUsers()
    ]);

    const getUserName = (userId: number) => users.find((user) => user.id === userId)?.name || 'Unknown';

    return (
        <div>
            <h1>Posts ({posts.length})</h1>
            <p>Chiamate async su API ottimizzate per esecuzione in parallelo</p>

            <div className="grid">
                {posts.slice(0, 10).map((post) => (
                    <div key={post.id} className="card">
                        <h3>{post.title}</h3>
                        <p>Autore: {getUserName(post.userId)}</p>
                        <p>{post.body}</p>                        
                    </div>
                ))}
            </div>

        </div>
    );

}