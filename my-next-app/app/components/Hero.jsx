'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flame } from 'lucide-react';

const EcommerceHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Slider images with curated e-commerce content
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "New Collection",
      subtitle: "Spring 2024",
      cta: "Shop Now"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Quality",
      subtitle: "Handpicked Items",
      cta: "Explore"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Trending Now",
      subtitle: "Limited Edition",
      cta: "Discover"
    },
     {
      id: 4,
      image: "/hero.jpg", // Local image from /public
      title: "Local Hero",
      subtitle: "Featured Collection",
      cta: "See More"
   }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-screen max-h-[600px] flex flex-col lg:flex-row gap-4 p-4 bg-gray-50">
      {/* Main Slider Banner - 3/4 width on desktop */}
      <div className="relative flex-1 lg:w-3/4 h-64 lg:h-full rounded-2xl overflow-hidden group shadow-lg">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-opacity-20"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div className="space-y-4 px-6">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl font-light opacity-90">
                    {slide.subtitle}
                  </p>
                  <button className="mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-orange" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-orange" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hot Deals Banner - 1/4 width on desktop */}
      <div className="lg:w-1/4 h-64 lg:h-full bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg overflow-hidden relative">
        <div className="absolute inset-0  bg-opacity-10"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-orange p-6 text-center">
          {/* Hot Deals Header */}
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-yellow-300 animate-pulse" />
            <h2 className="text-xl font-bold">HOT DEALS</h2>
          </div>

          {/* Discount Badge */}
          <div className="bg-white text-red-600 rounded-full px-4 py-2 mb-4 font-black text-2xl shadow-lg">
            50% OFF
          </div>

          {/* Countdown Timer */}
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2 justify-center">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">LIMITED TIME</span>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="bg-white bg-opacity-20 rounded-lg px-2 py-1 min-w-[3rem]">
                <div className="text-xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">HRS</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-2 py-1 min-w-[3rem]">
                <div className="text-xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">MIN</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-2 py-1 min-w-[3rem]">
                <div className="text-xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs opacity-80">SEC</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105 shadow-lg">
            Shop Deals
          </button>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHero;