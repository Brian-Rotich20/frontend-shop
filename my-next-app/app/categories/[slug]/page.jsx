'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;

const getImageUrl = (path) => {
  if (!path) return '/fallback.jpg';
  if (path.startsWith('http')) return path;
  return `${CLOUDINARY_BASE_URL}/${path}`;
};

export default function CategoryDetailPage() {
  const { slug } = useParams(); // If you're using app router
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`${BASE_URL}/categories/${slug}`)
      .then(res => res.json())
      .then(data => setCategory(data))
      .catch(console.error);
  }, [slug]);

  if (!category) {
    return <p className="text-red-500 text-center py-10">Category not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {category.products.map((product) => (
           <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
