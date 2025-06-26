// app/categories/[slug]/page.jsx
// This is a server component by default (no 'use client')

async function getCategory(slug) {
  const res = await fetch(`https://django-shop-drf-production.up.railway.app/category/${slug}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

export default async function CategoryPage({ params }) {
    const slug = await params?.slug; // Ensure it's awaited if it's a Promise
  const category = await getCategory(slug);
  if (!category) return <div>404 - Category Not Found</div>

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
      <img src={`https://django-shop-drf-production.up.railway.app${category.image}`} />
      <p>Product list from this category will go here.</p>
    </section>
  )
}
