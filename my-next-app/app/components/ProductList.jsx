// section to show products

import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
