// components/ProductDetails.jsx
'use client';

import { useEffect, useState } from 'react'
import AddReviewForm from './AddReviewForm';
import RatingBreakdown from './RatingBreakdown';
import ReviewList from './ReviewList';
import SimilarProducts from './SimilarProducts';
import WishlistButton from './WishlistButton';
import { getReviews, getProductRating } from '@/lib/api';

export default function ProductDetails({ product }) {
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({});


  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'specifications', label: 'Specifications' },
  ];

  const fetchReviews = async () => {
    try {
      const data = await getReviews(product.id)
      setReviews(data)
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    }
  }

  useEffect(() => {
  if (product?.id) {
    fetchReviews();
    fetchRating();
  }
}, [product?.id]);

const fetchRating = async () => {
  try {
    const data = await getProductRating(product.id);
    setRating(data.average_rating);
    setRatingCounts(data.breakdown || {});
  } catch (error) {
    console.error('Failed to fetch rating:', error);
  }
};


    const getImageUrl = (imagePath) => {
    const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;
    // if (!imagePath) return '/fallback.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${cloudinaryBaseUrl}/${imagePath}`;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Overview */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/fallback.jpg';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">(4.5 out of 5)</span>
                </div>
                <p className="text-4xl font-bold text-blue-600 mb-4">
                  Ksh {Number(product.price).toLocaleString()}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Add to Cart
                  </button>
                  <WishlistButton productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {product?.id && <RatingBreakdown productId={product.id} />}
                  <AddReviewForm product={product} refreshReviews={fetchReviews} />
                </div>
                <ReviewList reviews={reviews} refreshReviews={fetchReviews} />
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-600">Category</span>
                    <p className="text-gray-900">{product.category || 'General'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-600">Brand</span>
                    <p className="text-gray-900">{product.brand || 'Generic'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts products={product.similar_products} />
      </div>
    </div>
  );
}