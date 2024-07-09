"use client"

import React, { useState } from 'react';
import '../styles/forgetpass.css'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useRouter } from "next/navigation";

const AccountRecovery = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const forget = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/getoneByemail/${email}`);
      toast.success("Success");
      router.push(`/checkprofilepass/${email}`);
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Email Not Found");
    }
  };

  return (
    <>
      <div className="account-recovery">
        <h2>Find Your Account</h2>
        <p>Please enter your email to search for your account.</p>
        <input 
          type="text" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
        <div className="buttons">
          <button className="cancel" onClick={() => router.push("/auth")}>Cancel</button>
          <button className="search" onClick={forget}>Search</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AccountRecovery;
