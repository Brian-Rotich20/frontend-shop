// - Fetch categories from your Django API
// - Map over the data
// - Render CategoryCard for each category
// - steps
//1️⃣ Cliient Component → uses useEffect() + useState() to fetch
//2️⃣ Display loading, error, or the categories
//3️⃣ Calls a placeholder API for now → you’ll replace with your real Django API URL

// import Categories from "@/components/categories/Categories" - This would be used in fetching categories in the main page
'use client' 

import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://django-shop-drf-production.up.railway.app/category_list')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data = await res.json()
        const formatted = data.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          image: `https://django-shop-drf-production.up.railway.app${cat.image}`,
        }))
        setCategories(formatted)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) return <p className="text-center py-6 text-gray-600">Loading categories...</p>
  if (error) return <p className="text-center py-6 text-red-500">{error}</p>

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
