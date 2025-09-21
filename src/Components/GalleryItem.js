import React, { useState, useEffect } from "react";
import API from "../api";

const GalleryItem = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    API.get("/images").then((res) => setImages(res.data));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (!images.length) {
    return (
      <div className="p-6 bg-gray-100 text-center rounded-lg shadow">
        <p className="text-gray-600">No images found</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow">
      <div className="overflow-hidden rounded-xl">
        <img
          src={
            images[currentIndex].url.startsWith('http')
              ? images[currentIndex].url
              : `${process.env.REACT_APP_API_URL || 'https://melody-admin-backend.vercel.app'}${images[currentIndex].url}`
          }
          alt={images[currentIndex].title}
          className="w-full h-72 object-cover transition duration-500 ease-in-out"
          onError={(e) => console.error("Image load error:", e.target.src)}
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 w-3 rounded-full transition ${
              currentIndex === idx ? "bg-blue-600" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default GalleryItem;
