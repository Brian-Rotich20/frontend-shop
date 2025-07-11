
import Hero from './components/Hero';
import Categories from './components/categories/Categories';
import ProductList from './components/ProductList';


async function getAllProducts() {
  const res = await fetch('https://django-shop-drf.onrender.com/product_list', {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Homepage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-white text-gray-900">
    
      <Hero />
      <Categories />
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
        <ProductList products={products} />
      </section>
    </main>
  );
}
