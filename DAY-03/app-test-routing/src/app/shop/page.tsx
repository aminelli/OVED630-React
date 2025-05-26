import Link from "next/link";

export default function ShopPage() {

  const products = [
    { id: 1, name: "iPhone 15 Pro", price: "€1.199", category: "Electronics", image: "📱" },
    { id: 2, name: "MacBook Air M2", price: "€1.399", category: "Electronics", image: "💻" },
    { id: 3, name: "Sneakers Nike", price: "€129", category: "Clothing", image: "👟" },
    { id: 4, name: "T-shirt Premium", price: "€39", category: "Clothing", image: "👕" },
    { id: 5, name: "JavaScript Guide", price: "€29", category: "Books", image: "📚" },
    { id: 6, name: "Design Patterns", price: "€49", category: "Books", image: "📖" }
  ]




    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop</h1>
                <p className="text-gray-600">Scopri i nostri prodotti</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-6xl mb-4 text-center">{product.image}</div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">{product.price}</span>
                    <Link 
                        href={`/shop/product/${product.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Dettagli
                    </Link>
                    </div>
                </div>
                ))}
            </div>
            </div>
    );
}