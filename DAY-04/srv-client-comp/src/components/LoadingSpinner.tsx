import React from 'react'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string
}


export default function LoadingSpinner({size = 'md', message}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 ${sizeClasses[size]}`}></div>
            {message && <p className="mt-2 text-gray-600">{message}</p>}
        </div>
    )
}