import React, { useContext, useEffect } from "react"
import LoginWindow from "../components/loginWindow/loginWindow"
import SEO from "../components/seo"
import "../components/layout.scss"
import { AuthContext } from "../context/authContext"
import { navigate } from "gatsby"


const IndexPage = () => {

    const auth = useContext(AuthContext)

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/app/main")
        }
    },[auth.isAuthenticated])

    return <LoginWindow/>
    
}

export default IndexPage
