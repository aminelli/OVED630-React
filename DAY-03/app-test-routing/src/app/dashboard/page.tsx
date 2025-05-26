
export default function DashboardPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
                <p className="text-gray-600">Overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Utenti Totali</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Vendite</h3>
                <p className="text-3xl font-bold text-green-600">€45,678</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Ordini</h3>
                <p className="text-3xl font-bold text-purple-600">567</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Conversioni</h3>
                <p className="text-3xl font-bold text-orange-600">12.3%</p>
                </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Attività Recenti</h2>
                <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                    <span>Nuovo utente registrato</span>
                    <span className="text-gray-500 text-sm">2 ore fa</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                    <span>Ordine Completato #1234</span>
                    <span className="text-gray-500 text-sm">4 ore fa</span>
                </div>
                <div className="flex items-center justify-between py-2">
                    <span>Aggiornamento Sistema</span>
                    <span className="text-gray-500 text-sm">1 giorno fa</span>
                </div>
                </div>
            </div>
        </div>
    );
}