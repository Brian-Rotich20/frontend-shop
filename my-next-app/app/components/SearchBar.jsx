'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar({ isMobile = false }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirect to a search results page
    router.push(`/search?query=${encodeURIComponent(query)}`);

    // Optional: If you want to fetch results directly (uncomment if needed)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
    // const data = await res.json();
    // console.log(data);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`${isMobile ? 'py-3 border-t border-gray-200 md:hidden' : 'hidden md:flex flex-1 max-w-2xl mx-8'}`}
    >
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isMobile ? 'Search products...' : 'Search for products, categories and more...'}
          className={`w-full ${isMobile ? 'py-2' : 'py-3'} pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
            isMobile ? 'focus:ring-orange-500' : 'focus:ring-orange-400'
          } focus:border-transparent`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
            isMobile
              ? 'text-gray-400 hover:text-orange-600'
              : 'bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700'
          } transition-colors`}
        >
          <Search className={isMobile ? 'w-5 h-5' : 'w-4 h-4'} />
        </button>
      </div>
    </form>
  );
}
