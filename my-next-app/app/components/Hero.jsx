'use client';
import React, { useState, useEffect } from 'react';

const EcommerceHero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Background */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: '#111927',
          backgroundImage: `
            radial-gradient(at 47% 33%, hsl(162.00, 77%, 40%) 0, transparent 59%), 
            radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)
          `
        }}
      />

      {/* Glassmorphism Hero Container */}
      <div 
        className={`
          min-h-screen transition-all duration-300 ease-out
          ${scrolled 
            ? 'backdrop-blur-3xl backdrop-saturate-200' 
            : 'backdrop-blur-2xl backdrop-saturate-150'
          }
        `}
        style={{
          backgroundColor: scrolled 
            ? 'rgba(17, 25, 40, 0.85)' 
            : 'rgba(17, 25, 40, 0.75)'
        }}
      >
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-white/3 rounded-full animate-bounce" 
               style={{ animationDuration: '3s' }} />
          <div className="absolute top-3/5 right-1/5 w-16 h-16 bg-white/5 rounded-full animate-ping" 
               style={{ animationDuration: '4s' }} />
        </div>

        {/* Main Hero Content */}
        <div className="container mx-auto px-4 lg:px-8 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            
            {/* Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Shop Premium
                  <span className="block bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                    Quality Products
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Discover thousands of high-quality products from trusted brands. 
                  Fast shipping, secure payments, and exceptional customer service.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-900 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-orange-900/50">
                  <span className="relative z-10">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button 
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:bg-white/10"
                  style={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  }}
                >
                  Browse Categories
                </button>
              </div>

            </div>

            {/* Product Images Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {/* Electronics */}
              <div 
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
              >
                <div className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop&auto=format" 
                    alt="Electronics"
                    className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-110 transition-transform duration-500"
                  />
                  <p className="text-white font-medium text-center">Electronics</p>
                </div>
              </div>

              {/* Fashion */}
              <div 
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
              >
                <div className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format" 
                    alt="Fashion"
                    className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-110 transition-transform duration-500"
                  />
                  <p className="text-white font-medium text-center">Fashion</p>
                </div>
              </div>

              {/* Home & Garden */}
              <div 
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
              >
                <div className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format" 
                    alt="Home & Garden"
                    className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-110 transition-transform duration-500"
                  />
                  <p className="text-white font-medium text-center">Home & Garden</p>
                </div>
              </div>

              {/* Sports */}
              <div 
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
              >
                <div className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format" 
                    alt="Sports"
                    className="w-full h-40 object-cover rounded-lg mb-3 group-hover:scale-110 transition-transform duration-500"
                  />
                  <p className="text-white font-medium text-center">Sports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default EcommerceHero;