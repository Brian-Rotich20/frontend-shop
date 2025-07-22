'use client'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useCart } from '../context/CartContext' 
import { ShoppingBag, Minus, Plus, X, ArrowLeft } from 'lucide-react'
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export default function CartPage() {
  const { data: session, status } = useSession();
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
    async function fetchCart() {
      try {
        const cartCode = getCartCode();
        if (!cartCode) {
          setError("No cart found. Please add items to your cart first.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${baseUrl}/get_cart/${cartCode}`);
        const data = await res.json();

        if (res.ok) {
          setCart(data);
        } else {
          setError(data.error || "Failed to load cart");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

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
        refreshCart(); // Update cart count in context
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


// 1. Updated Cart handleCheckout function
const handleCheckout = () => {
  if (status === 'loading') {
    return;
  }
  
  if (status === 'unauthenticated' || !session) {
    toast.error('Please create an account or login to checkout');
    // Redirect to register page (not login) for new users
    router.push(`/auth/register?next=${encodeURIComponent('/cart')}`);
    return;
  }
  
  // Check if user needs to complete profile (Google users without phone)
  // if (session?.user?.isNewUser || !session?.user?.phone_number) {
  //   router.push('/complete-profile');
  //   return;
  // }
  
  router.push('/checkout');
};

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="mr-1" size={16} />
            Continue Shopping
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        </div>

        {cart.cartitems?.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <ShoppingBag className="text-gray-400" size={24} />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.cartitems.map((item) => (
                  <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg bg-white">
                    <div className="w-16 h-16 mr-4 flex-shrink-0">
                      {item.product.image ? (
                        <img 
                          src={getImageUrl(item.product.image)} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover rounded-md border border-gray-200" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-md border border-gray-200 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">${item.product.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mx-4">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} className="text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="p-1 rounded-full border border-gray-300 hover:bg-gray-50"
                      >
                        <Plus size={14} className="text-gray-600" />
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[4rem] mr-3">
                      <p className="text-sm font-medium text-gray-900">${item.sub_total}</p>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({cart.cartitems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span className="text-gray-900">${cart.cart_total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-base font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">Ksh {cart.cart_total}</span>
                    </div>
                  </div>
                </div>
                
                 <button
                  onClick={handleCheckout}
                  disabled={status === "loading" || !cart || cart.cartitems?.length === 0}
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Loading..." : "Proceed to Checkout"}
                </button>
                              
                <p className="text-xs text-gray-500 text-center mt-4">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}