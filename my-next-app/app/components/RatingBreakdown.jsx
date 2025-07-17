'use client';

import { useEffect, useState } from 'react';
import { getProductRating } from '@/lib/api';

export default function RatingBreakdown({ productId }) {
  const [rating, setRating] = useState(0);
  const [counts, setCounts] = useState({
    excellent: 0,
    very_good: 0,
    good: 0,
    fair: 0,
    poor: 0,
  });

useEffect(() => {
  async function fetchRating() {
    try {
      const data = await getProductRating(productId);
      setRating(data.average_rating || 0);

      // Ensure counts have all expected keys
      setCounts({
        excellent: data.breakdown?.excellent || 0,
        very_good: data.breakdown?.very_good || 0,
        good: data.breakdown?.good || 0,
        fair: data.breakdown?.fair || 0,
        poor: data.breakdown?.poor || 0,
      });
    } catch (err) {
      console.error('Rating fetch failed:', err);
    }
  }

  if (productId) {
    fetchRating();
  }
}, [productId]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const ratingData = [
    { label: 'Excellent', count: counts.excellent || 0, color: 'bg-green-500' },
    { label: 'Very Good', count: counts.very_good || 0, color: 'bg-blue-500' },
    { label: 'Good', count: counts.good || 0, color: 'bg-yellow-500' },
    { label: 'Fair', count: counts.fair || 0, color: 'bg-orange-500' },
    { label: 'Poor', count: counts.poor || 0, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rating Breakdown (Avg: {rating.toFixed(1)})
      </h3>
      <div className="space-y-3">
        {ratingData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{item.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-center space-x-3 flex-1 ml-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.color} transition-all duration-300`}
                  style={{ width: total > 0 ? `${(item.count / total) * 100}%` : '0%' }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-8 text-right">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
