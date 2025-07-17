// components/SimilarProducts.jsx
'use client';

import Link from 'next/link';

export default function SimilarProducts({ products }) {
  if (!products || products.length === 0) return null;

  const getImageUrl = (imagePath) => {
    const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;
    if (!imagePath) return '/fallback.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${cloudinaryBaseUrl}/${imagePath}`;
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/fallback.jpg';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg">
                Ksh {Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
