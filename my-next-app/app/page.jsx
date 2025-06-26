
import React from 'react'
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Categories from "./components/categories/Categories"
import ProductList from './components/ProductList';

async function getAllProducts() {
    const res = await fetch('https://django-shop-drf-production.up.railway.app/product_list/', {
        cache: 'no-store'
    });
    if (!res.ok) return [];
    return res.json();
}

export default  async function Homepage() {
  const products = await getAllProducts();
  return (
    <main className="min-h-screen overflow-y-auto scroll-smooth bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Categories />
      <ProductList products={products} />
    </main>
  )
}



