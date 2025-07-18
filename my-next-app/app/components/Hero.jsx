'use client'

import { ChevronLeft, ChevronRight, Star, Truck, Clock, Tag } from 'lucide-react'
import { useState, useRef } from 'react'

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const scrollRef = useRef(null)
  
  const categories = [
    'Furniture',
    'Decor',
    'Lighting',
    'Bedding',
    'Kitchen',
    'Bath',
    'Outdoor',
    'Storage',
    'Rugs',
    'Art',
    'Mirrors',
    'Plants'
  ]

  const heroImages = [
    'hero.jpg',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=675&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=675&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=675&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=675&fit=crop&crop=center'
  ]

  const promoBoxes = [
    {
      title: 'Hot Deals',
      subtitle: 'Up to 70% off',
      icon: Tag,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Top Rated',
      subtitle: '5-star products',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Fast Delivery',
      subtitle: 'Same day shipping',
      icon: Truck,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Daily Discounts',
      subtitle: 'New deals daily',
      icon: Clock,
      color: 'from-green-500 to-green-600'
    }
  ]

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative bg-slate-50">
      {/* Top Categories Section */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-slate-700">Categories</h3>
            <div className="flex gap-1">
              <button
                onClick={scrollLeft}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={scrollRight}
                className="p-1.5 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
          
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-4 py-2 text-sm bg-white text-slate-600 rounded-full font-medium hover:bg-slate-800 hover:text-white transition-all duration-200 border border-slate-200 hover:border-slate-800 whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hero Image - Left Side */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImages[currentImageIndex]}
                alt="Modern lifestyle scene"
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent">
                <div className="flex flex-col justify-center h-full px-6 sm:px-8 lg:px-12">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-tight">
                    Transform Your
                    <span className="block font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Living Space
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 font-light leading-relaxed max-w-lg">
                    Discover premium home essentials crafted for modern living. Quality meets style in every piece.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                      Shop New Arrivals
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Navigation Dots */}
            <div className="flex justify-center mt-6 gap-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-gray-900 scale-110' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Promotional Boxes - Right Side */}
          <div className="lg:col-span-1 h-full">
            <div className="h-full flex flex-col">
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-2 flex-1">
                {promoBoxes.map((box, index) => {
                  const IconComponent = box.icon
                  return (
                    <div
                      key={index}
                      className={`relative p-4 lg:p-3 rounded-xl bg-gradient-to-br ${box.color} text-white overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl lg:flex-1 lg:min-h-0`}
                    >
                      <div className="relative z-10 h-full flex flex-col justify-center">
                        <IconComponent className="w-6 h-6 lg:w-5 lg:h-5 mb-2 lg:mb-1" />
                        <h4 className="text-base lg:text-sm font-bold mb-1">{box.title}</h4>
                        <p className="text-xs lg:text-xs text-white/90 font-medium">{box.subtitle}</p>
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 lg:w-8 lg:h-8 bg-white/20 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 lg:w-6 lg:h-6 bg-white/10 rounded-full"></div>
                    </div>
                  )
                })}
              </div>
              
              {/* Special Offer Banner */}
              <div className="mt-4 lg:mt-2 p-4 lg:p-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl text-white">
                <div className="text-center">
                  <h4 className="text-lg lg:text-sm font-bold mb-2 lg:mb-1">Special Offer</h4>
                  <p className="text-slate-300 mb-3 lg:mb-2 text-sm lg:text-xs">Get 30% off your first order</p>
                  <button className="bg-white text-slate-900 px-5 py-2.5 lg:px-4 lg:py-2 rounded-full font-semibold hover:bg-slate-100 transition-colors text-sm lg:text-xs">
                    Claim Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}