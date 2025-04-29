"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BASE_URL } from "@/services/baseUrl";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useVideo } from "@/context/VideoContext";
import { toast } from "sonner";

function CardVideos() {
  const { videoData, isLoading, error ,searchQuery, setSearchQuery} = useVideo();
  const [hoverVideo, setHoverVideo] = useState(null);
  const [failedVideos, setFailedVideos] = useState(new Set());

  if (isLoading) return <LoadingAnimation />;
  if (error) {
    toast.error("Failed to load videos");
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  if (!videoData?.data?.length) {
    toast.warning("No videos available");
    return <div className="text-center p-8">No videos available</div>;
  }
  // Filter videos based on the search query
  const filteredVideos = videoData.data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoError = (index) => {
    setFailedVideos((prev) => new Set(prev).add(index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {filteredVideos.length === 0 ? (
        <div className="text-center">No videos found</div>
      ) : (
        filteredVideos.map((item, index) => {
          const videoId = item.video_url?.split("/").pop()?.split("?")[0];
          const previewId = item.preview_video?.url
            ? `${BASE_URL}${item.preview_video.url}`
            : null;
          const hasFailed = failedVideos.has(index) || !previewId;
          return (
            <motion.div
              key={item.id || index}
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
                  <>
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
                          initial: { y: "-50%", opacity: 1, scale: 1 },
                          hover: { y: "90%", opacity: 0, scale: 0.9 },
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
                  </>
                )}
              </div>
            </motion.div>
          );
        })
    )}
    </div>
  );
}

export default CardVideos;
