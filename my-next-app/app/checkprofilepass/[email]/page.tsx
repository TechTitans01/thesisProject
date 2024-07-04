"use client"

import React, { useEffect, useState } from 'react';
import "../../styles/checkpass.css"; 
import { usePathname } from 'next/navigation';
export default function checkAccount  ()  {
  const [method, setMethod] = useState<string>('');
  const pathname = usePathname()
 const filt=pathname.split("/")
 const email=filt[filt.length-1]

useEffect(()=>{
    console.log(email)
    setMethod(email)

},[])



  return (
    <div className="account-recovery">
<h2>Reset Your Password</h2>
<p> would you like to receive your password reset code?</p>
      <div>
      
        <div className="radio-group">
          <label>
            <input 
              type="checkBox" 
              value="email" 
            
           
            />
            Send the code by email

            <span className="email">{email}</span>
          </label>
        </div>
       
        <div className="footer">
          <button type="button" className="btn-secondary">close?</button>
          <button type="submit" className="btn-primary">Next</button>
        </div>
      </div>
    </div>
  );
};

