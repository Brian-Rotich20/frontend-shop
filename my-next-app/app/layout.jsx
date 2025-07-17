'use client';

import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from 'next-auth/react';
import { ClerkProvider } from '@clerk/nextjs'; 
import { ToastProvider } from '@/components/ToastProvider';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider> {/* ✅ wrap everything in ClerkProvider */}
      <html lang="en">
        <body>
          <Toaster position="top-center" />
          <ToastProvider>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </SessionProvider>
          </ToastProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
