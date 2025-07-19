'use client';

import { useEffect, useState } from 'react';
import AddReviewForm from '@/components/AddReviewForm';
import ProductRatingStars from '@/components/ProductRatingStars';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/fallback.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${CLOUDINARY_BASE_URL}/${imagePath}`;
};

export default function ProductDetailPage({ params }) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const productId = params.id;

  const fetchProduct = async () => {
    const res = await fetch(`${BASE_URL}/products/${productId}`, {
      cache: 'no-store',
    });
    const data = await res.json();
    setProduct(data);
  };

  const fetchReviews = async () => {
    const res = await fetch(`${BASE_URL}/get_reviews/?product_id=${productId}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  if (!product) {
    return <p className="text-center text-red-500 py-6">Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-blue-600 font-semibold text-lg mb-2">Ksh {product.price}</p>
          <ProductRatingStars productId={product.id} />
          <p className="text-gray-700 mt-4">{product.description}</p>
        </div>
      </div>

      {/* Reviews */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-1 text-yellow-500 text-sm">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-gray-800">{review.review}</p>
                <p className="text-sm text-gray-500 mt-1">– {review.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>

      {/* Add Review Form */}
      <AddReviewForm product={product} refreshReviews={fetchReviews} />
    </div>
  );
}
