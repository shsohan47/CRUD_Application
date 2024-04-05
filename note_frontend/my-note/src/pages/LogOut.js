import { useEffect } from "react"
import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom"

export default function LogoutPage()
{
    const store = authStore();
    const navigate = useNavigate()
    useEffect(()=>
    {
        store.LogOut();
        navigate("/login")

    },[])
    return <div>Logging out</div>
}