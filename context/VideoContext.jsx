"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/services/baseUrl';

const VideoContext = createContext();

export function VideoProvider({ children }) {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("No Country Selected");
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch videos once when the provider mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
      }
    };
    fetchCountries();
  },[]);

  return (
      <VideoContext.Provider value={{
          videoData,
          setVideoData,
          error,
          setError,
          isLoading,
          setCountries,
          countries,
          selectedCountry,
          setSelectedCountry,
      setIsLoading,
      searchQuery, setSearchQuery
      }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}