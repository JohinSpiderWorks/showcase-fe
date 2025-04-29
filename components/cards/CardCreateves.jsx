
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/services/baseUrl";
import FallbackImage from "../FallbackImage";
import { useCreative } from "@/context/CreativeContext";
import LoadingAniCountries from "../loadingAnimation/LoadingAniCountries";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";


function Card() {

  const { creativeData, isLoading, searchTerm } = useCreative()
  console.log("creativeData---card",creativeData.data);
  console.log("creativeData---loading",isLoading);
  
 
  
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const extractedUrls = creativeData.data?.map((item) => ({
      id: item.id,
      name: item.name,
      url: item.photo?.url ? `${BASE_URL}${item.photo.url}` : null,
    }));

    setImageUrls(extractedUrls);
  }, [creativeData]);

  if (isLoading) return <LoadingAnimation />
  if(!creativeData||!creativeData.data||creativeData.data.length === 0){return <div>No data available</div>}

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {Array.isArray(imageUrls) ? (
    imageUrls
      .filter((item) => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) // 🔥 Filter items based on search input
      .map((item) => (
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
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      ))
  ) : null}
</div>
    </>
  );
}

export default Card;
