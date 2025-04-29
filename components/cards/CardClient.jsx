"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useClient } from "@/context/ClientContext";
import FallbackImage from "../FallbackImage";

const ROTATION_RANGE = 15.5;
const HALF_ROTATION_RANGE = 9.5 / 2;

// Custom hook for rotation
function useCardRotation() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const transform = useMotionTemplate`rotateX(${springX}deg) rotateY(${springY}deg)`;

  const handleMouseMove = (e, ref) => {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { transform, handleMouseMove, handleMouseLeave };
}

// Individual Card component that uses the hook
const Card = ({ imagePath, index, activeCardIndex, setActiveCardIndex }) => {
  const imageUrl = imagePath?.fullimageUrl || "/noimage.png";
  const ref = useRef(null);
  const { transform, handleMouseMove, handleMouseLeave } = useCardRotation();
  const isFlipped = activeCardIndex === index;

  const handleCardClick = () => {
    if (isFlipped) {
      // If already flipped, unflip it
      setActiveCardIndex(null);
    } else {
      // Otherwise, flip this card (and unflip any other)
      setActiveCardIndex(index);
    }
  };

  // Define animations as separate objects to avoid runtime issues
  const cardAnimations = {
    rotateY: isFlipped ? 180 : 0
  };

  const backFaceAnimations = {
    opacity: isFlipped ? 1 : 0
  };

  return (
    <div className="perspective-1000">
      <motion.div
        key={index}
        ref={ref}
        onClick={handleCardClick}
        onMouseMove={(e) => !isFlipped && handleMouseMove(e, ref.current)}
        onMouseLeave={handleMouseLeave}
        animate={cardAnimations}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative h-44 w-60 rounded-xl bg-slate-100 cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-1 grid place-content-center rounded-xl bg-white opacity-50 shadow-lg hover:opacity-100"
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="text-center" style={{ transform: "translateZ(80px)" }}>
            {/* <Image
              className="h-32 w-40 transition-transform duration-300 delay-600 hover:scale-110"
              src={imageUrl}
              alt={`Client ${index + 1}`}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            /> */}
            <FallbackImage
              className="h-32 w-40 transition-transform duration-300 delay-600 hover:scale-110"
              src={imageUrl}
              alt={`Client ${index + 1}`}
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
              fallback="/noimage.png"
             />
          </div>
        </div>

        {/* Back of card - description */}
        <motion.div
          animate={backFaceAnimations}
          className="absolute inset-1 flex flex-col justify-center p-4 rounded-xl text-black shadow-lg bg-white"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-lg font-semibold mb-2">
            {imagePath.name || `Client ${index + 1}`}
          </h3>
          <p className="text-sm overflow-y-auto scrollbar-hide max-h-24">
            {imagePath.description || "No description available"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

function CardClient() {
  const { selectedCountry, isLoading, error, clientData,clientSearchTerm,
    setClientSearchTerm, } = useClient();
  // State to track which card is currently flipped (if any)
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cardContainerRef.current &&
        !cardContainerRef.current.contains(event.target)
      ) {
        setActiveCardIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardContainerRef, setActiveCardIndex]);

  
  

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>Error: {error}</div>;
  if (!clientData || !clientData.data || clientData.data.length === 0) {


    return (
      <div>No client data available at this time. Please try again later.</div>
    );
  }

  // Process images only when data is available
  const processedImages = clientData.data.map((item) => {
    const description = item.description;
    const name = item.name;
    const imageUrl = item.image_url?.url
      ? `${BASE_URL}${item.image_url.url}`
      : null;
    return {
      ...item,
      fullimageUrl: imageUrl,
      name,
      description,
    };
  });

  const filteredClients = processedImages.filter((item) => {
    if (!clientSearchTerm) return true;
    return item.name.toLowerCase().includes(clientSearchTerm.toLowerCase());
  });

  return (
    <div
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 grid-cols-1 p-4"
      ref={cardContainerRef}
    >
      {filteredClients.map((client, index) => (
  <Card
    key={index}
    imagePath={{
      ...client,
      fullimageUrl: client.image_url?.url ? `${BASE_URL}${client.image_url.url}` : null,
      name: client.name,
      description: client.description,
    }}
    index={index}
    activeCardIndex={activeCardIndex}
    setActiveCardIndex={setActiveCardIndex}
  />
))}
    </div>
  );
}

export default CardClient;