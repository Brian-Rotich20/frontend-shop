'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { Loader2 } from 'lucide-react'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${query}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setResults(data)
      } catch (err) {
        console.error('Search error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
        <span className="ml-2 text-gray-600">Searching...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Search results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
