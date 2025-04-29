"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/services/baseUrl";
import FallbackImage from "../FallbackImage";
import { useAnimation } from "@/context/AnimationContext";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";

function CardAnimations({ data }) {
  //console.log('animations images', data);
const { animationData,isLoading,searchTerm, setSearchTerm } = useAnimation()
  console.log('animationdata===', animationData);
  const DEFAULT_IMAGE = "/noimage.png"; 
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const extractedUrls = animationData.data?.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.image?.url ? `${BASE_URL}${item.image.url}` : DEFAULT_IMAGE
    }));
    console.log('urls-animation',extractedUrls);
    
    setImageUrls(extractedUrls);
  }, [animationData]);

  if (isLoading) return <LoadingAnimation />
  if(!animationData||!animationData.data||animationData.data.length === 0){return <div>No data available</div>}

  // const firstColumn = imageUrls.filter((image, index) => index % 3 === 0);
  // const secondColumn = imageUrls.filter((image, index) => index % 3 === 1);
  // const thirdColumn = imageUrls.filter((image, index) => index % 3 === 2);
  
  const filteredImageUrls = imageUrls.filter((image) => {
    if (!searchTerm) return true; // if no search, show all
    return image.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Distribute filtered images into 3 columns
  const columns = [[], [], []];
  filteredImageUrls.forEach((image, index) => {
    columns[index % 3].push(image);
  });

//const [firstColumn, secondColumn, thirdColumn] = columns;


  return (
    <>
      <div className=" mx-auto flex justify-center ">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-20 mb-20 ">
          <div className="gap-3">
            {firstColumn.map((image, index) => (
              <div key={index}>
                <motion.div
                  whileHover={{ scale: 1.04 }} // Adjust scale or other properties as needed
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Set the transition properties
                className="mb-2"
                >
                  <Image
                    src={image.url || DEFAULT_IMAGE }
                    alt={image.name}
                    width={400}
                    height={500}
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
           <div className="gap-3">
            {secondColumn.map((image, index) => (
              <div key={index}>
                <motion.div
                  whileHover={{ scale: 1.04 }} // Adjust scale or other properties as needed
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Set the transition properties
                  className="mb-2">
                  <Image
                    src={image.url || DEFAULT_IMAGE}
                    alt={image.name}
                    width={400}
                    height={400}
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
          <div className="gap-3">
            {thirdColumn.map((image, index) => (
              <div key={index}>
                <motion.div
                  whileHover={{ scale: 1.04 }} // Adjust scale or other properties as needed
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Set the transition properties
                  className="mb-2">
                  <Image
                    src={image.url || DEFAULT_IMAGE}
                    alt={image.name}
                    width={400}
                    height={500}
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-20 mb-20">
  {columns.map((column, colIndex) => (
    <div key={colIndex} className="gap-3">
      {column.map((image, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mb-2"
        >
          {/* <Image
            src={image.url}
            alt={image.name}
            width={400}
            height={500}
            className="object-contain"
          /> */}
          <FallbackImage
            src={image.url}
            fallback="/noimage.png"
          alt={image.name || "Image"}
          width={400}
          height={500}
          className="object-contain"
          />
        </motion.div>
      ))}
    </div>
  ))}
</div>

      </div>
    </>
  );
}

export default CardAnimations;
