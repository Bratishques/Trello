import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"


export const AuthContext = React.createContext()
export const isBrowser = () => typeof window !== "undefined"
export const storageName = "userData"

export const GlobalContextProvider = ({children}) => {



    const localData = (() => {
        if (isBrowser() && window.localStorage.getItem(storageName)) {
          return JSON.parse(window.localStorage.getItem(storageName))
        } else return false
      })()
    const [isAuthenticated, setIsAuthenticated] = useState(!!localData)
    const [trigger, setTrigger] = useState(0)

    const VERIFY = gql`
    mutation verifyToken($token: String!, $userId: ID!) {
        verifyToken(token: $token, userId: $userId) {
            valid
        }
    }
    `
    function pullTrigger(){
        setTrigger(trigger + 1)
    }
    const [verifyToken, {data, loading: validationLoading}] = useMutation(VERIFY, {
        onCompleted: (data) => {
            if (!data.verifyToken.valid) {
                setIsAuthenticated(false)
                localStorage.removeItem(storageName)
            }
            console.log(isAuthenticated)
        }
    })
    
    useEffect(() => {
        console.log("Verifying")
        const verifyUser = async () => {
            if (localData) {
               verifyToken({variables: {token: localData.token, userId: localData.userId}})
            }
        }
        verifyUser()
    }, [trigger])

    return (
        <AuthContext.Provider value={{
            validationLoading,
            isAuthenticated,
            setIsAuthenticated,
            data: localData,
            pullTrigger,
        }}>
        {children}
        </AuthContext.Provider>
    )
}