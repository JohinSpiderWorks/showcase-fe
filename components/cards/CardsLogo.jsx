"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useLogo } from "@/context/LogoContext";
import FallbackImage from "../FallbackImage";

export default function CardsLogo() {
  const { logoData, isLoading, error, searchTerm } = useLogo(); // Add searchTerm
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const extractedUrls = logoData.data?.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.logo_image?.url ? `${BASE_URL}${item.logo_image.url}` : "",
    }));
    setImageUrls(extractedUrls || []);
  }, [logoData]);

  // Filter logos based on search term
  const filteredLogos = imageUrls.filter((item) => {
    if (!searchTerm) return true; // Show all if no search term
    const searchLower = searchTerm.toLowerCase();
    return item.name?.toLowerCase().includes(searchLower);
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return console.log("Error:", error);
  if (!logoData || !logoData.data) return <div>No data</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredLogos.length > 0 ? (
          filteredLogos.map((item) => (
            <div key={item.id || item.name}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <FallbackImage
                  src={item.url}
                  fallback="/noimage.png"
                  alt={item.name || "Image"}
                  width={500}
                  height={900}
                  className="flex h-96 p-3 hover:shadow-sm"
                  style={{ objectFit: "fit" }}
                />
              </motion.div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-10">
            {searchTerm ? `No logos found for "${searchTerm}"` : 'No logos available'}
          </div>
        )}
      </div>
    </>
  );
}