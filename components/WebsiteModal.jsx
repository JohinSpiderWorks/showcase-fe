"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/services/baseUrl";
import { useEffect } from "react";
import FallbackImage from "./FallbackImage";


function WebsiteModal({ isOpen, onClose, image, techData }) {
  //console.log("datatechonolgo----",data);
  
  

  const technologies = Object.values(techData)
    .flat() // Flatten the outer array
    .flatMap(item => item?.website_technologies || []); // Flatten website_technologies
  
  const extractedData = technologies.map(tech => ({
    id: tech?.id,
    name: tech?.name,
    logoUrl: tech?.logo?.url ? `${BASE_URL}${tech.logo.url}` : null
  }));
  

  // useEffect(() => {
  //   if (techData && image?.id && techData[image.id]) {
  //     const technologies = techData[image.id]
  //       .flatMap(item => item?.website_technologies || [])
  //       .map(tech => ({
  //         id: tech?.id,
  //         name: tech?.name,
  //         logoUrl: tech?.logo?.url ? `${BASE_URL}${tech.logo.url}` : null
  //       }))
  //       .filter(tech => tech.logoUrl !== null);
  //   }
  // }, [techData, image]);
  

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null; // Added error handling

  if (!image || !techData) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <p className="text-white">Loading...</p>
      </div>
    );
  }
  console.log("datatechimage----",image?.technologyUsed);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-95"
      onClick={handleOverlayClick}
    >
      <motion.div
        key={image?.id}
        className="bg-white p-4 rounded-xl"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }} // Animate to this state
        exit={{ opacity: 0, y: -70 }} // Exit state
        transition={{ duration: 0.9,ease:"easeOut" }} // Transition duration
      >
        <div className="flex p-1 sm:p-4">
          <div>
            {/* <Image
              src={image.clientLogo || "/noimage.png"}
              alt={image.clientName || "Client Logo"}
              width={40}
              height={20}
              onError={(e) => {
                e.target.src = "/noimage.png"
              }}
            /> */}
            <FallbackImage
              src={image.clientLogo}
              fallback="/noimage.png"
            alt={image.clientName}
            width={40}
            height={20}
            />
          </div>
          <div className="ms-auto">
            <h2 className="font-semibold">
              Brand Name : <span className="font-thin">{image.name}</span>
            </h2>
          </div>
        </div>
        {/* <Image
          src={image.url || "noimage.png"}
          alt={image.name || "Website Image"}
          width={600}
          height={400}
          objectFit="cover"
          className="rounded-xl w-72 sm:w-96 xl:w-[800px] xs:h-96 sm:h-40 xl:h-80"
          onError={(e) => {
            e.target.src = "/noimage.png"
          }}
        /> */}
        <FallbackImage
          src={image.url}
          fallback="/noimage.png"
        alt={image.name}
        width={600}
        height={400}
        objectFit="cover"
        className="rounded-xl w-72 sm:w-96 xl:w-[800px] xs:h-96 sm:h-40 xl:h-80"
        />
        <div className="font-semibold xs:space-y-3 mt-3 xs:mt-6 text-xs sm:text-lg">
          <h1>
            Date of published :{" "}
            <span className="font-thin">
              {new Date(image.launch_date)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/(\d{2})-(\w{3})-(\d{4})/, "$1-$2-$3")}
            </span>
          </h1>
          <h1>
            Website Link :{" "}
            <span className="font-thin">{image.website_url}</span>
          </h1>
          <h1>Tools we used</h1>
        </div>
        <div className="flex flex-wrap  gap-4 mt-4 max-h-[200px] overflow-y-auto">
          {Array.isArray(image.technologyUsed) && image.technologyUsed.length > 0 ? (
            image.technologyUsed.map((techUrl, index) => (
              <div 
                key={index} 
                className="bg-[#F1F5F9] p-2 rounded-lg flex items-center justify-center"
                style={{ minWidth: '80px', height: '60px' }}
              >
                <FallbackImage
                  src={techUrl}
                  fallback="/noimage.png"
                  alt={`Technology ${index + 1}`}
                  width={80}
                  height={40}
                  className="object-contain h-full w-full"
                  onError={(e) => {
                    console.error('Failed to load tech logo:', techUrl);
                    e.currentTarget.src = '/noimage.png';
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-center p-4 font-semibold text-gray-500">
              No technologies available
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default WebsiteModal;