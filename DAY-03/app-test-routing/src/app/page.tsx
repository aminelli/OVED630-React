
export default function HomePage() {
  return (
    	<div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Esempio React-Next.Js con Layouts Avanzati
          </h1>
          <p className="text-x1 text-gray-600">
              DEmo di uso avanzato di layouts e pages con react 19 e neaxt.js 15
          </p>
        </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Dashboard</h2>
              <p className="text-gray-600 mb-4">Area Amministrativa</p>
              <a href="/dashboard" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Vai alla Dashboard
              </a>
           </div>

           <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Dashboard</h2>
              <p className="text-gray-600 mb-4">Area Amministrativa</p>
              <a href="/shop" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Vai allo Shop
              </a>
           </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Dashboard</h2>
              <p className="text-gray-600 mb-4">Area Amministrativa</p>
              <a href="/blog" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Vai al Blog
              </a>
           </div>

         </div>

         <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Caratteristiche App</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Layout Annidati</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Root layout condiviso</li>
                  <li>Layout specifici per sezioni</li>
                  <li>Layout Condizionali</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Routing Avanzato</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Route dinamici</li>
                  <li>Route groups</li>
                  <li>Parallel routes</li>
                </ul>
              </div>
            </div>
         </div>

      </div>
  );
}
