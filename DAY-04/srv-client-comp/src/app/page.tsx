import React, { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserCard from "@/components/UserCard";
import PostCard from "@/components/PostCard";
import { getUsers, getPosts } from "@/lib/api";


// Server Components asincrono
async function UsersSection() {
  
  const usersResponse = await getUsers();

  if (!usersResponse.success) {
    throw new Error(` Impossibile caricare i dati degli utenti ${usersResponse.message}`);
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Utenti</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersResponse.data.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
  //return users.data.map((user: User) => <UserCard key={user.id} user={user} />);
}

// Server Components asincrono
async function PostsSection() {
  const [postsResponse, usersResponse] = await Promise.all([
    getPosts(),
    getUsers()
  ]);

  if (!postsResponse.success) {
    throw new Error(` Impossibile caricare i dati dei posts ${postsResponse.message}`);
  }

  const posts = postsResponse.data;
  const users = usersResponse.data;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Post Recenti</h2>
      <div className="space-y-6">
        {posts.map(post => {
          const author = users.find(user => user.id === post.userId);
          return <PostCard key={post.id} post={post} author={author} />
        })}
      </div>
    </section>
  );
  
}


export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          App Demo Components
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Esempio di utilizzo di componenti server-side e client-side
        </p>
      </section>

      <Suspense fallback={<LoadingSpinner size="lg" message="Caricamento utenti..." />}>
        <UsersSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner size="lg" message="Caricamento utenti..." />}>
        <PostsSection />
      </Suspense>

    </div>
  );
}
