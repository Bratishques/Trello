
import { useContext } from "react"
import { storageName, AuthContext } from "../context/authContext"

export const useAuth = () => {

    const auth = useContext(AuthContext)

    const login = (token, userId) => {
        auth.setIsAuthenticated(true)
        localStorage.setItem(
            storageName,
            JSON.stringify({
                userId: userId,
                token: token
            })

        )
    }

    const logout = () => {
        auth.setIsAuthenticated(false)
        localStorage.removeItem(storageName)
    }


    return {login,logout}
}