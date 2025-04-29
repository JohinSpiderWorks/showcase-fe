"use client"
import { createContext, useContext, useState } from "react"
const CreativeContext = createContext();

export function CreativeProvider({children}) {

  //const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [error, setError] = useState()
  const [selectedCountry, setSelectedCountry] = useState("No Country Selected")
  const [creativeData, setCreativeData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    
    return (
        <CreativeContext.Provider value={{
            error,
            setError,
            selectedCountry,
            setSelectedCountry,
            creativeData,
            setCreativeData,
            isLoading,
            setIsLoading,
            searchTerm,           // ✅ Add this
      setSearchTerm    
        }}> 
            {children}
        </CreativeContext.Provider>
    )
}

export function useCreative() {
    const context = useContext(CreativeContext)
    if (!context) {
        throw new Error("useCreative must be used within a CreativeProvider");
    }
    return context
}