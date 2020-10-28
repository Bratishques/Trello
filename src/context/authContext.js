import React, { useEffect, useState } from "react"

const AuthContext = React.createContext()
const isBrowser = () => typeof window !== "undefined"
const storageName = "userData"

export const GlobalContextProvider = ({children}) => {
    const data = (() => {
        if (isBrowser() && window.localStorage.getItem(storageName)) {
          return JSON.parse(window.localStorage.getItem(storageName))
        } else return false
      })()
    const [loading, setLoading] = useState(true)
    const [valid, setValid] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const verifyUser = () => {
            console.log("verified")
        }
        verifyUser()
    }, [])
    return (
        <AuthContext.Provider value={
            loading,
            valid
        }>
        {children}
        </AuthContext.Provider>
    )
}