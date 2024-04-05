import { useEffect } from "react"
import authStore from "../stores/authStore"

export default function LogoutPage()
{
    const store = authStore()
    useEffect(()=>
    {
        store.LogOut();
    },[])
    return <div>Logging out</div>
}