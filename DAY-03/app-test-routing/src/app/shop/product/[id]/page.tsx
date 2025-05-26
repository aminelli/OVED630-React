export default function ProductPage({ params }: { params: { id: string } }) {
    
  const products = {
    "1": { name: "iPhone 15 Pro", price: "€1.199", description: "Il più avanzato iPhone mai creato", image: "📱" },
    "2": { name: "MacBook Air M2", price: "€1.399", description: "Potenza e portabilità in un design sottile", image: "💻" },
    "3": { name: "Sneakers Nike", price: "€129", description: "Comfort e style per ogni occasione", image: "👟" }
  }
  
  const product = products[params.id as keyof typeof products] || products["1"]

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="text-9xl mb-4">{product.image}</div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-green-600 mb-4">{product.price}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Aggiungi al Carrello
            </button>
            <button className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              Aggiungi ai Preferiti
            </button>
          </div>
          
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Specifiche</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Garanzia 2 anni</li>
              <li>• Spedizione gratuita</li>
              <li>• Reso entro 30 giorni</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}