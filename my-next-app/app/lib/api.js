



const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProduct(id) {
  const res = await fetch(`${API}/products/id/${id}/`);
  return res.ok ? res.json() : null;
}


export async function getReviews(productId) {
  const res = await fetch(`${API}/reviews/${productId}/`);
  return res.ok ? res.json() : [];
}



export async function addReview({ product, rating, comment }) {
  return fetch(`${API}/add_review/`, 
    { method: 'POST', 
      body: JSON.stringify
      ({ product, rating, comment }) });
}

export async function updateReview(pk, { rating, comment }) {
  return fetch(`${API}/update_review/${pk}/`, { method: 'PUT', body: JSON.stringify({ rating, comment }) });
}

export async function deleteReview(reviewId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${reviewId}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete review');
}

export async function getMyWishlist() {
  const res = await fetch(`${API}/my_wishlists/`);
  return res.json();
}


// Get Product Rating
export async function getProductRating(productId) {
  const res = await fetch(`${API}/products/${productId}/rating/`);
  return res.ok ? res.json() : { average_rating: 0, total_reviews: 0, breakdown: {} };
}


// toggleWishlist.js
export async function toggleWishlist(productId) {
  try {
    const res = await fetch(`${API}/add_to_wishlist/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: send cookies/session with request
      body: JSON.stringify({ product_id: productId }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.detail || 'Failed to toggle wishlist');
    }

    return res.status === 204
      ? { status: 'deleted' }
      : { status: 'added', data: await res.json() };
  } catch (err) {
    console.error('Error toggling wishlist:', err.message);
    throw new Error('Wishlist update failed');
  }
}
