import axios from "axios";
//import { response } from "express";
import create from "zustand";

const authStore = create((set) => ({
    //initial state of login
    loggedIn : null,
    //define the initial state of the login Form
    loginForm: {
        email: "",
        Password: "",
    },

    SignupForm:{
        email:"",
        Password:"",
        ConfirmPassword:"",
    },
    updateSignupForm:(e)=>
    {   
        const{name,value} = e.target;
        set((state)=>
        {
            return{
                SignupForm:{
                    ...state.SignupForm,
                    [name]:value,
                }
            }
        })
    },
    
    //Update login form value from frontend
    updateLoginForm: (e) => {
        //take the name and value from where user hit and type
        const { name, value } = e.target;

        //set it to the login form
        set((state) => {
            return{
            loginForm: {
                ...state.loginForm,
                [name]: value,
            },
        };
        
        });
    },
    Login: async ()=>
    {
        try{
      
        const {loginForm} = authStore.getState();
       const response =  await  axios.post("/login",loginForm)
        set({loggedIn:true})
            
        if (response.data.error) { // Check for successful response and error message
            const errorMessage = response.data.error  // Extract API's error message or generic message
            throw new Error(errorMessage); // Throw an error with the specific message
          }
     
        }catch(error)
        {
            set({loggedIn:false})
            throw error;
        }
        set({
            loginForm: {
                email: "",
                Password: "",
            }
        })
    },
    checkAuth : async()=>
   {
    try{
        await axios.get("/check-auth");
        set({loggedIn:true})
    }
    catch(err)
    {
        set({loggedIn:false})
    }
   },
   LogOut: async()=>
   {
    try{
        await axios.get("/logout")
        set({loggedIn:false});
    }catch(err)
    {
        <div>Can't Log out</div>
    }
   },
   SignUp: async () => {
    try {
        const { SignupForm } = authStore.getState();
        const response = await axios.post("/signup", SignupForm);
    
        if (response.data.error) { // Check for successful response and error message
          const errorMessage = response.data.error  // Extract API's error message or generic message
          throw new Error(errorMessage); // Throw an error with the specific message
        }
    
        // Handle successful signup (optional)
        console.log("Signup successful!");
    
      } catch (error) {
        throw error; // Re-throw the error for `handleSignUp` to catch
      }
  }
  
}));

export default authStore;
