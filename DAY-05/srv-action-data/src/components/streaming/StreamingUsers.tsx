'use client';

import { User, StreamingLoading  } from "@/types";

interface StreamingUsersProps {
    users: User[],
    loading: StreamingLoading;
}

export default function StreamingUsers({ users, loading }: StreamingUsersProps) {
    return (
        <div className="streaming-section"> 
            <h2>
                👥 Users ({users.length})
                {loading.users && <div className="spinner"></div>}
            </h2>

            {
                loading.users ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <div className="grid">
                         {users.slice(0, 5).map((user) => (
                            <div key={user.id} className="card"> 
                                <h3>{user.name}</h3>
                                <p>{user.email}</p>
                            </div>
                        ))} 
                    </div>
                )
            }
        </div>
    )
}