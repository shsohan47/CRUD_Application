import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import authStore from "../stores/authStore";
import { useEffect, useState } from "react";
import "../Components/signUpStyle.css"

export default function SignUpForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [passwordError,setPasswordError] = useState('')
  const [signUpSuccess,setSignUpSuccess] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    await store.SignUp();
    if(store.SignupForm.Password !== store.SignupForm.ConfirmPassword)
    {
      setPasswordError("Password don't match")
      setSignUpSuccess(false);
      return;
    }
    setPasswordError('');
    setSignUpSuccess(true);
    // 
  };
  useEffect(()=>
  {
    if(signUpSuccess){
      const timer = setTimeout(()=>
      {
        navigate("/login");
      },2000);
      return ()=>clearTimeout(timer)
    }
  },[signUpSuccess,navigate])
  return (
    <div className="login-container">   
    <h1>
                SignUp
            </h1>
            {signUpSuccess?(
            <div className="success-message">Sign up Successfully! Redirect to login page...</div>):(<div> <form
              onSubmit={handleSignUp}
              className="login-form"
              action="#"
              method="post"
            >
              <input
                onChange={store.updateSignupForm}
                type="text"
                name="email"
                value={store.SignupForm.email}
                placeholder="Username"
                required
              />
              <input
                onChange={store.updateSignupForm}
                type="password"
                name="Password"
                value={store.SignupForm.Password}
                placeholder="Password"
                required
              />
              <input
                onChange={store.updateSignupForm}
                type="password"
                name="ConfirmPassword"
                value={store.SignupForm.ConfirmPassword}
                placeholder="Confirm Password"
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
              <input type="submit" value="Signup" />
            </form>
            <div>Already have an account? Please <Link to="/login" style={{color:"#24a0ed"}}>Login</Link></div>
            </div>
            )}
            
          </div>
     
  );
}
