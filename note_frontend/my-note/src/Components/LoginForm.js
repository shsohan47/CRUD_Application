import React from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
const store = authStore();
const navigate = useNavigate()

const handleLogin= async(e)=>
{
  e.preventDefault();
  await store.Login()
  navigate("/")
}
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form" action="#" method="post">
        <input onChange={store.updateLoginForm} type="text" name="email" value={store.loginForm.email} placeholder="Username" required />
        <input onChange={store.updateLoginForm} type="password" name="Password" value={store.loginForm.Password} placeholder="Password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
