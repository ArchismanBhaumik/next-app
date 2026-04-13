"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
};

const ProductCarousel = ({ images }: Props) => {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 🔁 Auto-play
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div
      className="relative size-full p-5 sm:h-52 md:h-72 lg:h-96 overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`slide-${i}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ›
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;