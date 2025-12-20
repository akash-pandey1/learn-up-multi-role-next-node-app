'use client';

import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  interval = 4000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getRandomIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === currentIndex && images.length > 1);
    return newIndex;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(getRandomIndex());
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl ${className}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-[#7C3AED]/20 via-[#EC4899]/20 to-[#F97316]/20 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-700 font-medium text-lg">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl shadow-2xl ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        {/* Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Carousel image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}

        {/* Overlay gradient for better text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

        {/* Optional: Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white shadow-lg' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
