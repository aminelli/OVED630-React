import PostList from "@/components/PostList";
import { Suspense } from "react";


export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}