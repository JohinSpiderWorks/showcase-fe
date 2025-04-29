"use client"
import { BASE_URL } from "@/services/baseUrl"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const LogoContext = createContext()

export function LogoProvider({ children }) {
    const [countries, setCountries] = useState([])
    const [error, setError] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState("No Country Selected")
    const [logoData, setLogoData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/countries`)
                //console.log("response countries:",response.data)
                setCountries(response.data)
            }
            catch (error){
                console.error("Error fetching countries:", error);
        setError(error.message);
            }
        } 
        fetchCountries()
    },[])
    return (
        <LogoContext.Provider
            value={{
                countries,
                error,
                selectedCountry,
                setSelectedCountry,
                isLoading,
                setIsLoading,
                error,
                setError,
                logoData,
                setLogoData,
                searchTerm, setSearchTerm
            }}>
            {children}
        </LogoContext.Provider>
    )
}

export function useLogo() {
    const context = useContext(LogoContext)
    if (!context) {
        throw new Error('useLogo must be used within a LogoProvider');
      }
      return context;
}