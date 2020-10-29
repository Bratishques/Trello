import { useMutation} from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useEffect, useState } from "react" 
import { useAuth } from "../../hooks/auth.hook"

const LoginForm = () => {

    const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            userId
        }
    }
    `
    const [login, {loading, error, data}] = useMutation(LOGIN)
    const changeData = useAuth().login

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const submitLogin = async (e) => {
        e.preventDefault()
        login({variables: {email: form.email, password: form.password}})
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        }
        )
        console.log(form)
    }

    useEffect(()=> {
        if (data) {
            console.log("Got data")
            changeData(data.login.token, data.login.userId)
        }
    },[data])

    return (
        <form className= "auth-form login" onSubmit={submitLogin}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
        <button disabled = {loading}>{loading ? `Loading...` : `Log In`}</button>
        
        <div style={{width: "100%"}
        }>
        {error ? error.message : null}
        {data ? data.login.token : null}
        </div>
        </form> 
    )
}

export default LoginForm