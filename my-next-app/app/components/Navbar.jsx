'use client'

import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function ProfessionalNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { cartCount } = useCart();
  const router = useRouter();

  

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty'
  ]
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/', // redirect after sign out
    });
  };
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 w-full">
   
      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/*-------- Logo----------- */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
              <h1 className="text-2xl font-bold text-gray-900">ShopHub</h1>
              <p className="text-xs text-gray-500 -mt-1">Your Shop</p>
            </div>
          </div>

          {/*----- Search bar ----*/}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, categories and more..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-grey p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/*--------- Right side icons---------- */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Wishlist</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
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
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:block text-sm">Account</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
                {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                          <div className="py-2">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              My Profile
                            </a>
                            <Link href="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              My Orders
                            </Link>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Settings
                            </a>
                            <hr className="my-1" />
                            <button
                              onClick={handleSignOut}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Categories navigation
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t border-gray-200">
          {categories.map((category, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
            >
              {category}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#"
            className="text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            Sale
          </a>
        </nav> */}

        {/* Mobile search */}
        <div className="md:hidden py-3 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {categories.map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="block text-red-600 font-semibold hover:text-red-700 py-2"
              >
                Sale
              </a>
              <hr className="my-4" />
              <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Wishlist</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Track Order</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Help</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}