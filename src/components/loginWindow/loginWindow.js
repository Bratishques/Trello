import React, { useState } from "react"
import LoginForm from "./loginForm"
import "./loginWindow.scss"
const LoginWindow = () => {
    const [windowPos, setWindow] = useState("login")

    const changeWindow = (e) => {
        setWindow(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div className="auth-wrap">
            <div className="auth-window">
            <div className="auth-switch">
                <button value="login" onClick={changeWindow} className={`${windowPos === "login" ? "scrolled" : ""}`}>
                Log in
                </button>
                <button value="signup" onClick={changeWindow} className={`${windowPos === "signup" ? "scrolled" : ""}`}>
                Sign Up
                </button>
            </div>
            <div className="auth-scroll">
            <div className={`auth-scrollbar ${windowPos === "signup" ? "scrolled" : ""}`} >
            </div>
            </div>
            <div className={`auth-form-scroll ${windowPos === "signup" ? "scrolled" : ""}` }>
            <LoginForm/>
            <form className= "auth-form signup">
                <input type="name" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button>Sign Up</button>
            </form>
            </div>
            </div>
        </div>
    )
}

export default LoginWindow