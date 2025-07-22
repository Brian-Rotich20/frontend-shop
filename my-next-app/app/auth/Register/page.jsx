'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import toast from 'react-hot-toast';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
      <path fill="#4285F4" d="M533.5 278.4c0-17.7-1.6-35-4.7-51.7H272v97.8h146.9c-6.3 34-25 62.8-53.5 82.1v68h86.4c50.6-46.6 81.7-115.3 81.7-196.2z" />
      <path fill="#34A853" d="M272 544.3c72.4 0 133.2-23.9 177.6-64.9l-86.4-68c-24.1 16.2-55 25.7-91.2 25.7-70 0-129.3-47.2-150.6-110.6H33v69.5C78.6 475.1 168.7 544.3 272 544.3z" />
      <path fill="#FBBC05" d="M121.4 326.5c-10.8-32.3-10.8-66.9 0-99.2V157.8H33c-43.2 85.3-43.2 186.2 0 271.5l88.4-69.5z" />
      <path fill="#EA4335" d="M272 107.7c39.4-.6 77.4 14.5 106.4 42.3l79.4-79.4C408.9 24.6 342.4-1.5 272 0 168.7 0 78.6 69.2 33 157.8l88.4 69.5C142.7 154.9 202 107.7 272 107.7z" />
    </svg>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const next = searchParams?.get("next") || "/";
  
  const [form, setForm] = useState({
    email: '',
    phone_number: '',
    username: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle redirect for authenticated users
  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (session.user.isNewUser || !session.user.phone_number) {
        router.push('/complete-profile');
      } else {
        router.push(next);
      }
    }
  }, [status, session, router, next]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleGoogleSignUp = async () => {
    try {
      await signIn("google", { 
        callbackUrl: '/complete-profile'
      });
    } catch (error) {
      console.error('Google sign up error:', error);
      toast.error('Failed to sign up with Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (form.password !== form.password_confirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
      const res = await fetch(`${apiUrl}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Please log in.');
        router.push(`/auth/login?next=${encodeURIComponent(next)}`);
      } else {
        setError(
          data?.errors?.email?.[0] ||
          data?.errors?.phone_number?.[0] ||
          data?.errors?.password?.[0] ||
          data?.message ||
          'Registration failed. Please check your input.'
        );
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm mb-6 hover:bg-gray-50 disabled:opacity-50"
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or register with email</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="Email"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
          />
          <input
            type="text"
            value={form.phone_number}
            onChange={handleChange('phone_number')}
            placeholder="Phone Number"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
          />
          <input
            type="text"
            value={form.username}
            onChange={handleChange('username')}
            placeholder="Username (optional)"
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
          />
          <input
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            placeholder="Password"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
          />
          <input
            type="password"
            value={form.password_confirm}
            onChange={handleChange('password_confirm')}
            placeholder="Confirm Password"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => router.push(`/auth/login?next=${encodeURIComponent(next)}`)}
            className="text-green-600 hover:underline"
            disabled={loading}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading registration...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}