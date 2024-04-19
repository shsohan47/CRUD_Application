import React, { useState } from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      await store.Login();
      navigate("/");
      
    } catch (err) {
      
      if (err.response && err.response.data) {
        const { message, details } = err.response.data;
        setErrorMessage(`${message}: ${details}`);
        console.log("message:",message)
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleLogin} className="login-form" action="#" method="post">
        <input onChange={store.updateLoginForm} type="text" name="email" value={store.loginForm.email} placeholder="Username" required />
        <input onChange={store.updateLoginForm} type="password" name="Password" value={store.loginForm.Password} placeholder="Password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
