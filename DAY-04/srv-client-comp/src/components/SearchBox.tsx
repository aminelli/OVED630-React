'use client';

import React , { useState, useCallBack, useDeferredValue } from 'react';

interface SearchBoxProps {
    onSearch: (query: string) => void;
    placeholder: string;
}



export default function SearchBox({ onSearch, placeholder ="Cerca..." }: SearchBoxProps) { 

    const [query, setQuery] = useState('');

    const deferredQuery = useDeferredValue(query);

    // UseCallBack: usato per ottimizzare le performance
    const handleSearch = useCallBack((query: string) => {
        setQuery(query);
    }, []);

    // Effetto per chiamare onSerach quando cambia deferredQuery
    React.useEffect(() => {
        onSearch(deferredQuery);
    }, [deferredQuery, onSearch]);

    return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-400">🔍</span>
      </div>
      {query && (
        <button
          onClick={() => handleSearch('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </div>
    );


}