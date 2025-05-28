'use client';

import { createTodo } from "@/lib/actions";
import { User } from "@/types";
import { useActionState } from "react";

interface TodoFormProps {
   users: User[]
}

export default function TodoForm({ users} : TodoFormProps) {

    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            try {
                await createTodo(formData);
                return { success: true, error: null }
            } catch (error) {
                return { success: false, error: "Errore nella creazione del todo"}   
            }
        },
        {
            success:false,
            error: null
        }
    );

    return (

        <form action={formAction} method="post" className="flex flex-col gap-2">
        
            <div className="form-group">
                <label htmlFor="title">Titolo</label>
                <input type="text" name="title" id="title" required placeholder="Inserisci il titolo" disabled={isPending}/>
            </div>

            <div className="form-group">
                <label htmlFor="userId">Utente</label>
                <select name="userId" id="userId" required disabled={isPending}>
                    <option value="">Seleziona un utente</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>


            <button type="submit" className="btn" disabled={isPending}>
                { isPending ? 'Creazione in corso...' : 'Crea Todo'}
            </button>

            {state.error && <p style={{ color: 'red', marginTop: '1rem' }}>Errore: {state.error}</p>}

            {state.success && <p style={{ color: 'green', marginTop: '1rem' }}>Todo creato con successo</p>}
        
        </form>
    );

}