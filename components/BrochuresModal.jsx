"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function BrochuresModal({ isOpen, onClose, pageUrls}) {
  console.log("props passed", pageUrls);

  const [current, setCurrent] = useState(0);
  const length = pageUrls.length;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen || length === 0) return; // Added check for length
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [isOpen, length]); // Added isOpen to dependencies

  const prevSlide = () =>
    setCurrent((current) => (current - 1 + length) % length); // Simplified logic
  const nextSlide = () => setCurrent((current) => (current + 1) % length); // Simplified logic

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
        onClick={handleOverlayClick}
      >
        <motion.div
          className="bg-white w-80 sm:p-4 xs:w-96 sm:w-1/2 md:w-[700px] lg:w-[900px] rounded-xl" //
          initial={{ opacity: 0, y: -60 }} // Initial state
          animate={{ opacity: 1, y: 0 }} // Animate to this state
          exit={{ opacity: 0, y: -70 }} // Exit state
          transition={{ duration: 0.9 }} // Transition duration
        >
          <div className="overflow-hidden relative">
            {/* Carousel Wrapper */}
            <div
              className="flex transition-transform ease-out duration-500 "
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {pageUrls.map((img, index) => (
                <Image
                  className="object-cover w-96 h-96  md:mx-36  lg:mx-60 "
                  key={index}
                  src={img || "/noimage.png"}
                  alt={`Slide ${index + 1}`}
                  width={900}
                  height={900}
                  onError={(e) => {
                    e.target.src = "/noimage.png";
                  }} // Set fallback image on error
                />
              ))}
            </div>
            {/* button */}
            <div>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-gray-800/50 text-white rounded-full"
              >
                ❯
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-2">
              {pageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`transition-all bg-white w-3 h-3 rounded-full ${
                    current === index ? "p-2" : "bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default BrochuresModal;
