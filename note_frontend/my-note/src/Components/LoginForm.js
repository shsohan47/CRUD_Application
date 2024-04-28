import React, { useEffect, useState } from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [errorMessage,setErrorMessage] = useState("")

  const handleLogin = async (e) => {
    try{
    e.preventDefault();
    await store.Login();
    
    }catch(err)
    {
      if(err.response.data)
      {
        const{details} = err.response.data;
        setErrorMessage(details);
      }
    }


  };

  useEffect(()=>
{
  if(store.loggedIn)
  {
    navigate("/");
  }
},[store.loggedIn,navigate])
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form
        onSubmit={handleLogin}
        className="login-form"
        action="#"
        method="post"
      >
        <input
          onChange={store.updateLoginForm}
          type="text"
          name="email"
          value={store.loginForm.email}
          placeholder="Username"
          required
        />
        <input
          onChange={store.updateLoginForm}
          type="password"
          name="Password"
          value={store.loginForm.Password}
          placeholder="Password"
          required
        />
        {errorMessage && (
  <div key={errorMessage} className={"error-message shake"} >
    {errorMessage}
  </div>
)}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
