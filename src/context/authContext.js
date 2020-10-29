import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"


export const AuthContext = React.createContext()
export const isBrowser = () => typeof window !== "undefined"
export const storageName = "userData"

export const GlobalContextProvider = ({children}) => {
    const data = (() => {
        if (isBrowser() && window.localStorage.getItem(storageName)) {
          return JSON.parse(window.localStorage.getItem(storageName))
        } else return false
      })()
    const [isAuthenticated, setIsAuthenticated] = useState(!!data)

    const VERIFY = gql`
    mutation verifyToken($token: String!, $userId: ID!) {
        verifyToken(token: $token, userId: $userId) {
            valid
        }
    }
    `
    const [verifyToken, {data: validationData, loading: validationLoading}] = useMutation(VERIFY)

    useEffect(() => {
        const verifyUser = async () => {
            if (data) {
                verifyToken({variables: {token: data.token, userId: data.userId}})
            }
        }
        verifyUser()
    }, [])

    useEffect(() => {
      if (validationData) {
        if (!validationData.verifyToken.valid) {
            setIsAuthenticated(false)
            localStorage.removeItem(storageName)
        }
      }
      console.log(validationLoading, isAuthenticated)
    }, [validationData])

    return (
        <AuthContext.Provider value={{
            validationLoading,
            isAuthenticated,
            setIsAuthenticated,
            data,
        }
        }>
        {children}
        </AuthContext.Provider>
    )
}