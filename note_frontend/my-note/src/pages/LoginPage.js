import React from "react"
import LoginForm from "../Components/LoginForm"
import {Link} from 'react-router-dom'
export default function LoginPage()
{
    return (
        <div>
        <div><LoginForm/></div>
        <p>Don't have account? <Link to="/signup">SignUp</Link> here</p>
        </div>
        )
}