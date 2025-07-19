'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductRatingStars from './ProductRatingStars';
export default function ProductCard({ product, href }) {
  const [imageError, setImageError] = useState(false);
  const [rating, setRating] = useState(0);

  const getImageUrl = (imagePath) => {
    const base = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;
    if (!imagePath) return '/fallback.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${base}/${imagePath}`;
  };

  const handleImageError = () => setImageError(true);
  const formattedPrice = Number(product.price).toLocaleString('en-KE');


  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-3 space-y-2 text-sm">
        {/* Image */}
        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
          {product.image && !imageError ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-500 line-clamp-2 text-xs">{product.description}</p>
        <p className="text-base font-semibold text-green-600">KSh {formattedPrice}</p>

      <ProductRatingStars productId={product.id} />
      </div>
    </Link>
  );
}
