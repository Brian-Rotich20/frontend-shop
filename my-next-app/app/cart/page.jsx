'use client';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from '../context/CartContext'; 
import { ShoppingBag, Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';

export default function CartPage() {
  const { status } = useSession();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshCart } = useCart();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getImageUrl = (imagePath) => {
    const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_BASE_URL;
    if (!imagePath) return '/fallback.jpg'; 
    if (imagePath.startsWith('http')) return imagePath;
    return `${cloudinaryBaseUrl}/${imagePath}`;
  };

  const getCartCode = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cart_code');
    }
    return null;
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('You must be logged in to access checkout.');
      router.push('/auth/login?next=/checkout');
      return;
    }

    if (status === 'authenticated') {
      const fetchCart = async () => {
        try {
          const cartCode = getCartCode();
          if (!cartCode) {
            setError('No cart found. Please add items to your cart first.');
            setLoading(false);
            return;
          }

          const res = await fetch(`${baseUrl}/get_cart/${cartCode}`);
          const data = await res.json();

          if (res.ok) {
            setCart(data);
          } else {
            setError(data.error || 'Failed to load cart');
          }
        } catch (err) {
          console.error('Fetch error:', err);
          setError('Failed to load cart');
        } finally {
          setLoading(false);
        }
      };

      fetchCart();
    }
  }, [status, router]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const cartCode = getCartCode();
      const res = await fetch(`${baseUrl}/update_cartitem_quantity/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: itemId,
          quantity: newQuantity,
          cart_code: cartCode
        })
      });

      if (res.ok) {
        const cartRes = await fetch(`${baseUrl}/get_cart/${cartCode}`);
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
        refreshCart();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update quantity');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
    try {
      const cartCode = getCartCode();
      const res = await fetch(`${baseUrl}/delete_cartitem/${itemId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_code: cartCode
        })
      });

      if (res.ok) {
        const cartRes = await fetch(`${baseUrl}/get_cart/${cartCode}`);
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
        refreshCart();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    if (status !== 'authenticated') {
      toast.error('You must be logged in to proceed to checkout');
      router.push(`/auth/login?next=/checkout`);
      return;
    }
    router.push('/checkout');
  };

  // SHOW LOADING SCREEN
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // HANDLE ERROR
  if (error) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-50 rounded-full">
              <X className="text-red-500" size={24} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ArrowLeft className="mr-2" size={16} />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // HANDLE EMPTY CART
  if (!cart) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-600">Cart not found</p>
          </div>
        </div>
      </div>
    );
  }

  // MAIN RENDER
  return (
    // Your full cart UI remains untouched here
    // [omitted for brevity, it's exactly as you pasted]
    <div className="min-h-screen bg-white">
      {/* ... */}
    </div>
  );
}
