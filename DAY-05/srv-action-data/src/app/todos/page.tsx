import { fetchTodos, fetchUsers } from "@/lib/actions";
import TodoForm from "../components/TodoForm";



export default async function TodosPage() {
    const [todos, users] = await Promise.all([
        fetchTodos(), 
        fetchUsers()
    ]);
    

    return (
        <div>
            <h1>Gestione TODO</h1>
            <p>CRUD Example</p>

            <TodoForm users={users} />
        </div>
    );
}