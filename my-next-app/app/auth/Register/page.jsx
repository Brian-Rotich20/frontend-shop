'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    phone_number: '',
    username: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
   

      if (res.ok) {
        alert('Registration successful! Please log in.');
        router.push('/auth/login');
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
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={form.phone_number}
              onChange={handleChange('phone_number')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="+254712345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username (optional)</label>
            <input
              type="text"
              value={form.username}
              onChange={handleChange('username')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="your_username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={form.password_confirm}
              onChange={handleChange('password_confirm')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-green-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
