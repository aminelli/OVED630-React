import React, { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import UserCard from "@/components/UserCard";
import { getUsers } from "@/lib/api";



// Componente server asincrono

async function UsersList() {
    const response = await getUsers();

    if (!response.success) {
        throw new Error(` Impossibile caricare i dati degli utenti ${respose.message}`);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                response.data.map(user => (
                    <UserCard key={user.id} user={user} />
                ))
            }
        </div>
    );
}


export default function UsersPage() {
    return (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Lista degli utenti</h1>
            <p className="text-gray-600">
                Utenti registrati
            </p>
        </div>
        <Suspense fallback={<LoadingSpinner size="lg" message="Caricamento utenti..." />}>
            <UsersList />
        </Suspense>
    </div>
    
    );
}