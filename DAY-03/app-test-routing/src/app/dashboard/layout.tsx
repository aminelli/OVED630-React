import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            
            <aside className="w-64 bg-white shadow-lg">
                
                <div className="p-6">
                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Overview</Link>
                    <Link href="/dashboard/analytics" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Analytics</Link>
                    <Link href="/dashboard/users" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Utenti</Link>
                    <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded">Impostazioni</Link>
                </div>

            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}