import React, { useEffect } from 'react'
import authStore from '../stores/authStore'
import { useNavigate } from 'react-router-dom';

export default function LogOut() {

    const store = authStore();
    const Navigate = useNavigate();
    useEffect(()=>
    {
        store.LogOut();
         setTimeout(()=>
      {
        Navigate("/login");
      },1000);
    },[])
   
  return (
    <div>{console.log("logout")}
        Logging Out...</div>
  )
}
