import axios from "axios";
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
        await  axios.post("/login",loginForm,{withCredentials:true})

     set({loggedIn:true})
        }catch(err)
        {
            console.log(err)
        }
    },
    checkAuth : async()=>
   {
    try{
        await axios.get("/check-auth",{withCredentials:true});
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
   SignUp: async()=>
   {
    try{
        const {SignupForm} =authStore.getState();
        await axios.post("/signup",SignupForm);}
    catch(err)
    {
        console.log("signUp Error:",err)
    }
   }
}));

export default authStore;
