'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

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

function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: emailOrPhone,
      password,
    });

    if (res.ok) {
      router.push(next);
    } else {
      alert("Invalid email/phone or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        <button
          onClick={() => {/* Google login logic later */}}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 text-sm mb-6 hover:bg-gray-50"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
