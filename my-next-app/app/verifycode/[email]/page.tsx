"use client";
import React, { useState, useEffect } from 'react';
import "../../styles/verifycode.css";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authcontex/Authcontex';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Security() {
  const { code, setCode } = useAuth();
  const pathname = usePathname();
  const route = useRouter();
  const filt = pathname.split("/");
  const [verify, setVerify] = useState("");
  const [timer, setTimer] = useState(180); 
  const [canResend, setCanResend] = useState(false);
  const email:string = filt[filt.length - 1];
  const { setemailResetPass} = useAuth();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleCancel = () => {
    route.push('/auth');
  };

  const handleContinue = () => {
    if (verify === code) {
        localStorage.setItem("email",email)
        setemailResetPass(email)
      toast.success('Code verified successfully');
      route.push("/resetpassword")
 
    } else {
      
      toast.error('Incorrect code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/sendmail', {
        to: email,
        subject: "Alerte Password reset"
      });
      let info = response.data.split("/");
      let newCode = info[info.length - 1];
      setCode(newCode);
      toast.success("A new code has been sent to your email.");
      setTimer(180); 
      setCanResend(false);
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while sending the email. Please try again.");
    }
  };

  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container">
      <h2>Entrez le code de sécurité</h2>
      <p>Merci de vérifier dans vos e-mails que vous avez reçu un message avec votre code. Celui-ci est composé de 6 chiffres.</p>
      <div className="input-group">
      Entrez le code : <input placeholder="# # # # # #" onChange={(e) => setVerify(e.target.value)} />
        <p className="email-info">Nous avons envoyé votre code à : <br /> {email}</p>
      </div>
      <div className="buttons">
        <button onClick={handleCancel}>Close</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
      <a href="#" className={`resend-code ${!canResend && 'disabled'}`} onClick={handleResendCode} >
        Code non reçu ? Renvoyer le code {canResend ? '' : `(${formatTime(timer)})`}
      </a>
      <ToastContainer />
    </div>
  );
};