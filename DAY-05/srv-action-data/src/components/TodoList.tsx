'use client';

import { toggleTodo } from "@/lib/actions";
import { TodoItem, User } from "@/types";
import { useOptimistic, useTransition } from "react";


interface TodoListProps {
    todos: TodoItem[],
    users: User[]
}

export default function TodoList({ todos, users }: TodoListProps) {

    const [isPending, startTransition] = useTransition();

    const [optimisticTodos, setOptimisticTodos] = useOptimistic(
        todos,
        (state, {id, completed} : {id: Number; completed: boolean} ) => state.map((todo) => todo.id === id ? {...todo, completed} : todo)
    );

    const getUserName = (userId: number) => users.find((user) => user.id === userId)?.name || 'Unknown';

    const handleToggle = (todo: TodoItem) => {
        startTransition(() => {
            setOptimisticTodos({id: todo.id, completed: !todo.completed});
            toggleTodo(todo.id, todo.completed)
        });
    };

    return (
        <div>
            <h2>Todo ({optimisticTodos.length})</h2>

            <div style={{ marginBottom: '1rem'}}>
                <strong>Completati</strong> {optimisticTodos.filter((todo) => todo.completed).length} / {optimisticTodos.length}
            </div>

            {
                optimisticTodos.slice(0, 20).map((todo) => (
                    <div key={todo.id} className={`.todo-item ${todo.completed ? 'completed' : ''}`}  >
                        <input 
                            type="checkbox" 
                            className="checkbox"
                            checked={todo.completed} 
                            onChange={() => handleToggle(todo)} 
                            disabled={isPending} 
                        />
                        <div className="todo-title" >{todo.title}</div>
                        <div style={{ marginLeft: 'auto', fontSize: '0.9rem', color: 'blue'}}>
                            {getUserName(todo.userId)}
                        </div>
                    </div>
                ))
            }


        </div>
    );
}