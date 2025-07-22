'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

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

function CompanyLogo() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const next = searchParams.get("next") || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (session.user.isNewUser || !session.user.phone_number) {
        router.push('/complete-profile');
      } else {
        router.push(next);
      }
    }
  }, [status, session, router, next]);

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: next });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: emailOrPhone,
        password,
      });

      if (res?.ok) {
        toast.success('Login successful!');
        // The useEffect will handle the redirect
      } else {
        toast.error("Invalid email/phone or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4"></div>
          <div className="text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white/80 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
        <CompanyLogo />
        
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-600 text-sm">Sign in to your account</p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center border border-slate-200 rounded-xl py-3 px-4 text-sm mb-6 hover:bg-slate-50 disabled:opacity-50 transition-all duration-200 hover:shadow-md active:scale-[0.98]"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-slate-500">Or sign in with credentials</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:opacity-50 transition-all duration-200 text-base"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:opacity-50 transition-all duration-200 text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-slate-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold text-base hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 hover:shadow-lg active:scale-[0.98] mt-6"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push(`/auth/register?next=${encodeURIComponent(next)}`)}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
              disabled={loading}
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4"></div>
          <div className="text-slate-600">Loading login...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}