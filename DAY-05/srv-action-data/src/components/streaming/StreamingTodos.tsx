'use client';

import { TodoItem, StreamingLoading  } from "@/types";

interface StreamingTodosProps {
    todos: TodoItem[],
    loading: StreamingLoading;
}

export default function StreamingTodos({ todos, loading }: StreamingTodosProps) {
    return (
        <div className="streaming-section"> 
            <h2>
                ✅ Todos ({todos.length})
                {loading.todos && <div className="spinner"></div>}
            </h2>

            {
                loading.todos ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="grid">
                         {todos.slice(0, 5).map((todo) => (
                            <div key={todo.id} className="card"> 
                                <h3
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        opacity: todo.completed ? 0.7 : 1
                                    }}
                                >{todo.title}</h3>
                                <p>{todo.completed ? '✅ Completed' : '⏳ Not Completed'}</p>
                            </div>
                        ))} 
                    </div>
                )
            }
        </div>
    )
}