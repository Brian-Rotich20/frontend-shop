'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function AddToCartButton({ productId, className = "" }) {
  const { refreshCart, getOrCreateCartCode } = useCart();
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);

      const cartCode = await getOrCreateCartCode();
      if (!cartCode) {
        toast.error('Failed to create cart. Please try again.');
        return;
      }

      const userEmail = typeof window !== 'undefined'
        ? localStorage.getItem('user_email')
        : null;

      const response = await fetch('https://inova-shop.onrender.com/add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
          cart_code: cartCode,
          email: userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Product added to cart successfully!');
        await refreshCart();
      } else {
        toast.error(data.error || data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="space-y-2">
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(productId);
      }}
      disabled={loading}
      className={`group relative w-full py-2 px-6 rounded-md font-medium transition-all duration-300 transform ${
        loading
          ? 'bg-orange-500 text-white cursor-not-allowed'
          : 'bg-gradient-to-r from-orange-500 to-orange-900 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg hover:shadow-orange-900/50'
      } ${className}`}
    >
      <span className="relative z-10">{loading ? 'Adding...' : 'Add to Cart'}</span>
      {!loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
    </div>
  );
}
