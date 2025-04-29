"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "@/services/baseUrl";
import axios from "axios";
import LoadingAniCountries from "../loadingAnimation/LoadingAniCountries";
import { useWebsite } from "@/context/WebsiteContext";

function DropdownWebsites() {
  const {
    selectedCountry,
    setSelectedCountry,
    setWebsitesData,
    setIsLoading,
    setError,
    countries,
    isLoading,
    technologies,
    selectedTechnology,
    setSelectedTechnology,
    searchTerm,       // 🔥 Add this
    setSearchTerm,  
  } = useWebsite();

  //const [countries, setCountries] = useState([]);
  //const [selectedCountry, setSelectedCountry] = useState("No Country Selected");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  //const [websitesData, setWebsitesData] = useState(null);
  const dropdownRef = useRef(null);
  const techDropdownRef = useRef(null);

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/api/countries`);
  //       setCountries(response.data);
  //     } catch (error) {
  //       console.error("Error fetching countries:", error);
  //     }
  //   };
  //   fetchCountries();
  // }, []);

  useEffect(() => {
    const fetchWebsites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = `${BASE_URL}/api/websites?populate=*`;

        if (selectedCountry !== "No Country Selected") {
          url = `${BASE_URL}/api/websites?filters[country][name][$eq]=${selectedCountry}&populate=*`;
        }

        if (selectedTechnology !== "No Technology Selected") {
          //url = `${BASE_URL}/api/websites?filters[website_technologies][name][$eq]=${selectedTechnology}&populate=*`;
          url = `${BASE_URL}/api/websites?filters[type][$eq]=Landing%20Page&filters[website_technologies][name][$eq]=${selectedTechnology}`;
        }
        // Combine both filters if both are selected
        if (
          selectedCountry !== "No Country Selected" &&
          selectedTechnology !== "No Technology Selected"
        ) {
          //url = `${BASE_URL}/api/websites?filters[country][name][$eq]=${selectedCountry}&filters[website_technologies][name][$eq]=${selectedTechnology}&populate=*`;
          url = `${BASE_URL}/api/websites?filters[type][$eq]=Landing%20Page&filters[website_technologies][name][$eq]=${selectedTechnology}&filters[country][name][$eq]=${selectedCountry}`;
        }
        console.log("urll-----", url);
        const response = await axios.get(url);
        console.log("response-filter--", response.data?.data);

        setWebsitesData(response.data);
      } catch (error) {
        toast.error("Failed to load data", {
          description: error.message || "Please try again later",
        });
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWebsites();
  }, [
    selectedCountry,
    selectedTechnology,
    setWebsitesData,
    setIsLoading,
    setError,
  ]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        techDropdownRef.current &&
        !techDropdownRef.current.contains(event.target)
      ) {
        setTechDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ x: 100, opacity: 0.6 }}
        // className="absolute top-[442px] right-[25px] "
        //className="border border-primary rounded-xl bg-[#F4FFFB] "
        // className="bg-[#F4FFFB] "
        className="md:mx-4"
      >
        <div className="m-[1px] xs:flex border border-primary rounded-xl bg-[#F4FFFB] shadow-xl ">
          <div className="md:w-32 py-7 w-28">
            <div className="relative inline-block ms-4 " ref={dropdownRef}>
              {/* Toggle Button */}
              <button
                className="w-full text-gray-500 bg-transparent hover:text-black font-semibold text-sm  md:text-base  text-center inline-flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="me-1 w-5 h-6 md:w-6 md:h-6"
                >
                  <path
                    d="M21.54 15H17C16.4696 15 15.9609 15.2107 15.5858 15.5858C15.2107 15.9609 15 16.4696 15 17V21.54M7 3.34V5C7 5.79565 7.31607 6.55871 7.87868 7.12132C8.44129 7.68393 9.20435 8 10 8C10.5304 8 11.0391 8.21071 11.4142 8.58579C11.7893 8.96086 12 9.46957 12 10C12 11.1 12.9 12 14 12C14.5304 12 15.0391 11.7893 15.4142 11.4142C15.7893 11.0391 16 10.5304 16 10C16 8.9 16.9 8 18 8H21.17M11 21.95V18C11 17.4696 10.7893 16.9609 10.4142 16.5858C10.0391 16.2107 9.53043 16 9 16C8.46957 16 7.96086 15.7893 7.58579 15.4142C7.21071 15.0391 7 14.5304 7 14V13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11H2.05M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#0D1422"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Country
                <svg
                  className="w-2 h-2 md:w-2.5 md:h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div className="flex">
                <button
                  className="flex items-center"
                  onClick={() => setSelectedCountry("No Country Selected")}
                >
                  <h1 className="text-[10px] flex items-center">
                    {/* Conditionally render the SVG only if a country is selected */}
                    {selectedCountry !== "No Country Selected" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-2 flex" // Tailwind classes for width and height
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M 2.75 2.042969 L 2.042969 2.75 L 2.398438 3.101563 L 7.292969 8 L 2.042969 13.25 L 2.75 13.957031 L 8 8.707031 L 12.894531 13.605469 L 13.25 13.957031 L 13.957031 13.25 L 13.605469 12.894531 L 8.707031 8 L 13.957031 2.75 L 13.25 2.042969 L 8 7.292969 L 3.101563 2.398438 Z"
                          fill="red"
                        />
                      </svg>
                    )}
                    {selectedCountry}
                  </h1>
                </button>
              </div>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div>
                  <div className="absolute left-0 mt-2  z-10 bg-[#F4FFFB] divide-y border border-primary divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    {isLoading ? (
                      <LoadingAniCountries /> // Show loading animation while fetching
                    ) : (
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {countries?.data?.map((country, index) => (
                          <li key={index}>
                            <a
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => {
                                setSelectedCountry(
                                  selectedCountry === country.name
                                    ? "No Country Selected"
                                    : country.name
                                ); // Toggle selection using ternary
                                setDropdownOpen(false); // Close dropdown
                              }}
                            >
                              {country.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* drop down for  technology */}

          <div
            className="relative inline-block ms-4 py-7"
            ref={techDropdownRef}
          >
            {/* Toggle Button */}
            <button
              className=" text-gray-500 bg-transparent hover:text-black font-semibold text-sm md:text-base text-center inline-flex items-center"
              onClick={() => setTechDropdownOpen(!techDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                className="me-1 w-5 h-6 md:w-6 md:h-6"
              >
                <path
                  d="M15.104 2V4M15.104 20V22M2.104 15H4.104M2.104 9H4.104M20.104 15H22.104M20.104 9H22.104M9.104 2V4M9.104 20V22M6.104 4H18.104C19.2086 4 20.104 4.89543 20.104 6V18C20.104 19.1046 19.2086 20 18.104 20H6.104C4.99943 20 4.104 19.1046 4.104 18V6C4.104 4.89543 4.99943 4 6.104 4ZM10.104 9H14.104C14.6563 9 15.104 9.44772 15.104 10V14C15.104 14.5523 14.6563 15 14.104 15H10.104C9.55172 15 9.104 14.5523 9.104 14V10C9.104 9.44772 9.55172 9 10.104 9Z"
                  stroke="#0D1422"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Technology
              <svg
                className="w-2 h-2 md:w-2.5 md:h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div className="flex">
              <button
                className="flex items-center"
                onClick={() => setSelectedTechnology("No Technology Selected")}
              >
                <h1 className="text-[10px] flex items-center">
                  {/* Conditionally render the SVG only if a country is selected */}
                  {selectedTechnology !== "No Technology Selected" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-2 flex" // Tailwind classes for width and height
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M 2.75 2.042969 L 2.042969 2.75 L 2.398438 3.101563 L 7.292969 8 L 2.042969 13.25 L 2.75 13.957031 L 8 8.707031 L 12.894531 13.605469 L 13.25 13.957031 L 13.957031 13.25 L 13.605469 12.894531 L 8.707031 8 L 13.957031 2.75 L 13.25 2.042969 L 8 7.292969 L 3.101563 2.398438 Z"
                        fill="red"
                      />
                    </svg>
                  )}
                  {selectedTechnology}
                </h1>
              </button>
            </div>
            {/* Dropdown Menu */}
            {techDropdownOpen && (
              <div className="absolute left-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                {isLoading ? (
                  <LoadingAniCountries /> // Show loading animation while fetching
                ) : (
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {technologies?.data?.map((technology, index) => (
                      <li key={index}>
                        <a
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            setSelectedTechnology(
                              selectedTechnology === technology.name
                                ? "No Technology Selected"
                                : technology.name
                            );
                            setTechDropdownOpen(false);
                          }}
                        >
                          {technology.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="w-40 flex">
            <div className="xs:border-l border-[#38BF9F] ms-2 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 20 20"
                fill="none"
                className="ms-2 mt-3 w-6 h-6"
              >
                <path
                  d="M6.73364 13.2994L0.733643 19.2994M11.7336 15.2994C15.5996 15.2994 18.7336 12.1653 18.7336 8.29935C18.7336 4.43336 15.5996 1.29935 11.7336 1.29935C7.86765 1.29935 4.73364 4.43336 4.73364 8.29935C4.73364 12.1653 7.86765 15.2994 11.7336 15.2994Z"
                  stroke="#0D1422"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-6 ms-2 mt-3 bg-[#F4FFFB] py-9 focus:ring-2 focus:ring-transparent focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Add CardWebsite component here */}
      {/* <CardsWebsite
        filterData={websitesData} 
        selectedCountry={selectedCountry}
      /> */}
    </>
  );
}

export default DropdownWebsites;
