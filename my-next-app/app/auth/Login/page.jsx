'use client';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Email or Phone"
        className="w-full p-2 border mb-2"
        value={emailOrPhone}
        onChange={(e) => setEmailOrPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-blue-500 underline">Register</a>
      </p>
    </form>
  );
}
