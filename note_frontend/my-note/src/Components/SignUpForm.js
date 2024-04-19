import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import authStore from "../stores/authStore";
import { useEffect, useState } from "react";
import "../Components/signUpStyle.css"

export default function SignUpForm() {
  const store = authStore();
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  
  
  const handleSignUp = async (e) => {
  
    e.preventDefault();
    try{
      await store.SignUp();
      setPasswordError('');
      setSignUpSuccess(true);
      

    }catch(err)
    {
      //handle api error
      if(err.response && err.response.data)
      {
          const {message,details} = err.response.data;
          if(details === 'Email Already Exists')
          {
            setPasswordError('Email already exists. use another email!!');
          }else{
            setPasswordError(details);
          }
          setSignUpSuccess(false);
          

      }else{
        setPasswordError('An error occured. Please try again after sometimes!');
        setSignUpSuccess(false);
        
      }


    }
  };

  useEffect(() => {
    if (signUpSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [signUpSuccess, navigate]);

  return (
    <div className="login-container">
      <h1>SignUp</h1>
      {signUpSuccess ? (
        <div className="success-message">Sign up Successfully! Redirect to login page...</div>
      ) : (
        <div>
          <form
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
              placeholder="Email"
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
            {passwordError && (
  <div key={passwordError} className={"error-message shake"} >
    {passwordError}
  </div>
)}

            <input type="submit" value="Signup" />
          </form>
          <div>Already have an account? Please <Link to="/login" style={{ color: "#24a0ed" }}>Login</Link></div>
        </div>
      )}
    </div>
  );
}
