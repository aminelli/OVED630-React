import Link from "next/link";

export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-xl font-bold mb-4">Categorie</h2>
                <nav className="space-y-2">
                    <Link href="/shop" className="block text-gray-700 hover:text-blue-600">Tutti i Prodotti</Link>
                    <Link href="/shop/category/electronics" className="block text-gray-700 hover:text-blue-600">Elettronica</Link>
                    <Link href="/shop/category/clothing" className="block text-gray-700 hover:text-blue-600">Abbigliamento</Link>
                    <Link href="/shop/category/books" className="block text-gray-700 hover:text-blue-600">Libri</Link>
                </nav>

                <div className="mt-8">
                    <h3 className="font-semibold mb-3">Filtri</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Prezzo</label>
                            <select className="w-full border rounded px-3 py-2">
                                <option>Tutti</option>
                                <option>€0 - €50</option>
                                <option>€50 - €100</option>
                                <option>€100+</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Marca</label>
                            <div className="space-y-1">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm">Apple</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm">Samsung</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>


            <main className="flex-1">{children}</main>

        </div>
    </div>
    );
}