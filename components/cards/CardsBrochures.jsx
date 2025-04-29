"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BrochuresModal from "../BrochuresModal";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useBrochure } from "@/context/BrochuresContext";
import FallbackImage from "../FallbackImage";

function CardsBrochures() {
  const {
    brochureData,
    isLoading,
    error,
    searchTerm
  } = useBrochure()

  //console.log("brochure--card",brochureData);

  const [imageUrls, setImageUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (brochureData?.data && brochureData.data.length > 0) {
      const extractedUrls = brochureData?.data?.map((item) => ({
        id: item.id,
        name: item.name,
        url: item.thumbnail?.url ? `${BASE_URL}${item.thumbnail.url}` : null,
        description: item.description,
        combinedUrls: [
          item.thumbnail?.url ? `${BASE_URL}${item.thumbnail.url}` : null,
          ...item.brochure_pages.map(
            (page) => page.image_name?.url ? `${BASE_URL}${page.image_name.url}` : null
          ),
        ],
      }));
      //console.log("urls", extractedUrls);
      setImageUrls(extractedUrls);
    } else {
      setImageUrls([]);
    }
  }, [brochureData]);

  // Filter brochures based on search term
  const filteredBrochures = imageUrls.filter((item) => {
    if (!searchTerm) return true; // Show all if no search term
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
  });

  //console.log("imageUrls---",imageUrls);
  
  if (isLoading) return <LoadingAnimation />
  if (error) return console.log("Error:", error);
  if (!brochureData || !brochureData?.data || brochureData?.data.length === 0) {return <div>No data available</div>}
  
  return (
    <>
      <div className="cardcontainer grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:p-14 mt-2 ">
      {filteredBrochures.length > 0 ? (
          filteredBrochures.map((item, index) => (
          <div
            onClick={() => handleImageClick(item)}
            key={index}
            className="cardarticle relative mb-28 xl:h-80 h-72 w-screen sm:w-full  group"
          >
            {/* <Image
              src={item.url}
              alt={`Website Preview ${index + 1}`}
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-xl w-full h-full"
              image={selectedImage}
            /> */}
            
            <FallbackImage
              src={item.url}
              alt={`Website Preview ${index + 1}`}
              width={600}
              height={400}
              objectFit="cover"
              className="rounded-xl w-full h-full"
            image={selectedImage}
            fallback="/noimage.png"
            />

            <div className="carddata absolute shadow-xl w-11/12 p-3 text-white bg-black bg-opacity-60 backdrop-blur-md border border-gray-200 text-center rounded-xl -bottom-24 left-0 right-0 mx-auto transition-opacity duration-1000 delay-100 opacity-0 group-hover:opacity-100 animate-show-data">
              <h2 className="cardtitle font-semibold text-xl">{item.name}</h2>
              <span  className="carddescription block h-20 overflow-y-auto scrollbar-hide">{item.description}</span>
            </div>
          </div>
           ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              {searchTerm ? `No results found for "${searchTerm}"` : 'No brochures available'}
            </p>
          )}
        </div>
      {isModalOpen && ( // Conditionally render the Modal
        <BrochuresModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          url={selectedImage?.url}
          pageUrls={selectedImage?.combinedUrls}
        />
      )}
    </>
  );
}

export default CardsBrochures;
