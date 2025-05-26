import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Adavanced Layouts App",
  description: "Demo layout avanzati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-gray-50">
        
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Adavanced Layouts</h1>
            <nav className="mt-2">
              <Link href="/" className="mr-4 hover:underline">Home</Link>
              <Link href="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
              <Link href="/shop" className="mr-4 hover:underline">Shop</Link>
              <Link href="/login" className="mr-4 hover:underline">Login</Link>
              <Link href="/blog" className="mr-4 hover:underline">Blog</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8">
        {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-auto">
          <p>Demo Apps - Corso React/Next.Js</p>
        </footer>
      </body>
    </html>
  );
}
