'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ productId, className = "" }) {
  const { refreshCart, getOrCreateCartCode } = useCart();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      setMessage(''); // Clear previous messages

      // Get or create cart code
      const cartCode = await getOrCreateCartCode();
      if (!cartCode) {
        setMessage('Failed to create cart. Please try again.');
        return;
      }

      // Get user email from localStorage (if available)
      const userEmail = typeof window !== 'undefined' 
        ? localStorage.getItem('user_email') 
        : null;

      const response = await fetch('https://django-shop-drf.onrender.com/add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
          cart_code: cartCode,
          email: userEmail
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product added to cart successfully!');
        // Refresh cart after successful addition
        await refreshCart();
      } else {
        setMessage(data.error || data.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
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
        className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
          loading 
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } ${className}`}
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>

      {message && (
        <p className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}