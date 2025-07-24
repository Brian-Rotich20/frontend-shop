'use client'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { deleteReview } from '@/lib/api';

export default function ReviewList({ reviews, refreshReviews }) {
  const { data: session } = useSession();
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(5);

  // Handle delete 
  const handleDelete = async (reviewId) => {
    const confirmed = confirm('Are you sure you want to delete this review?');
    if (!confirmed) return;

    try {
        await deleteReview(reviewId);
        toast.success('Review deleted');
        refreshReviews();
    } catch (error) {
        console.error('Failed to delete review:', error);
        toast.error('Failed to delete review');
    }
  };

  // Handle edit
  const handleEdit = (review) => {
    setEditingId(review.id);
    setEditComment(review.review);
    setEditRating(review.rating);
  };

  const handleSave = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: editComment, rating: editRating }),
    });

    if (res.ok) {
      toast.success('Review updated');
      setEditingId(null);
      refreshReviews();
    } else {
      toast.error('Update failed');
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-4xl mb-4">💬</div>
        <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-orange-600 mb-4">Customer Reviews</h3>
      {reviews.map((review) => {
        const isOwner = review.user === session?.user?.name || review.user === session?.user?.email;

        return (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {review.user?.username?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.user.username}</p>
                  <p className="text-sm text-gray-500">Verified Purchase</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`text-sm ${star <= (review.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
                {isOwner && (
                  <div className="flex gap-2 ml-4 text-sm">
                    <button onClick={() => handleEdit(review.id)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                )}
              </div>
            </div>

            {editingId === review.id ? (
              <div className="space-y-2">
                <textarea
                  className="w-full border rounded p-2"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <select
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  className="w-full border rounded p-2"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                  ))}
                </select>
                <button onClick={() => handleSave(review.id)} className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed">{review.review}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
