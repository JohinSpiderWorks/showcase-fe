"use client"
import { BASE_URL } from "@/services/baseUrl";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const LandingContext = createContext();


export function LandingProvider({ children }) {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
    const [landingData, setLandingData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("No Country Selected");
    const [isLoading, setIsLoading] = useState(false);
    const [technologies, setTechnologies] = useState([])
  const [selectedTechnology, setSelectedTechnology] = useState("No Technology Selected")
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

    useEffect(() => {
        const fetchLandingPageData = async () => {
          try {
            const countriesResponse = await axios.get(`${BASE_URL}/api/countries`);
            setCountries(countriesResponse.data);
    
            const techResponse = await axios.get(`${BASE_URL}/api/website-technologies`)
            setTechnologies(techResponse.data)
          } catch (error) {
            console.error("Error fetching countries:", error);
            setError(error.message);
          }
        };
        fetchLandingPageData();
      }, []);

    return (
        <LandingContext.Provider value={{
            selectedCountry, 
            setSelectedCountry,
            landingData,
            setLandingData,
            countries,
            isLoading,
            setIsLoading,
            error,
            setError,
            technologies,
      setTechnologies,
      selectedTechnology,
        setSelectedTechnology,
        searchTerm,       // Add this
        setSearchTerm,    //
        }}>
            {children}
        </LandingContext.Provider>
    );
}

export function useLanding() {
    const context = useContext(LandingContext)
    if (!context) {
        throw new Error('useWebsite must be used within a LandingProvider');
      }
      return context;
}