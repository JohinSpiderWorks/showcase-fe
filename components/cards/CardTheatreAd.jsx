"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useTheatreAdd } from "@/context/TheatreAdContext";
import { toast } from "sonner";

function CardTheatreAd() {
  const { theatreAdData, isLoading, error ,searchTerm} = useTheatreAdd();
  console.log("theatreAdData--", theatreAdData.data);
  console.log("error---", error);

  const videoData = Array.isArray(theatreAdData.data) ? theatreAdData.data : [];
  //console.log("theatre--", videoData);
  const [hoverVideo, setHoverVideo] = useState(null);
  const [failedVideos, setFailedVideos] = useState(new Set());

  // const handleClick = (videoId) => {
  //   if (videoId) {
  //     window.open(`https://www.youtube.com/watch?v=${videoId}`,"_blank");
  //   }
  // };
  //console.log("theatreYTid---", videoId);

  const filteredVideos = videoData.filter((item) => {
    if (!searchTerm) return true; // Show all if no search term
    const searchLower = searchTerm.toLowerCase();
    return item.name?.toLowerCase().includes(searchLower);
  });


  if (isLoading) return <LoadingAnimation />;
  if (error) {
    toast.error("Failed to load theatre ads");
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  // if (!theatreAdData?.data?.length) {
  //   toast.warning("No theatre ads available");
  //   return <div className="text-center p-8">No data available</div>;
  // }
  if (!filteredVideos.length) {
    toast.warning(searchTerm ? `No theatre ads found for "${searchTerm}"` : "No theatre ads available");
    return <div className="text-center p-8">{searchTerm ? `No results for "${searchTerm}"` : "No data available"}</div>;
  }

  const handleVideoError = (index) => {
    setFailedVideos((prev) => new Set(prev).add(index));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredVideos.map((item, index) => {
          const videoId = item.video_url.split("/").pop()?.split("?")[0];
          const previewId = item.preview_video?.url
            ? `${BASE_URL}${item.preview_video.url}`
            : null;
          const hasFailed = failedVideos.has(index) || !previewId;

          return (
            <motion.div
              key={index}
              className="rounded border hover:shadow-lg bg-white transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-[450px] h-[300px] overflow-hidden"
              onClick={() =>
                videoId &&
                window.open(
                  `https://www.youtube.com/watch?v=${videoId}`,
                  "_blank"
                )
              }
              whileHover="hover"
              initial="initial"
              onMouseEnter={() => !hasFailed && setHoverVideo(index)}
              onMouseLeave={() => setHoverVideo(null)}
            >
              <div className="relative w-full h-full">
                {hasFailed ? (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/noimage.png"
                      alt={`Video preview unavailable: ${item.name}`}
                      fill
                      className="object-contain p-4"
                      quality={100}
                    />
                  </div>
                ) : (
                  <video
                    src={previewId}
                    className="w-full h-full object-cover rounded-lg"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => handleVideoError(index)}
                    ref={(video) => {
                      if (!video) return;
                      if (hoverVideo === index) {
                        video.play().catch((e) => {
                          console.error("Video play failed:", e);
                          handleVideoError(index);
                        });
                      } else {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }}
                  />
                )}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black transition-all duration-300"
                  variants={{
                    initial: { opacity: 0.6 },
                    hover: { opacity: 0 },
                  }}
                >
                  <motion.h3
                    className="text-white font-bold text-xl text-center px-4 drop-shadow-lg absolute"
                    variants={{
                      initial: {
                        y: "-50%", // Start from middle
                        opacity: 1,
                        scale: 1,
                      },
                      hover: {
                        y: "90%", // Move down to bottom
                        opacity: 0,
                        scale: 0.9,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    {item.name}
                  </motion.h3>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default CardTheatreAd;
