"use client"

import React, { useEffect, useState } from 'react';
import "../../styles/checkpass.css"; 
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useAuth } from '@/app/context/authcontex/Authcontex';

export default function CheckAccount() {
  const route=useRouter()
  const {setCode}=useAuth()
  const [isChecked, setcheck] = useState<boolean>(false);
  const pathname = usePathname();
  const filt = pathname.split("/");
  const email = filt[filt.length - 1];

 

  const handleNextClick = () => {
    if (isChecked) {
      toast.success("email sent")
      axios.post('http://localhost:8080/api/auth/sendmail',{
        to:email,
        subject:"Alerte Password reset"
      }).then((res)=>{
        let info=res.data.split("/")
        toast.success("check your email")
        let code=info[info.length - 1]
        setCode(code)
        route.push(`/verifycode/${email}`)
       
      }).catch((err)=>{console.log(err)})
    } else {
      toast.error("Checkbox is not checked. You can cancel if you don't want to complete the method.");
      
    }
  };

  return (
    <div className="account-recovery">
      <h2>Reset Your Password</h2>
      <p>How would you like to receive your password reset code?</p>
      <div>
        <div className="radio-group">
          <label>
            <input 
              type="checkbox" 
              value="email" 
              checked={isChecked}
              onChange={(e) => setcheck(e.target.checked)}
            />
            Send the code by email
            <span className="email">{email}</span>
          </label>
        </div>
        
        <div className="footer">
          <button type="button" className="btn-secondary">Close</button>
          <button type="submit" className="btn-primary" onClick={handleNextClick}>Next</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
