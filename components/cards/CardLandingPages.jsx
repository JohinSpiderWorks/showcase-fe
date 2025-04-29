"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { BASE_URL } from "@/services/baseUrl";
import LandingPageModel from "../LandingPageModel";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import { useLanding } from "@/context/LandingContext";
import FallbackImage from "../FallbackImage";

function CardLandingPages() {
  const { landingData, selectedCountry, isLoading, error,searchTerm } = useLanding();

  //console.log("selectedCountry---", selectedCountry);

  //console.log("landingData---", landingData);

  const [imageUrls, setImageUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [techData, setTechData] = useState({});

  useEffect(() => {
    if (landingData?.data) {
      const extractedUrls = landingData.data.map((item) => ({
        id: item.id,
        name: item.name,
        website_url: item.website_url,
        launch_date: item.launch_date,
        url: item.thumbnail?.url ? `${BASE_URL}${item.thumbnail.url}` : "", // Check if thumbnail exists
        clientLogo: item.client_logo?.url
          ? `${BASE_URL}${item.client_logo?.url}`
          : "",
          // clientLogo: item.client_logo?.formats?.thumbnail?.url
          // ? `${BASE_URL}${item.client_logo.formats.thumbnail.url}`
          // : "",
        clientName: item.client_logo?.formats?.thumbnail?.name,
        technologyUsed: item.website_technologies?.map(tech => 
          tech.logo?.url ? `${BASE_URL}${tech.logo.url}` : null)
      }));
      setImageUrls(extractedUrls);
      //console.log("clientLogo===url",extractedUrls);

      //Fetch technologies for each ID
      // extractedUrls.forEach((item) => {
      //   axios
      //     .get(
      //       //`${BASE_URL}/api/website-technology-mappings?populate=website_technologies.logo&filters[website_ids][id][$eq]=${item.id}`
      //       `${BASE_URL}/api/landing-pages?populate[website_technology_mapping][populate][website_technologies][fields]=name&populate[website_technology_mapping][populate][website_technologies][populate]=logo`
      //     )
      //     .then((response) => {
      //       setTechData((prev) => ({
      //         ...prev,
      //         [item.id]: response.data.data,
      //       }));
      //     })
      //     .catch((error) =>
      //       console.error("Error fetching technologies:", error)
      //     );
      // });
    }
  }, [landingData]);

   // Filter landing pages based on search term
   const filteredLandingPages = imageUrls.filter((item) => {
    if (!searchTerm) return true; // Show all if no search term
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(searchLower) ||
      (item.clientName?.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>Error:{error}</div>;
  //if (!landingData || !landingData?.data || landingData.data.length === 0) {return <div>No data available</div>};
  if (!filteredLandingPages.length) {
    return (
      <div className="text-center p-8">
        {searchTerm ? `No results found for "${searchTerm}"` : 'No landing pages available'}
      </div>
    );
  }

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };
console.log("imageUrls====--",imageUrls);

  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:p-14 mt-2 ">
        {imageUrls.length > 0 ? (
          filteredLandingPages.map((item, index) => (
            <div key={index} className="border rounded-lg ">
              <div className="max-w-l bg-transparent border border-gray-200 rounded-lg hover:shadow-2xl">
                <a onClick={() => handleImageClick(item)}>
                  {item.url ? (
                    // Moved the Image component above the text
                    <div className="relative xl:h-80 h-72 w-screen sm:w-full ">
                      {/* <Image
                        src={item.url}
                        alt={
                          `Website Preview ${index + 1}` ||
                          "Client Landing Page"
                        }
                        width={600}
                        height={400}
                        objectFit="cover"
                        className="rounded-lg w-full h-full"
                      /> */}
                      <FallbackImage
                        src={item.url}
                        fallback="/noimage.png"
                      alt={
                        `Website Preview ${index + 1}` ||
                        "Client Landing Page"
                      }
                      width={600}
                      height={400}
                      objectFit="cover"
                      className="rounded-lg w-full h-full"
                      />
                      {/* Overlay text on the image */}
                      <div className="absolute inset-2 top-56 xl:top-64 flex text-white rounded-lg border border-white border-opacity-25 bg-gray-400 bg-opacity-20 backdrop-blur-[49.5px] overflow-hidden">
                        <div className="w-1/2 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="26"
                            viewBox="0 0 17 17"
                            fill="none"
                            className="me-2 mt-1"
                          >
                            <g clipPath="url(#clip0_19_646)">
                              <path
                                d="M15.4583 8.14359C15.4583 11.8255 12.4736 14.8103 8.79167 14.8103M15.4583 8.14359C15.4583 4.4617 12.4736 1.47693 8.79167 1.47693M15.4583 8.14359H2.125M8.79167 14.8103C5.10977 14.8103 2.125 11.8255 2.125 8.14359M8.79167 14.8103C7.07982 13.0128 6.125 10.6258 6.125 8.14359C6.125 5.66142 7.07982 3.27436 8.79167 1.47693M8.79167 14.8103C10.5035 13.0128 11.4583 10.6258 11.4583 8.14359C11.4583 5.66142 10.5035 3.27436 8.79167 1.47693M2.125 8.14359C2.125 4.4617 5.10977 1.47693 8.79167 1.47693"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_19_646">
                                <rect
                                  width="16"
                                  height="16"
                                  fill="white"
                                  transform="translate(0.791748 0.143616)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <h5 className="text-2xl font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.name || "No Name"}
                          </h5>
                        </div>
                        <div className="w-1/2 flex items-center justify-center">
                          <div className="border-l border-[#98AEA7] px-2 p-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                            >
                              <path
                                d="M5.69515 2.10004V4.7667M11.0285 2.10004V4.7667M2.36182 7.43337H14.3618M3.69515 3.43337H13.0285C13.7649 3.43337 14.3618 4.03032 14.3618 4.7667V14.1C14.3618 14.8364 13.7649 15.4334 13.0285 15.4334H3.69515C2.95877 15.4334 2.36182 14.8364 2.36182 14.1V4.7667C2.36182 4.03032 2.95877 3.43337 3.69515 3.43337Z"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <h1 className="font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis">
                            {new Date(item.launch_date)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(/(\d{2})-(\w{3})-(\d{4})/, "$1-$2-$3")}
                          </h1>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                </a>
              </div>
              
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No images available
          </p>
        )}
      </div>
      <LandingPageModel
        isOpen={isModalOpen}
        key={selectedImage?.id} 
                onClose={() => setIsModalOpen(false)}
                image={selectedImage}
                techData={techData}
              />
    </>
  );
}

export default CardLandingPages;
