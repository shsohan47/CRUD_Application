import React from "react";
import authStore from "../stores/authStore";


export default function LoginForm() {
const store = authStore();
const handleChange =(e)=>
{
    store.updateLoginForm(e);
}
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={store.Login} className="login-form" action="#" method="post">
        <input onChange={handleChange} type="text" name="email" value={store.loginForm.email} placeholder="Username" required />
        <input onChange={handleChange} type="password" name="Password" value={store.loginForm.Password} placeholder="Password" required />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
