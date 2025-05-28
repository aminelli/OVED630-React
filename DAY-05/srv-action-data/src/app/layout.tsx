import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Demo",
  description: "Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>

        <nav className="nav">
          <div className="nav-container">
            <h1 className="nav-title">Demo</h1>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/users">Utenti</Link>
              <Link href="/posts">Post</Link>
              <Link href="/todos">Todo</Link>
              <Link href="/streaming">Streaming</Link>
            </div>
          </div>
        </nav>

        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
