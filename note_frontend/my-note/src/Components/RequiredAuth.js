import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function RequiredAuth(props)
{
    const store = authStore()
    useEffect(()=>
    {
        if(store.loggedIn===null)
        {
            store.checkAuth()
        }
    },[])

    if(store.loggedIn ===null)
    {
        return <div>Loading...</div>
    }
    if(store.loggedIn === false)
    {
        //console.log(store.loggedIn)
        return<Navigate to="/login"/>
    }
    
    
    return (
        <div>{props.children}</div>
    )
}