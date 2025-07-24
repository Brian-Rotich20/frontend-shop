'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getSimilarProducts } from '@/lib/api';

export default function SimilarProducts({ productId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadSimilar() {
      if (!productId) return;
      const data = await getSimilarProducts(productId);
      setProducts(data.similar_products || []);
    }
    loadSimilar();
  }, [productId]);

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Similar Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
