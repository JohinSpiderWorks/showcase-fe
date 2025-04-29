"use client";
import { BASE_URL } from '@/services/baseUrl';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const WebsiteContext = createContext();

export function WebsiteProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState("No Country Selected");
  const [websitesData, setWebsitesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [technologies, setTechnologies] = useState([])
  const [selectedTechnology, setSelectedTechnology] = useState("No Technology Selected")
  const [searchTerm, setSearchTerm] = useState(""); // 🔥 Add this

  // Fetch countries once when the provider mounts
  useEffect(() => {
    const fetchWebsitesData = async () => {
      setIsLoading(true)
      try {
        const countriesResponse = await axios.get(`${BASE_URL}/api/countries`);
        setCountries(countriesResponse.data);

        const techResponse = await axios.get(`${BASE_URL}/api/website-technologies`)
        setTechnologies(techResponse.data)
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchWebsitesData();
  }, []);

  return (
    <WebsiteContext.Provider value={{ 
      selectedCountry, 
      setSelectedCountry,
      websitesData,
      setWebsitesData,
      countries,
      isLoading,
      setIsLoading,
      error,
      setError,
      technologies,
      setTechnologies,
      selectedTechnology,
      setSelectedTechnology,
      searchTerm,       // 🔥 Add this
        setSearchTerm,
    }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}