"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/services/baseUrl';

const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState("No Country Selected");
  const [clientData, setClientData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [clientSearchTerm, setClientSearchTerm] = useState("");

  

  // Fetch countries once when the provider mounts
  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${BASE_URL}/api/countries`);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchCountries();
  }, []);

  return (
    <ClientContext.Provider value={{ 
      selectedCountry, 
      setSelectedCountry,
      clientData,
      setClientData,
      countries,
      error,
      setError,
      isLoading,
      setIsLoading,
      clientSearchTerm,
  setClientSearchTerm,
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
}