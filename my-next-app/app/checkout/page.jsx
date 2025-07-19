"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, MapPin, CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { showToast } = useToast();

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay with your Safaricom M-Pesa account',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png',
      popular: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when your order is delivered',
      logo: 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
      popular: false
    },
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Pay securely with Stripe',
      logo: 'https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png',
      popular: false
    },
    {
      id: 'pesapal',
      name: 'PesaPal',
      description: 'Pay with PesaPal gateway',
      logo: 'https://www.pesapal.com/sites/default/files/pesapal-logo.png',
      popular: false
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      logo: 'https://logos-world.net/wp-content/uploads/2020/07/PayPal-Logo.png',
      popular: false
    }
  ];

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
  if (!selectedPaymentMethod) {
    alert("Please select a payment method");
    return;
  }

  if (selectedPaymentMethod === 'mpesa' && (!phone || !/^2547\d{8}$/.test(phone))) {
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-50 rounded-full">
            <ShoppingBag className="text-red-500" size={24} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Checkout Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (!cart) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/cart')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="mr-1" size={16} />
            Back to Cart
          </button>
          <div className="flex items-center">
            <Lock className="text-green-600 mr-3" size={24} />
            <h1 className="text-2xl font-semibold text-gray-900">Secure Checkout</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <User className="text-blue-600 mr-2" size={20} />
                <h2 className="text-lg font-medium text-gray-900">Customer Information</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{session?.user?.email || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-900">{session?.user?.name || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <MapPin className="text-blue-600 mr-2" size={20} />
                <h2 className="text-lg font-medium text-gray-900">Shipping Address</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Street Address" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <input 
                    type="text" 
                    placeholder="State" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  />
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-blue-600 mr-2" size={20} />
                <h2 className="text-lg font-medium text-gray-900">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    {method.popular && (
                      <div className="absolute -top-2 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Popular
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img src={method.logo} alt={method.name} className="h-8 w-auto object-contain" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                      
                      <div className={`w-4 h-4 border-2 rounded-full ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedPaymentMethod === method.id && (
                          <Check className="w-full h-full text-white" size={12} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* M-Pesa Phone Number Input */}
              {selectedPaymentMethod === 'mpesa' && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safaricom Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="2547XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    We'll send an M-Pesa prompt to this number.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {cart.cartitems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${item.sub_total}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${cart.cart_total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-blue-600">${cart.cart_total}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || !selectedPaymentMethod}
                className="w-full mt-6 bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
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
  );
}