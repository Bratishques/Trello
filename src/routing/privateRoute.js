import { navigate } from "gatsby"
import React, {useContext } from "react"
import { AuthContext } from "../context/authContext"


const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useContext(AuthContext)
    if (!auth.isAuthenticated && !auth.validationLoading) {
        navigate("/")
        return null
    }
    return (
        <Component {...rest}/>
    )

}

export default PrivateRoute