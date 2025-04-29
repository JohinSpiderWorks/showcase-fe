"use client"
import { BASE_URL } from "@/services/baseUrl"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const TheatreAdContext = createContext()

export function TheatreAdProvider({ children }) {
    const [countries, setCountries] = useState([])
    const [error, setError] = useState(null)
    const [selectedCountry,setSelectedCountry] = useState("No Country Selected")
    const [theatreAdData, setTheatreAdData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState(""); // Add this line
    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/countries`)
                setCountries(response.data)
            }
            catch (error){
                console.log("Error:",error);
                setError(error.message)
            }
        }
        fetchCountries()
    }, [])
    
    return (
        <TheatreAdContext.Provider
            value={{
                countries,
                setSelectedCountry,
                selectedCountry,
                setTheatreAdData,
                theatreAdData,
                isLoading,
                setIsLoading,
                error,
                searchTerm,       // Add this
        setSearchTerm, 
        }}>
            {children}
        </TheatreAdContext.Provider>
    )
}

export function useTheatreAdd() {
    const context = useContext(TheatreAdContext)
    if (!context) {
        throw new Error('useWebsite must be used within a WebsiteProvider');
      }
      return context;
}