import axios from "axios";
import create from "zustand";

const authStore = create((set) => ({
    //define the initial state of the login Form
    loginForm: {
        email: "",
        Password: "",
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
    Login: async (e)=>
    {
        e.preventDefault()
        const {loginForm} = authStore.getState();
     const res = await  axios.post("/login",loginForm,{withCredentials:true})

     console.log(res);
    },
}));

export default authStore;
