"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const hasCart = localStorage.getItem("cart_code");
    if (hasCart) {
      localStorage.removeItem("cart_code"); 
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-600" size={72} />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your order. Your payment has been received and your order is being processed.
        </p>

        <button
          onClick={() => router.push("/")}
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => router.push("/my-orders")}
          className="mt-3 w-full text-green-700 border border-green-600 py-3 rounded-lg hover:bg-green-100 transition"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}
