'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

function CompleteProfileForm() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/checkout';
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/register');
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
    
    if (!phoneNumber.trim()) {
      toast.error('Phone number is required');
      return;
    }

    setLoading(true);

    try {
      // If it's a Google user without backend token, we need to register them first
      if (session?.user?.email && !session?.accessToken) {
        // Register Google user with backend
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
        const registerRes = await fetch(`${apiUrl}/auth/google-register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
            name: session.user.name,
            phone_number: phoneNumber,
          }),
        });

        if (registerRes.ok) {
          const data = await registerRes.json();
          // Update the session with the new token
          await update({
            ...session,
            accessToken: data.token,
            user: {
              ...session.user,
              phone_number: phoneNumber,
              isNewUser: false,
            }
          });
          
          toast.success('Profile completed successfully!');
          router.push(next);
          return;
        }
      }

      // For existing users with tokens
      if (session?.accessToken) {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
        const res = await fetch(`${apiUrl}/complete-profile/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({ phone_number: phoneNumber }),
        });

        const data = await res.json();

        if (res.ok) {
          // Update the session
          await update({
            ...session,
            user: {
              ...session.user,
              phone_number: phoneNumber,
              isNewUser: false,
            }
          });

          toast.success('Profile completed successfully!');
          router.push(next);
        } else {
          if (res.status === 401) {
            toast.error('Authentication expired. Please sign in again.');
            signOut();
          } else {
            toast.error(data.message || 'Failed to update profile');
          }
        }
      } else {
        toast.error('Authentication error. Please sign in again.');
        signOut();
      }
    } catch (err) {
      console.error('Profile completion error:', err);
      toast.error('Failed to submit phone number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div>Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div>Redirecting to registration...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <h1 className="text-xl font-semibold mb-4">Complete Your Profile</h1>
        <p className="text-sm text-gray-600 mb-4">
          Welcome {session?.user?.name || session?.user?.email}! Please provide your phone number to continue.
        </p>

        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number (e.g., +1234567890)"
          required
          disabled={loading}
          className="w-full px-3 py-2 mb-4 border rounded focus:ring focus:outline-none disabled:opacity-50"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading || !phoneNumber.trim()}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Continue to Checkout'}
          </button>
          
          <button
            type="button"
            onClick={() => signOut()}
            disabled={loading}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div>Loading profile completion...</div>
      </div>
    }>
      <CompleteProfileForm />
    </Suspense>
  );
}