'use client'

import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, LayoutGrid } from 'lucide-react'
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'; 

export default function ProfessionalNavbar({handleSignOut}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { cartCount } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const [loadingAction, setLoadingAction] = useState(null);

  const handleLogoutClick = async () => {
    setLoadingAction("logout");
    try {
      if (handleSignOut) {
        await handleSignOut();
      } else {
        await signOut();
      }
    } finally {
      setLoadingAction(null);
      setIsProfileOpen(false);
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLoginClick = async () => {
    setLoadingAction("login");
    try {
      await handleLogin();
    } finally {
      setLoadingAction(null);
      setIsProfileOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/*-------- Logo----------- */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6m-16 0h16"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inova</h1>
              <p className="text-xs text-gray-500 -mt-1">Your Shop</p>
            </div>
          </div>

          {/*----- Search bar ----*/}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, categories and more..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-lg hover:bg-oranage-700 transition-colors cursor-pointer">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/*--------- Right side icons---------- */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Wishlist</span>
            </button>
            <Link
              href="/categories"
              className="hidden md:flex items-center text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
            >
              <span className="text-sm">Categories</span>
              <LayoutGrid className="w-5 h-5 space-x-1" />
            </Link>
            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:block text-sm">Cart</span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block text-sm">Account</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
                  <div className="py-1">
                    <div className="px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-100">
                      My Account
                    </div>
                    
                    {session ? (
                      // Authenticated user options
                      <>
                        <Link 
                          href="/my-orders" 
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span>My Orders</span>
                        </Link>
                        <Link 
                          href="/chat" 
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-all duration-200"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <span>Chat with Sellers</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogoutClick}
                          disabled={loadingAction === "logout"}
                          className={`flex items-center justify-between w-full px-4 py-3 text-sm text-left transition-all duration-200 ${
                            loadingAction === "logout" 
                              ? "text-gray-400 cursor-not-allowed bg-gray-50" 
                              : "text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                          }`}
                        >
                          <span>Logout</span>
                          {loadingAction === "logout" && (
                            <Loader2 className="animate-spin w-4 h-4 ml-2" />
                          )}
                        </button>
                      </>
                    ) : (
                      // Non-authenticated user options
                      <button
                        onClick={handleLoginClick}
                        disabled={loadingAction === "login"}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm text-left transition-all duration-200 ${
                          loadingAction === "login" 
                            ? "text-gray-400 cursor-not-allowed bg-gray-50" 
                            : "text-orange-600 hover:bg-orange-50 hover:text-orange-700 cursor-pointer font-medium"
                        }`}
                      >
                        <span>Login to Account</span>
                        {loadingAction === "login" && (
                          <Loader2 className="animate-spin w-4 h-4 ml-2" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 flex items-center justify-center h-full">
          <div className="container mx-auto px-6 py-3">
            <nav className="space-y-2 flex flex-col items-center">
              <a
                href="#"
                className="block text-red-600 font-semibold hover:text-red-700 py-1.5 cursor-pointer transition-colors"
              >
                Sale
              </a>
              
              <hr className="w-full border-gray-200 my-2" />
              
              <a href="#" className="block text-gray-700 hover:text-blue-600 py-1.5 cursor-pointer transition-colors">
                Wishlist
              </a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 py-1.5 cursor-pointer transition-colors">
                Track Order
              </a>
              
              <hr className="w-full border-gray-200 my-2" />

              {session ? (
                <>
                  <Link 
                    href="/my-orders" 
                    className="block text-gray-700 hover:text-blue-600 py-1.5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>

                  <Link 
                    href="/chat" 
                    className="block text-gray-700 hover:text-blue-600 py-1.5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chat with Sellers
                  </Link>

                  <button
                    onClick={handleLogoutClick}
                    disabled={loadingAction === "logout"}
                    className={`flex items-center gap-2 text-left text-gray-700 hover:text-blue-600 py-1.5 transition-colors ${
                      loadingAction === "logout" ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {loadingAction === "logout" && <Loader2 className="animate-spin w-4 h-4" />}
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  disabled={loadingAction === "login"}
                  className={`flex items-center gap-2 text-left text-gray-700 hover:text-blue-600 py-1.5 transition-colors ${
                    loadingAction === "login" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loadingAction === "login" && <Loader2 className="animate-spin w-4 h-4" />}
                  Login
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}