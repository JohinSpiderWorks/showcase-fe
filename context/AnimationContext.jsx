"use client"
import { createContext, useContext, useState } from "react"
const AnimationContext = createContext();

export function AnimationProvider({children}) {

  //const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [error, setError] = useState()
  const [selectedCountry, setSelectedCountry] = useState("No Country Selected")
  const [animationData, setAnimationData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    
    return (
        <AnimationContext.Provider value={{
            error,
            setError,
            selectedCountry,
            setSelectedCountry,
            animationData,
            setAnimationData,
            isLoading,
            setIsLoading,
            searchTerm, setSearchTerm
        }}> 
            {children}
        </AnimationContext.Provider>
    )
}

export function useAnimation() {
    const context = useContext(AnimationContext)
    if (!context) {
        throw new Error("useAnimation must be used within a AnimationContext");
    }
    return context
}