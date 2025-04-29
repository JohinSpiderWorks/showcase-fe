"use client";
import { BASE_URL } from "@/services/baseUrl";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingAnimation from "../components/loadingAnimation/LoadingAnimation";

const BrochuresContext = createContext();

export function BrochureProvider({ children }) {
  const [countries, setCountries] = useState([])
  const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [error, setError] = useState()
  const [selectedCountry, setSelectedCountry] = useState("No Country Selected")
  const [brochureData, setBrochureData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState(""); // Add this line
useEffect(() => {
  const fetchCountries = async () => {
    setIsLoadingCountry(true)
    try {
      const response = await axios.get(`${BASE_URL}/api/countries`)
      //console.log("response for country:",response);
      setCountries(response.data)
    }
    catch (error) {
      console.error("Error:", error);
      setError(error.message)
    }
    finally {
      setIsLoadingCountry(false)
    }
  }
  fetchCountries();
}, [])
  
  
  return (
    <BrochuresContext.Provider value={{
      isLoadingCountry,
      countries,
      setCountries,
      error,
      setError,
      selectedCountry,
      setSelectedCountry,
      brochureData,
      setBrochureData,
      isLoading,
      setIsLoading,
      searchTerm,       // Add this
      setSearchTerm,
    }}>
      {children}
    </BrochuresContext.Provider>
  );
}

export function useBrochure() {
  const context = useContext(BrochuresContext);
  if (!context) {
    throw new Error("useBrochure must be used within a BrochureProvider");
  }
  return context;
}
