import React, { useState, useEffect, useRef } from "react";
import SlideOne from "./AboutUsSlides/SlideOne";
import SlideTwo from "./AboutUsSlides/SlideTwo";
import SlideThree from "./AboutUsSlides/SlideThree";
import SlideFour from "./AboutUsSlides/SlideFour";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function AboutUs() {
  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />, <SlideFour />];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (autoPlay && !isHovered) {
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length),
        3000
      );
    }
    return () => resetTimeout();
  }, [autoPlay, currentIndex, isHovered, slides.length]);

  const goToNextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  const goToPrevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100 p-4">
      <video
        src="/src/assets/43661-436237700.mp4"
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-4xl bg-white/95 rounded-lg shadow-2xl overflow-hidden">
          <div className="relative">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 p-6"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {slide}
                </div>
              ))}
            </div>
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/75 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-gray-500" : "bg-white"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className="mt-6 p-3 text-black bg-white rounded-full hover:bg-gray-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={autoPlay ? "Pause autoplay" : "Start autoplay"}
        >
          {autoPlay ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
