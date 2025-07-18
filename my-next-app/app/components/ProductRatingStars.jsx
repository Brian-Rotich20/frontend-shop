'use client';
import { useEffect, useState } from 'react';
import { getProductRating } from '@/lib/api';

export default function ProductRatingStars({ productId }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    async function fetchRating() {
      try {
        const data = await getProductRating(productId);
        setRating(data.average_rating || 0);
      } catch (err) {
        console.error('Failed to fetch rating', err);
      }
    }

    if (productId) fetchRating();
  }, [productId]);

  if (rating === null) return null;

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center text-xs text-yellow-400">
      {stars.map((star) => (
        <span key={star} className={star <= rating ? '' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="ml-1 text-gray-500">({rating.toFixed(1)})</span>
    </div>
  );
}
