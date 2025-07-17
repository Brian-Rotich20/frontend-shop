// Fetch + mutate reviews via react‑query or SWR

import useSWR, { mutate } from 'swr';
import { getReviews, addReview, updateReview, deleteReview } from '@/lib/api';

export function useReviews(productId) {
  const { data, error } = useSWR(productId ? `/reviews/${productId}` : null, () => getReviews(productId));
  return {
    reviews: data,
    isLoading: !error && !data,
    isError: error,
    add: async (payload) => {
      await addReview(payload);
      mutate(`/reviews/${productId}`);
    },
    update: async (pk, payload) => {
      await updateReview(pk, payload);
      mutate(`/reviews/${productId}`);
    },
    remove: async (pk) => {
      await deleteReview(pk);
      mutate(`/reviews/${productId}`);
    },
  };
}
