"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, MapPin, CreditCard, Lock } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { refreshCart } = useCart();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState("");
  const { showToast } = useToast();


  const getCartCode = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cart_code');
    }
    return null;
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?redirect=/checkout");
      return;
    }

    if (status === "authenticated") {
      fetchCart();
    }
  }, [status, router]);

  const fetchCart = async () => {
    try {
      const cartCode = getCartCode();
      if (!cartCode) {
        setError("No cart found. Please add items to your cart first.");
        setLoading(false);
        return;
      }

      const res = await fetch(`https://django-shop-drf.onrender.com/get_cart/${cartCode}`);
      const data = await res.json();

      if (res.ok) {
        if (!data.cartitems || data.cartitems.length === 0) {
          setError("Your cart is empty. Please add items before checkout.");
          setLoading(false);
          return;
        }
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
  };

const handlePlaceOrder = async () => {
  if (!phone || !/^2547\d{8}$/.test(phone)) {
    alert("Please enter a valid Safaricom phone number (e.g. 254712345678)");
    return;
  }

  const cartCode = getCartCode();
  if (!cartCode) {
    alert("No cart found.");
    return;
  }

  setIsProcessing(true);
  showToast({ status: "processing", message: "Sending STK push..." });

try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lipa_na_mpesa/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      phone, 
      cart_code: cartCode,
      email: session?.user?.email 
    }),
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok || data?.error) {
    showToast({ status: "error", message: "Payment failed. Try again." });
    return;
  }

  if (data.ResponseCode === "0") {
    showToast({ status: "awaiting", message: "STK Push sent. Awaiting user action..." });

    pollPaymentStatus(cartCode); // 🔁 Add polling below
  } else {
    showToast({ status: "error", message: "STK Push failed." });
  }
} catch (err) {
  showToast({ status: "error", message: "Checkout failed." });
} finally {
  setIsProcessing(false);
  }
};

const pollPaymentStatus = async (cartCode) => {
  let retries = 0;
  const maxRetries = 12; // ~2 mins

  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment_status?cart_code=${cartCode}`);
      const data = await res.json();

      if (data.status === "Paid") {
        clearInterval(interval);
        showToast({ status: "success", message: "Payment successful!" });
        localStorage.removeItem("cart_code");
        refreshCart();
        router.push("/order-success");
      }

      if (data.status === "Declined" || retries >= maxRetries) {
        clearInterval(interval);
        showToast({ status: "error", message: "Payment declined or timed out." });
      }

      retries++;
    } catch (err) {
      clearInterval(interval);
      showToast({ status: "error", message: "Error checking payment status." });
    }
  }, 10000); // every 10 seconds
};

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="text-red-500" size={40} />
          </div>
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cart) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Lock className="mr-3" size={28} />
              Secure Checkout
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <User className="text-blue-600 mr-2" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      <strong>Email:</strong> {session?.user?.email || 'Not provided'}
                    </p>
                    <p className="text-gray-700">
                      <strong>Name:</strong> {session?.user?.name || 'Not provided'}
                    </p>
                  </div>
                </div>

               <div className="mb-8">
                <div className="flex items-center mb-4">
                  <MapPin className="text-blue-600 mr-2" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="input" />
                    <input type="text" placeholder="Last Name" className="input" />
                  </div>
                  <input type="text" placeholder="Street Address" className="input" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="City" className="input" />
                    <input type="text" placeholder="State" className="input" />
                    <input type="text" placeholder="ZIP Code" className="input" />
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 font-semibold mb-1">Safaricom Phone Number</label>
                    <input
                      type="tel"
                      placeholder="2547XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-green-600 focus:ring-green-500 focus:border-green-600 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 shadow-sm"
                    />
                    <p className="text-sm text-gray-500 mt-1">We'll send an M-Pesa prompt to this number.</p>
                  </div>
                </div>
              </div>


                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <CreditCard className="text-blue-600 mr-2" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600">Payment processing will be implemented here. For now, this is a demo checkout.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-6">
                    {cart.cartitems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${item.sub_total}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Subtotal:</span>
                      <span className="font-medium text-gray-900">${cart.cart_total}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Shipping:</span>
                      <span className="font-medium text-gray-900">Free</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-blue-600">${cart.cart_total}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Place Order"
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    By placing your order, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
