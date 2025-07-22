'use client';

import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { CartProvider } from '@/context/CartContext';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/ToastProvider';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from '@/context/LoadingContext';
import TopLoadingBar from './components/TopLoadingBar';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Toaster position="top-center" />
        <ToastProvider>
            <LoadingProvider>
          <SessionProvider>
            <CartProvider>
              <Navbar />
              <TopLoadingBar />
              {children}
              <Footer />
            </CartProvider>
          </SessionProvider>
          </LoadingProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
