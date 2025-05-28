import { fetchUsers } from "@/lib/actions";
import { User } from "@/types";

export default async function UserPage() {
    const users: User[] = await fetchUsers();

    return (
        <div>
            <h1>Utenti: ({users.length})</h1>
            <p>Lista utenti caricata tramite server action</p>

            <div className="grid">
                {users.map((user) => (
                    <div key={user.id} className="card">
                        <h3>{user.name}</h3>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>

                    </div>
                ))}
            </div>

        </div>
    );
}