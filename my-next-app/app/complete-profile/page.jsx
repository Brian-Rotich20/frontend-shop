'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CompleteProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/checkout';
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated or profile is already complete
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/register');
      return;
    }
    
    if (status === 'authenticated' && session) {
      // If user already has phone number, redirect to next page
      if (session.user.phone_number && !session.user.isNewUser) {
        router.push(next);
      }
    }
  }, [status, session, router, next]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      toast.error('Phone number is required');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/complete-profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Profile completed successfully!');
        // Update session to mark as complete
        await fetch('/api/auth/session', { method: 'GET' });
        router.push(next);
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.error('Failed to submit phone number.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <h1 className="text-xl font-semibold mb-4">Complete Your Profile</h1>
        <p className="text-sm text-gray-600 mb-4">
          Please provide your phone number to continue to checkout.
        </p>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
          className="w-full px-3 py-2 mb-4 border rounded focus:ring focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Continue to Checkout'}
        </button>
      </form>
    </div>
  );
}