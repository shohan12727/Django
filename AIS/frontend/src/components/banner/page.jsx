"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    bgGradient: "from-slate-900 to-blue-950",
    emoji: "🎮",
    tag: "Gaming Powerhouses",
    title: "Dominate the Leaderboards",
    description: "Unleash extreme frame rates with top-tier ASUS ROG, Lenovo Legion, and Acer Predator rigs. Packed with NVIDIA RTX 40-series graphics.",
    linkText: "Explore Gaming Laptops",
    linkUrl: "/laptops?type=Gaming",
  },
  {
    id: 2,
    bgGradient: "from-zinc-900 to-neutral-950",
    emoji: "🍏",
    tag: "Apple Ecosystem",
    title: "MacBook Pro & Air M3",
    description: "Experience revolutionary battery life and sheer engineering power. Perfect for compilation, design workflows, and everyday efficiency.",
    linkText: "Shop Apple MacBooks",
    linkUrl: "/laptops?brand=Apple",
  },
  {
    id: 3,
    bgGradient: "from-gray-900 to-indigo-950",
    emoji: "💼",
    tag: "Student & Professional",
    title: "Sleek Ultrabooks",
    description: "Maximize mobility without sacrificing raw performance. Exceptional displays, featherlight designs, and premium metal finishes.",
    linkText: "Browse Ultrabooks",
    linkUrl: "/laptops?type=Ultrabook",
  },
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CAROUSEL_SLIDES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CAROUSEL_SLIDES.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-gray-950 group">
      
      {/* Slides Track Wrapper */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {CAROUSEL_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className={`w-full flex-shrink-0 bg-gradient-to-r ${slide.bgGradient} text-white px-6 py-12 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[400px] md:min-h-[460px]`}
          >
            {/* Slide Content Left */}
            <div className="max-w-xl space-y-4 md:space-y-5 text-center md:text-left">
              <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-blue-500/30">
                {slide.tag}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {slide.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                {slide.description}
              </p>
              <div className="pt-2">
                <Link
                  href={slide.linkUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg shadow-blue-600/20 transition duration-200"
                >
                  {slide.linkText} &rarr;
                </Link>
              </div>
            </div>

            {/* Slide Graphic Right */}
            <div className="text-[110px] md:text-[150px] select-none transform transition-transform duration-500 group-hover:scale-105">
              {slide.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Manual Control Buttons (Hidden on mobile, visible on desktop hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        ⏮️
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-3 rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none backdrop-blur-sm"
        aria-label="Next Slide"
      >
        ⏭️
      </button>

      {/* Bottom Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-y-0 -translate-x-1/2 flex space-x-2 z-20">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "w-6 bg-blue-500" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}