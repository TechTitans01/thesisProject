"use client";
import React, { useState } from 'react';
import "../styles/resetpassword.css"
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const route=useRouter()
    const [email,setemail]=useState<any>(localStorage.getItem("email"))
const [newpass,setnew]=useState<string>("")
const [confirm,setconfirm]=useState<string>("")


const reset=()=>{
     if (newpass !== confirm) {
        toast.error("Error: Passwords do not match");
        return;
      }

        axios.put("http://localhost:8080/api/user/resetpassword",{
            email:email,
           newpassword: newpass
               }).then((res)=>{toast.success("your password changed") ;localStorage.removeItem("email");route.push("/auth")})
               .catch((err)=>{;console.log(err)})
    }

 



 
  return (<>
    <div className="container">
      <h2>Reset Your Password</h2>
      <div >
        <div className="input-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            onChange={(e)=>setnew(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e)=>setconfirm(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn-primary" onClick={()=>{reset()}} >Reset Password</button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>);
};