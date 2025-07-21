'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CompleteProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

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
        toast.success('Phone number added successfully!');
        router.push('/checkout'); // ✅ Redirect to checkout
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      toast.error('Failed to submit phone number.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <h1 className="text-xl font-semibold mb-4">Complete Your Profile</h1>
        <p className="text-sm text-gray-600 mb-4">
          Please provide your phone number to continue.
        </p>

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3 py-2 mb-4 border rounded focus:ring focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Submitting...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}
