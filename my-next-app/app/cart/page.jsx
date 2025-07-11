'use client'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useCart } from '../context/CartContext' 
import { ShoppingBag, Minus, Plus, X } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshCart } = useCart();
  const router = useRouter();

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/media/')) {
      return `https://django-shop-drf.onrender.com${imagePath}`;
    }
    
    return `https://django-shop-drf.onrender.com/${imagePath}`;
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

        const res = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cartCode}`);
        const data = await res.json();

        console.log("🛒 Cart response:", data);

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
      const res = await fetch('https://django-shop-drf.onrender.com/update_cartitem_quantity/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_id: itemId,
          quantity: newQuantity,
          cart_code: cartCode
        })
      });

      if (res.ok) {
        // Refresh cart data with updated URL
        const cartRes = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cartCode}`);
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
      const res = await fetch(`https://django-shop-drf.onrender.com/delete_cartitem/${itemId}/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_code: cartCode
        })
      });

      if (res.ok) {
        const cartRes = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cartCode}`);
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
    // Simply redirect to checkout, let checkout page handle authentication
    router.push("/checkout");
  };

  if (loading) return <div className="p-4 text-gray-600">Loading cart...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!cart) return <div className="p-4">Cart not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <ShoppingBag className="mr-3" size={28} />
              Your Cart
            </h1>
          </div>

          {!cart.cartitems || cart.cartitems.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-gray-400" size={40} />
              </div>
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <a 
                href="/" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="p-6">
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cart.cartitems.map((item) => (
                  <div key={item.id} className="flex items-center p-4 border-2 border-gray-100 rounded-xl hover:border-gray-200 transition-colors bg-white">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 mr-4 flex-shrink-0">
                      {item.product.image ? (
                        <img 
                          src={getImageUrl(item.product.image)} 
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      <div 
                        className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium"
                        style={{ display: item.product.image ? 'none' : 'flex' }}
                      >
                        No Image
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 truncate">{item.product.name}</h3>
                      <p className="text-blue-600 font-medium text-lg">${item.product.price}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Subtotal: <span className="font-medium text-gray-700">${item.sub_total}</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 mx-6">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} className="text-gray-600" />
                      </button>

                      <div className="w-16 text-center">
                        <span className="text-xl font-bold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg border">
                          {item.quantity}
                        </span>
                      </div>

                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border-2 border-gray-200 hover:border-gray-300"
                      >
                        <Plus size={16} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t-2 border-gray-100 pt-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-700">Items in cart:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {cart.cartitems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-gray-900">Total:</span>
                    <span className="text-3xl font-bold text-blue-600">${cart.cart_total}</span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}