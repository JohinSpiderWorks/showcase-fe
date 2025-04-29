"use client"
import React, { useEffect, useRef, useState } from 'react'
import {motion} from "framer-motion"
import { useTheatreAdd } from '@/context/TheatreAdContext';
import axios from 'axios';
import { BASE_URL } from '@/services/baseUrl';

function DropdownTheatreAds() {
  const {
    countries,
    setTheatreAdData,
    setError,
    setSelectedCountry,
    selectedCountry,
    setIsLoading,
    searchTerm,       // Add this
    setSearchTerm,
  } = useTheatreAdd()
  // console.log("countries---",countries);
  // console.log("selectedCountry---",selectedCountry);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const techDropdownRef = useRef(null);
  
  useEffect(() => {
    const fetchTheatreAd = async () => {
      setIsLoading(true)
      //setError(null)
      try {
        let url = `${BASE_URL}/api/theatre-ads?populate=*`
      if (selectedCountry !== "No Country Selected") {
        url= `${BASE_URL}/api/theatre-ads?filters[country][name][$eq]=${selectedCountry}&populate=*`
      }
        console.log("urltheatre--",url);
      const response = await axios(url)
        setTheatreAdData(response.data)
        //console.log("theatredata",response.data); 
      }
      catch(error) {
        toast.error("Failed to load data", {
          description: error.message || 'Please try again later'
        })
        setError(error.message)
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchTheatreAd()
  },[setTheatreAdData,selectedCountry,setIsLoading,setError])
  
    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  return (
      <>
     <motion.div
              initial={{ x: 100, opacity: 0.3 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ x: 100, opacity: 0.6 }}
              // className="absolute top-[442px] right-[25px] "
              //className="border border-primary rounded-xl bg-[#F4FFFB] "
              // className="bg-[#F4FFFB] "
              className="md:mx-4"
            >
              <div className="mt-1 xs:flex border border-primary rounded-xl bg-[#F4FFFB] shadow-xl ">
                <div className="md:w-40 py-7 w-28">
                  <div
                    className="relative inline-block ms-4 "
                    ref={dropdownRef}
                  >
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
                      <div className="absolute left-0 mt-2  z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {countries.data.map((country, index)=>
                          <li key={index}>
                            <a
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => {
                            setSelectedCountry(
                              selectedCountry === country.name
                                ? "No Country Selected"
                                : country.name
                            )
                            setDropdownOpen(false)
                          }}
                            >
                             {country.name}
                            </a>
                      </li>
                      )}
                        </ul>
                      </div>
                    )}
                  </div>
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
      </>
  )
}

export default DropdownTheatreAds