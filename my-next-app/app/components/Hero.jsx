'use client';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, ShoppingBag, Star, ArrowRight, Zap, Shield, Truck } from 'lucide-react';

const HeroSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
    { id: 'beauty', name: 'Beauty & Care', icon: '💄' },
    { id: 'books', name: 'Books & Media', icon: '📚' },
    { id: 'toys', name: 'Toys & Games', icon: '🎮' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
    { id: 'health', name: 'Health & Wellness', icon: '💊' }
  ];

  const features = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Free Delivery',
      description: 'On orders over $50'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure Payment',
      description: '100% protected'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Fast Shipping',
      description: '1-3 business days'
    }
  ];

  const scrollCategories = (direction) => {
    const container = document.getElementById('categories-container');
    const scrollAmount = 200;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white">
      {/* Categories Bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center py-4">
            {/* Left Scroll Button */}
            {/* <button
              onClick={() => scrollCategories('left')}
              className="absolute left-4 z-10 p-2 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button> */}

            {/* Categories Container */}
            <div
              id="categories-container"
              className="flex space-x-1 overflow-x-auto scrollbar-hide scroll-smooth px-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="whitespace-nowrap">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            {/* <button
              onClick={() => scrollCategories('right')}
              className="absolute right-4 z-10 p-2 rounded-full bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>New Collection 2024</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover
                <span className="block text-blue-600">Amazing Products</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Shop from thousands of premium products with fast delivery and unbeatable prices. Your perfect purchase is just a click away.
              </p>
            </div>

            {/* Search Bar */}
            {/* <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
              />
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200">
                View Categories
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg text-blue-600 mb-2">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative">
            {/* Background Decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 blur-3xl"></div>
            
            {/* Main Visual Container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              {/* Featured Product Cards */}
              <div className="space-y-6">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">📱</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Latest Smartphone</h3>
                      <p className="text-gray-600 text-sm">Premium features</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.9</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">$899</p>
                      <p className="text-sm text-gray-500 line-through">$999</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform duration-300 ml-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">👕</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Designer Jacket</h3>
                      <p className="text-gray-600 text-sm">Premium quality</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">$159</p>
                      <p className="text-sm text-gray-500 line-through">$199</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🎧</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Wireless Headphones</h3>
                      <p className="text-gray-600 text-sm">Noise cancelling</p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">4.7</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">$299</p>
                      <p className="text-sm text-gray-500 line-through">$399</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                50% OFF
              </div>
              <div className="absolute top-8 -left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                NEW
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-4 left-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;