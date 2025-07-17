"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeftCircle, Loader2 } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturnHome = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 800); // Optional delay to show spinner
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
        <ArrowLeftCircle className="text-red-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={handleReturnHome}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center w-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Returning...
            </>
          ) : (
            "Return to Home"
          )}
        </button>
      </div>
    </div>
  );
}
