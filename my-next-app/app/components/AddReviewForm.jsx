'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddReviewForm({ product, refreshReviews }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error('Please login to submit a review');
      router.push('/auth/login');
      return;
    }

    if (!product?.id) {
      toast.error("Missing product information.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/add_review/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          email: session.user.email,
          review: comment,
          rating,
        }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);
        if (res.ok) {
          toast.success("Review submitted!");
          setComment('');
          setRating(5);
          await refreshReviews?.();
          router.refresh?.();
        } else {
          toast.error(data?.error || "Failed to submit review.");
        }
      } catch (err) {
        console.error("Invalid JSON response:", text);
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Review submit error:", error);
      toast.error("Could not submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-orange-500 mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-orange-500 mb-2">
            Your Review
          </label>
          <textarea
            className="w-full p-3 border rounded-lg border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
            rows="4"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-grey-500 mb-2">
            Rating
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-orange-500"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {'★'.repeat(r)}{'☆'.repeat(5 - r)} ({r} Star{r > 1 && 's'})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
}
