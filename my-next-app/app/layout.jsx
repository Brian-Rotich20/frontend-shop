'use client';

import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from 'next-auth/react';
import { ClerkProvider } from '@clerk/nextjs'; // ✅ add this

export default function RootLayout({ children }) {
  return (
    <ClerkProvider> {/* ✅ wrap everything in ClerkProvider */}
      <html lang="en">
        <body>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </SessionProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
